'use client'
import {useGoogleLogin} from '@react-oauth/google';

import styles from 'styled-components'

import Button from "@/components/button/Button";
import GoogleSvg from "@/components/icons/Google.svg";
import SpotifySvg from "@/components/icons/Spotify.svg";

import BG from "@/components/background/Background";
import {COLORS} from "@/app/styles/colors";
import {useSpotifyAuth} from "@/app/login/hooks";
import {Suspense, useEffect, useRef, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {safeGetLocalStorage} from "@/utils/localStorage";
import StandaloneTextInput from "@/components/form/StandaloneTextInput";
import IconButton from "@/components/button/IconButton";
import LoginSvg from "@/components/icons/Login.svg";
import {getConfig} from "@/config";
import {Loader} from "@/components/loader/Loader";

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
    .email {
        display: flex;
        gap: 1em;
    }
`
const functionsUrl = getConfig().functionsUrl
function Login() {
    const router = useRouter()
    const params = useSearchParams()

    const [startLogin, getTokenIfOnCallbackPage, isOnCallbackPage] = useSpotifyAuth();

    const [token, setToken] = useState<string | null>(safeGetLocalStorage("token"));
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [otpCodeVerifier, setOtpCodeVerifier] = useState<string>("");
    const [waitingForToken, setWaitingForToken] = useState<boolean>(false);
    const [isHandlingAuthCallback, setIsHandlingAuthCallback] = useState<boolean | null>(
        isOnCallbackPage, //from spotify
    );

    const getTokenPromise = useRef<null | Promise<unknown>>(null)
    useEffect(() => {
        const otp = params.get("otp")
        const codeVerifier = params.get("otpCodeVerifier")
        if (otp && codeVerifier) {
            setIsHandlingAuthCallback(true)
            let body = JSON.stringify({
                otp,
                codeVerifier
            });
            fetch(`${functionsUrl}/verifyOtp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            }).then((resp) => {
                setWaitingForToken(false)
                setOtp("")
                return resp.json()
            }).then((data) => {
                if (!data.token) {
                    throw new Error("No token")
                }
                localStorage.setItem("token", data.token);
                setToken(data.token)
            }).catch((e) => {
                console.error(e)
                setOtp("")
            })
        }
    }, [params]);

    const handleEmail = () => {
        let body = JSON.stringify({
            email: email
        });
        fetch(`${functionsUrl}/handleEmailLogin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        }).then((resp: Response) => {
            return resp.json()
        }).then((data) => {
            setOtp("")
            setOtpCodeVerifier(data.codeVerifier)
            setWaitingForToken(true)
        })
    }
    const handleOtp = () => {
        let body = JSON.stringify({
            otp: otp,
            codeVerifier: otpCodeVerifier
        });
        fetch(`${functionsUrl}/verifyOtp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body,
        }).then((resp) => {
            setWaitingForToken(false)
            setOtp("")
            return resp.json()
        }).then((data) => {
            localStorage.setItem("token", data.token);
            setToken(data.token)
        }).catch((e) => {
            console.error(e)
            setOtp("")
        })
    }
    useEffect(() => {
        if (token) {
            router.push("/home")
        } else if (getTokenPromise.current === null) {
            // Check we are on the callback page and get the token if so.
            getTokenPromise.current = getTokenIfOnCallbackPage().then(accessToken => {
                if (accessToken) {
                    let body = JSON.stringify({
                        token: accessToken
                    });
                    fetch(`${functionsUrl}/handleSpotifyLogin`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body,
                    }).then(response => {
                        if (response.status === 200) {
                            response.json().then(data => {
                                localStorage.setItem("token", data.token);
                                localStorage.setItem("token", data.token);
                                setToken(data.token)
                            });
                        }
                    })
                }
            });
        }
    }, [token, getTokenIfOnCallbackPage, router])
    const googleLogin = useGoogleLogin({
        onSuccess: tokenResponse => {
            setIsHandlingAuthCallback(true)
            let body = JSON.stringify({
                token: tokenResponse.access_token
            });
            fetch(`${functionsUrl}/handleGoogleLogin`, {
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
    return isHandlingAuthCallback ? <Loader/> : (
        <StyledLoginPage>
            <BG>
                <div className="buttons">
                    <div className="email">
                        {
                            waitingForToken ?
                                <StandaloneTextInput onChange={setOtp} value={otp}
                                                     hint="Enter Otp"/>
                                : <StandaloneTextInput onChange={setEmail}
                                                       value={email}
                                                       hint="Enter email"/>
                        }
                        <IconButton
                            onClick={waitingForToken ? handleOtp : handleEmail}
                            Icon={LoginSvg}/>
                    </div>
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
    )

}

export default function LoginWithSuspense() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Login/>
        </Suspense>
    )
}