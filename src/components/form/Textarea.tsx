import styled from "styled-components";
import {COLORS} from "@/app/styles/colors";
import {ChangeEventHandler} from "react";

const StyledTextArea = styled.textarea`
    outline: none;
    background-image: linear-gradient(
            to right top,
            ${COLORS.yellow},
            ${COLORS.white}
    );
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    padding: 0.5em;
    color: ${COLORS.black};
    &::placeholder {
        color: ${COLORS.green};
    }
`

interface TextareaProps {
    value: string;
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    rows?: number;
    cols?: number;
}

export default function TextArea(props: TextareaProps) {
    return (
        <StyledTextArea
            rows={props.rows || 5}
            cols={props.cols || 50}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder || ""}
        />
    )
}