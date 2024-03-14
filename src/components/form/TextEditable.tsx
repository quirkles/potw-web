import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {COLORS} from "@/app/styles/colors";

const StyledWrapper = styled.div<{
    $isEditing: boolean;
}>`
    display: flex;
    position: relative;
    line-height: 1em;
    border-bottom: 1px dashed ${(props) => COLORS[props.$isEditing ? 'green': 'blue']};

    > * {
        font-size: 1em;
        line-height: 1em;
        display: inline;
        height: 1em;
    }

    > input {
        padding: 0;
        margin: 0;
        padding-inline: 0;
        border: none;
        outline: none;
    }
    >span {
        padding: 0 7px 0 0;
        font-style: italic;
        color: ${COLORS.grey}
    }
`

interface TextEditableProps {
    text: string;
    onChange?: (text: string) => void;
    onBlur?: (text: string) => void;
}

export default function TextEditable(props: TextEditableProps) {
    const {
        text,
        onChange = () => {},
        onBlur = () => {},
    } = props;
    const [localText, setLocalText] = useState<string>(text);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.size = Math.max(localText.length, 1);
        }
        if (spanRef.current) {
            spanRef.current.size = Math.max(localText.length, 1);
        }
    }, [localText, isEditing]);
    return (
        <StyledWrapper $isEditing={isEditing}>
            {isEditing ?
                <input
                    ref={inputRef}
                    type="text"
                    value={localText}
                    onChange={e => {
                        onChange(e.target.value);
                        setLocalText(e.target.value);
                    }}
                    onKeyDown={e => {
                        if (e.key === "Enter") {
                            inputRef.current?.blur();
                        }
                    }}
                    onBlur={() => {
                        setIsEditing(false)
                        onBlur(localText);
                    }}
                    autoFocus
                /> : <span onClick={() => {
                    setIsEditing(true);
                    inputRef.current?.focus();
                }}>{localText}</span>
            }
        </StyledWrapper>
    )
}