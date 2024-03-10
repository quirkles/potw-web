'use client'

import styled from "styled-components";

import {useRouter} from "next/navigation";

const Styled = styled.div`
`

export default function Home() {
    const router = useRouter()
    router.push("home/welcome")
}