"use client";

import { useRouter } from "next/navigation";
import { styled } from "styled-components";

import { getColor } from "@/app/styles/colors";
import { rubik } from "@/app/styles/fonts";

import Heading from "@/components/heading/Heading";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";

import { getColorVariant } from "@/utils/color";

const Styled = styled.div`
  height: 100%;
  overflow: auto;
  color: black;
  background-color: ${getColor("white")};
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  .cta {
    color: white;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em 0;
    width: 100%;
    height: 100%;
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    h3 {
      margin: 0;
      padding: 0;
      font-weight: 600;
    }
    &:hover {
      transform: scale(1.1);
    }
    &.create {
      color: ${getColorVariant("cyan")};
    }
    &.invite {
      color: ${getColorVariant("red")};
    }
    &.join {
      color: ${getColorVariant("green")};
    }
  }
`;

function Home() {
  const router = useRouter();
  const redirect = (route: string) => () => {
    router.push(route);
  };
  return (
    <Styled>
      <Spacer $margin="medium">
        <Heading $variant="h1">Welcome</Heading>
        <Heading $variant="h2">What is Pick of the Week?</Heading>
        <P>
          Pick of the week is a weekly (but you can change that!) recurring
          social club where people get together to talk about music, or vote on
          favourite songs, or just listen to music together.
        </P>
        <Spacer $marginY="small" />
        <Heading $variant="h3">Why do I need an app for that?</Heading>
        <P>
          You don&apos;t! But if you want to keep track of the songs you&apos;ve
          listened to, keep track of who picked what, or have a recurring
          meeting, this app can handle that kind of thing for you.
        </P>
        <Spacer $marginY="medium" />
        <Heading $variant="h3">How do I get involved?</Heading>
        <GridContainer>
          <GridItem $smCol={6} $lgCol={4} onClick={redirect("/home/create")}>
            <div className={`cta create `}>
              <Heading $variant="h2" $underline>
                Create a game
              </Heading>
            </div>
          </GridItem>
          <GridItem $smCol={6} $lgCol={4} onClick={redirect("/home/invite")}>
            <div className={`cta invite `}>
              <Heading $variant="h2" $underline>Invite your friends</Heading>
            </div>
          </GridItem>
          <GridItem $smCol={6} $lgCol={4} onClick={redirect("/home/join")}>
            <div className={`cta join `}>
              <Heading $variant="h2" $underline>Join a public game</Heading>
            </div>
          </GridItem>
        </GridContainer>
      </Spacer>
    </Styled>
  );
}

export default Home;
