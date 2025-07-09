"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { styled, keyframes } from "styled-components";

import { getColor } from "@/app/styles/colors";

import { Badge } from "@/components/badge/Badge";
import Heading from "@/components/heading/Heading";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";

import { getColorVariant } from "@/utils/color";

const gradientMove = keyframes`
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
`;

const floatAnimation = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
`;

const pulseAnimation = keyframes`
    0%, 100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
`;

const Styled = styled.div`
  height: 100%;
  overflow: auto;
  color: black;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: ${gradientMove} 15s ease infinite;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const HeroSection = styled.div`
  background: linear-gradient(
    135deg,
    ${getColor("blue")} 0%,
    ${getColor("purple")} 100%
  );
  color: white;
  text-align: center;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    animation: ${floatAnimation} 6s ease-in-out infinite;
  }

  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  p {
    font-size: 1.3rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const FeatureCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  height: 100%;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: ${getColor("blue")};
  }

  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    display: block;
  }

  h3 {
    color: ${getColor("blue")};
    margin-bottom: 1rem;
  }

  p {
    color: ${getColor("grey_600")};
    line-height: 1.6;
  }
`;

const CTASection = styled.div`
  .cta-card {
    height: 100%;
    background: linear-gradient(
      135deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 100%
    );
    border-radius: 15px;
    padding: 0;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

      &::before {
        opacity: 1;
      }

      .cta-content {
        transform: scale(1.05);
      }
    }

    .cta-content {
      position: relative;
      z-index: 1;
      padding: 3rem 2rem;
      text-align: center;
      transition: transform 0.3s ease;

      h3 {
        margin: 0 0 1rem 0;
        font-weight: 600;
        font-size: 1.5rem;
      }

      p {
        margin: 0;
        opacity: 0.8;
        font-size: 1rem;
      }
    }

    &.create {
      background: linear-gradient(
        135deg,
        ${getColorVariant("cyan")} 0%,
        ${getColorVariant("blue")} 100%
      );
      color: white;

      &:hover {
        border-color: ${getColorVariant("cyan")};
      }
    }

    &.invite {
      background: linear-gradient(
        135deg,
        ${getColorVariant("red")} 0%,
        ${getColorVariant("purple")} 100%
      );
      color: white;

      &:hover {
        border-color: ${getColorVariant("red")};
      }
    }

    &.join {
      background: linear-gradient(
        135deg,
        ${getColorVariant("green")} 0%,
        ${getColorVariant("cyan")} 100%
      );
      color: white;

      &:hover {
        border-color: ${getColorVariant("green")};
      }
    }
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(
    135deg,
    ${getColor("grey_200")} 0%,
    ${getColor("grey_100")} 100%
  );
  padding: 3rem 2rem;
  text-align: center;

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
  }

  .stat-item {
    h3 {
      font-size: 2.5rem;
      color: ${getColor("blue")};
      margin-bottom: 0.5rem;
      animation: ${pulseAnimation} 2s ease-in-out infinite;
    }

    p {
      color: ${getColor("grey_600")};
      font-weight: 500;
    }
  }
`;

const AnimatedBadge = styled(Badge)<{
  delay: number;
}>`
  animation: ${floatAnimation} 3s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || 0}s;
`;

function Home() {
  const router = useRouter();
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "🎵",
      title: "Music Discovery",
      description:
        "Discover new music through your friends' recommendations and expand your musical horizons.",
    },
    {
      icon: "👥",
      title: "Social Listening",
      description:
        "Connect with friends over shared musical experiences and build lasting memories.",
    },
    {
      icon: "📊",
      title: "Track History",
      description:
        "Keep track of all the songs you've listened to and who picked what.",
    },
    {
      icon: "🎯",
      title: "Themed Sessions",
      description:
        "Create themed listening sessions to explore specific genres, moods, or eras.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [features.length]);

  const redirect = (route: string) => () => {
    router.push(route);
  };

  return (
    <Styled>
      <ContentWrapper>
        <HeroSection>
          <h1>Pick of the Week</h1>
          <p>
            Where music lovers come together to share, discover, and celebrate
            great music
          </p>
          <Spacer $marginY="medium" />
          <FlexContainer $justifyContent="center" $gap="small">
            <AnimatedBadge text="🎵 Music" $color="blue" delay={0} />
            <AnimatedBadge text="👥 Social" $color="green" delay={0.5} />
            <AnimatedBadge text="🎯 Fun" $color="red" delay={1} />
          </FlexContainer>
        </HeroSection>

        <Spacer $padding="large">
          <GridContainer $gap="large">
            <GridItem $smCol={12} $lgCol={6}>
              <FeatureCard>
                <span className="icon">{features[currentFeature].icon}</span>
                {/*<Heading $variant="h3">*/}
                {/*  {features[currentFeature].title}*/}
                {/*</Heading>*/}
                <P>{features[currentFeature].description}</P>
              </FeatureCard>
            </GridItem>
            <GridItem $smCol={12} $lgCol={6}>
              <Spacer $marginY="medium">
                <Heading $variant="h2">Why Pick of the Week?</Heading>
                <P>
                  Music is better when shared. Our platform makes it easy to
                  create recurring listening sessions with friends, discover new
                  artists, and keep track of your musical journey together.
                </P>
                <Spacer $marginY="small" />
                <FlexContainer $gap="medium" $direction="column">
                  <FlexItem>
                    <P>
                      <strong>📅 Flexible Scheduling:</strong> Weekly,
                      bi-weekly, or monthly sessions
                    </P>
                  </FlexItem>
                  <FlexItem>
                    <P>
                      <strong>🎲 Themed Listening:</strong> Set themes to
                      explore specific genres
                    </P>
                  </FlexItem>
                  <FlexItem>
                    <P>
                      <strong>📈 Progress Tracking:</strong> See your listening
                      history and stats
                    </P>
                  </FlexItem>
                </FlexContainer>
              </Spacer>
            </GridItem>
          </GridContainer>
        </Spacer>

        <StatsSection>
          <Heading $variant="h2">Join the Community</Heading>
          <P>
            Thousands of music lovers are already sharing their favorite tracks
          </P>
          <div className="stats-grid">
            <div className="stat-item">
              <h3>1,234</h3>
              <p>Songs Shared</p>
            </div>
            <div className="stat-item">
              <h3>567</h3>
              <p>Active Games</p>
            </div>
            <div className="stat-item">
              <h3>89</h3>
              <p>New Discoveries</p>
            </div>
          </div>
        </StatsSection>

        <Spacer $padding="large">
          <Heading $variant="h2">Ready to Start?</Heading>
          <CTASection>
            <GridContainer>
              <GridItem $smCol={6} $lgCol={4}>
                <div
                  className="cta-card create"
                  onClick={redirect("/home/create")}
                >
                  <div className="cta-content">
                    <h3>🎮 Create a Game</h3>
                    <p>
                      Start your own music listening group and invite friends
                    </p>
                  </div>
                </div>
              </GridItem>
              <GridItem $smCol={6} $lgCol={4}>
                <div
                  className="cta-card invite"
                  onClick={redirect("/home/invite")}
                >
                  <div className="cta-content">
                    <h3>📧 Invite Friends</h3>
                    <p>
                      Bring your friends into existing games and grow the
                      community
                    </p>
                  </div>
                </div>
              </GridItem>
              <GridItem $smCol={6} $lgCol={4}>
                <div className="cta-card join" onClick={redirect("/home/join")}>
                  <div className="cta-content">
                    <h3>🚀 Join Public Games</h3>
                    <p>
                      Discover new music with like-minded listeners around the
                      world
                    </p>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </CTASection>
        </Spacer>
      </ContentWrapper>
    </Styled>
  );
}

export default Home;
