'use client'

import styles from 'styled-components'

import Button from "@/components/button/Button";
import GoogleSvg from "@/components/Icons/Google.svg";
import SpotifySvg from "@/components/Icons/Spotify.svg";

import BG from "@/components/background/Background";

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
  return (
      <StyledLoginPage>
        <BG>
           <div className="buttons">
            <Button buttonText="Login with spotify" Icon={SpotifySvg}/>
            <Button buttonText="Login with google" Icon={GoogleSvg}/>
           </div>
        </BG>
        </StyledLoginPage>
  );
}
