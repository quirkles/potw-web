import styled from 'styled-components'
import {PropsWithChildren} from "react";
import {COLORS} from "@/app/styles/colors";

const Styles = styled.main`
    height: 100%;
    width: 100%;
    .bg {
        animation:slide 3s ease-in-out infinite alternate;
        background-image: linear-gradient(-60deg, ${COLORS.green} 50%, ${COLORS.blue} 50%);
        bottom:0;
        left:-50%;
        opacity:.5;
        position:fixed;
        right:-50%;
        top:0;
        z-index:-1;
    }

    .bg2 {
        animation-direction:alternate-reverse;
        animation-duration:4s;
    }

    .bg3 {
        animation-duration:5s;
    }
    .content {
        background-color:rgba(255,255,255,.8);
        border-radius:.25em;
        box-shadow:0 0 .25em rgba(0,0,0,.25);
        box-sizing:border-box;
        left:50%;
        padding:10vmin;
        position:fixed;
        text-align:center;
        top:50%;
        transform:translate(-50%, -50%);
    }
    @keyframes slide {
        0% {
            transform:translateX(-25%);
        }
        100% {
            transform:translateX(25%);
        }
    }
`

export default function GoogleSvg(props: PropsWithChildren<{}>) {
    return (
        <Styles>
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="content">
                {props.children}
            </div>
        </Styles>
    )
}