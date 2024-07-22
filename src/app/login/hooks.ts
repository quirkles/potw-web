"use client";

import { safeGetLocalStorage, safeSetLocalStorage } from "@/utils/localStorage";
import { getConfig } from "@/config";
import { useState } from "react";

const generateRandomString = (length: number): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
};
const base64encode = (input: ArrayBufferLike) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

const sha256 = async (plain: string): Promise<ArrayBufferLike> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

const clientId = getConfig().spotifyClientId;
const redirectUri = getConfig().oauthRedirectUrl;
const scope = "user-read-email";
const authUrl = new URL("https://accounts.spotify.com/authorize");
const tokenUrl = new URL("https://accounts.spotify.com/api/token");

export function useSpotifyAuth(): [
  () => void,
  () => Promise<null | string>,
  boolean,
] {
  const search = typeof window !== "undefined" ? window.location.search : "";
  const urlParams = new URLSearchParams(search);
  let code = urlParams.get("code");
  const codeVerifierFromStorage = safeGetLocalStorage("code_verifier");

  const [isOnCallbackPage, setIsOnCallbackPage] = useState(
    Boolean(codeVerifierFromStorage && code),
  );
  const getTokenIfOnCallbackPage = async (): Promise<null | string> => {
    if (!codeVerifierFromStorage || !code) {
      setIsOnCallbackPage(false);
      return null;
    }
    setIsOnCallbackPage(true);
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifierFromStorage,
      }),
    };

    const body = await fetch(tokenUrl, payload);
    const response = await body.json();
    localStorage.removeItem("code_verifier");

    return response.access_token;
  };
  const initiateLogin = async () => {
    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    window.localStorage.setItem("code_verifier", codeVerifier);
    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };
  return [initiateLogin, getTokenIfOnCallbackPage, isOnCallbackPage];
}
