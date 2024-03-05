'use client'
import {useGoogleLogin} from '@react-oauth/google';

import styles from 'styled-components'

import Button from "@/components/button/Button";
import GoogleSvg from "@/components/Icons/Google.svg";
import SpotifySvg from "@/components/Icons/Spotify.svg";

import BG from "@/components/background/Background";
import {COLORS} from "@/app/styles/colors";
import {useSpotifyAuth} from "@/app/login/hooks";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";

const StyledLoginPage = styles.div`
    height: 100vh;
    width: 100vw;
    .buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1em;
    }
`

export default function Login() {
    const router = useRouter()
    const [token, setToken] = useState<string | null>(localStorage.getItem("token") || null);
    const [startLogin, getToken] = useSpotifyAuth();
    const getTokenPromise = useRef<null | Promise<unknown>>(null)
    useEffect(() => {
        if (token) {
            router.push("/home")
        } else if(getTokenPromise.current === null){
            getTokenPromise.current = getToken().then(accessToken => {
                if (accessToken) {
                    let body = JSON.stringify({
                        token: accessToken
                    });
                    fetch("https://handlespotifylogin-47ow7eeefq-uc.a.run.app", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body,
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(data => {
                                localStorage.setItem("token", data.token);
                                setToken(data.token)
                            });
                        }
                    })
                }
            });
        }
    })
    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            let body = JSON.stringify({
                token: tokenResponse.access_token
            });
            fetch("https://handlegooglelogin-47ow7eeefq-uc.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        localStorage.setItem("token", data.token);
                        setToken(data.token)
                    });
                }
            })
        },
    });
    return <StyledLoginPage>
        <BG>
            <div className="buttons">
                <Button buttonText="Login with spotify" Icon={SpotifySvg}
                        color={COLORS.green}
                        onClick={
                            () => {
                                startLogin()
                            }
                        }
                />
                <Button
                    buttonText="Login with google"
                    Icon={GoogleSvg}
                    color={COLORS.red}
                    onClick={
                        () => {
                            googleLogin()
                        }
                    }
                />
            </div>
        </BG>
    </StyledLoginPage>
}
