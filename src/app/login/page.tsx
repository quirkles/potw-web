'use client'
import {useGoogleLogin} from '@react-oauth/google';

import styles from 'styled-components'

import Button from "@/components/button/Button";
import GoogleSvg from "@/components/Icons/Google.svg";
import SpotifySvg from "@/components/Icons/Spotify.svg";

import BG from "@/components/background/Background";
import {COLORS} from "@/app/styles/colors";
import {useSpotifyAuth} from "@/app/login/hooks";
import {Suspense, useEffect, useRef, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";
import {safeGetLocalStorage} from "@/utils/localStorage";
import StandaloneTextInput from "@/components/form/StandaloneTextInput";
import IconButton from "@/components/button/IconButton";
import LoginSvg from "@/components/Icons/Login.svg";
import {getConfig} from "@/config";

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
    const [token, setToken] = useState<string | null>(safeGetLocalStorage("token"));
    const [startLogin, getTokenIfOnCallbackPage] = useSpotifyAuth();
    const [email, setEmail] = useState<string>("");
    const [otp, setOtp] = useState<string>("");
    const [otpCodeVerifier, setOtpCodeVerifier] = useState<string>("");
    const [waitingForToken, setWaitingForToken] = useState<boolean>(false);
    const getTokenPromise = useRef<null | Promise<unknown>>(null)

    useEffect(() => {
        const otp = params.get("otp")
        const codeVerifier = params.get("otpCodeVerifier")
        if (otp && codeVerifier) {
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
    return (
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