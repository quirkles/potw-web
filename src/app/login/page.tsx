'use client'
import { useGoogleLogin } from '@react-oauth/google';

import styles from 'styled-components'

import Button from "@/components/button/Button";
import GoogleSvg from "@/components/Icons/Google.svg";
import SpotifySvg from "@/components/Icons/Spotify.svg";

import BG from "@/components/background/Background";
import {COLORS} from "@/app/styles/colors";

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
    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            console.log('\n####\n',tokenResponse ,'\n####\n')
            let body = JSON.stringify({
                token: tokenResponse.access_token
            });
            console.log('\n####\n',body ,'\n####\n')
            fetch("https://handlegooglelogin-47ow7eeefq-uc.a.run.app", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            })
        },
    });
    return <StyledLoginPage>
        <BG>
            <div className="buttons">
                <Button buttonText="Login with spotify" Icon={SpotifySvg}
                        color={COLORS.green}/>
                <Button
                    buttonText="Login with google"
                    Icon={GoogleSvg}
                    color={COLORS.red}
                    onClick={
                        () => {
                            login()
                        }
                    }
                />
            </div>
        </BG>
    </StyledLoginPage>
}
