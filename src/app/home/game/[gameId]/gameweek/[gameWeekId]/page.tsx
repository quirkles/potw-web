"use client";

import { TFirebaseGameWeekThemePollSchema } from "@potw/schemas";
import { formatDateTime } from "@potw/utils";
import { PropsWithChildren, useEffect, useState } from "react";
import { styled } from "styled-components";
import { v4 } from "uuid";

import { useGameWeekTheme } from "@/app/home/game/[gameId]/gameweek/hooks/useGameweekTheme";
import { ColorName, gameColors, getColor } from "@/app/styles/colors";
import { defaultBorderRadius } from "@/app/styles/consts";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { StoreGame } from "@/app/store/schemas/game";
import { StoreFetchedGameWeek } from "@/app/store/schemas/gameWeek";
import { authUserSelector } from "@/app/store/selectors/authUser";
import { selectGameWeekBySqlId } from "@/app/store/selectors/gameWeeks";
import { selectGameBySqlId } from "@/app/store/selectors/games";
import {
  fetchGameAction,
  fetchGameWeekWithGameAction,
} from "@/app/store/sharedActions/fetch";

import { Badge } from "@/components/badge/Badge";
import Button from "@/components/button/Button";
import CommentBox from "@/components/commentBox/CommentBox";
import HorizontalDivider from "@/components/divider/HorizontalDivider";
import TextEditable from "@/components/form/TextEditable";
import Heading from "@/components/heading/Heading";
import { Box } from "@/components/layout/Box";
import { FlexContainer, FlexItem } from "@/components/layout/FlexContainer";
import { GridContainer, GridItem } from "@/components/layout/Grid";
import List from "@/components/list/List";
import Loader from "@/components/loader/Loader";
import Spacer from "@/components/spacer/Spacer";
import P from "@/components/text/P";
import Span from "@/components/text/Span";

import { getPseudoRandomFromArrayFromString } from "@/utils/random";

const Styled = styled.div`
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  display: flex;
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  > * {
    flex-grow: 1;
  }
`;

export default function GameWeek({
  params,
}: {
  params: { gameWeekId: string; gameId: string };
}) {
  const { gameWeekId, gameId } = params;

  const gameWeek = useAppSelector((state) =>
    selectGameWeekBySqlId(state, gameWeekId),
  );

  const dispatch = useAppDispatch();

  const { fetchStatus: gameWeekFetchStatus = "none" } = gameWeek || {};

  useEffect(() => {
    // If the gameWeek is pending or errored return right away
    if (
      gameWeekFetchStatus === "pending" ||
      gameWeekFetchStatus === "failed" ||
      gameWeekFetchStatus === "fetched"
    ) {
      return;
    }
    dispatch(fetchGameWeekWithGameAction(gameWeekId as string));
  }, [gameWeekFetchStatus, dispatch, gameWeekId]);

  if (gameWeek?.fetchStatus === "fetched") {
    return <FetchedGameWeek gameWeek={gameWeek}></FetchedGameWeek>;
  }

  return (
    <Styled>
      <Spacer $padding="medium">
        {gameWeek?.fetchStatus === "pending" && <Loader />}
        {gameWeek?.fetchStatus === "failed" && <h1>Error</h1>}
      </Spacer>
    </Styled>
  );
}

function BoxWithSpacer({
  children,
  backgroundColor = "lightGrey_100",
}: PropsWithChildren<{
  backgroundColor?: ColorName;
}>) {
  return (
    <Box
      $backgroundColor={backgroundColor}
      $borderRadius={defaultBorderRadius}
      $border={`1px solid ${getColor("grey_100")}`}
    >
      <Spacer $paddingX="small" $paddingY="small">
        {children}
      </Spacer>
    </Box>
  );
}

const StyledGameWeek = styled.div`
  background-color: ${getColor("white")};
  color: ${getColor("black")};
  max-height: 100%;
  height: 100%;
  width: 100%;
  overflow: auto;
  padding: 2rem;
`;
function FetchedGameWeek({ gameWeek }: { gameWeek: StoreFetchedGameWeek }) {
  const dispatch = useAppDispatch();

  const game: StoreGame | null = useAppSelector((state) =>
    selectGameBySqlId(state, gameWeek.gameId),
  );

  const authUser = useAppSelector(authUserSelector);

  const [newTheme, setNewTheme] = useState<string | null>(null);

  const {
    theme,
    themePoll,
    finalizeThemePoll,
    updateTheme,
    upsertThemePoll,
    voteForTheme,
  } = useGameWeekTheme(gameWeek.firestoreId);

  const { fetchStatus: gameFetchStatus } = game || {};

  useEffect(() => {
    if (
      gameWeek.gameId &&
      gameFetchStatus !== "fetched" &&
      gameFetchStatus !== "pending" &&
      gameFetchStatus !== "failed"
    ) {
      dispatch(fetchGameAction(gameWeek.gameId as string));
    }
  }, [gameWeek.gameId, gameFetchStatus, dispatch]);

  const isAdmin = authUser?.sqlId === game?.adminSqlId;

  const handleThemeSubmit = async () => {
    const formatted = newTheme?.trim() || "";
    try {
      await updateTheme(formatted.length > 0 ? formatted : null);
      setNewTheme(null);
    } catch (err) {
      console.error("Failed to update theme", err);
    }
  };

  const handleVote = async (theme: string) => {
    if (!authUser?.sqlId) {
      alert("Please log in to vote");
      return;
    }
    try {
      await voteForTheme(theme, authUser.sqlId);
    } catch (err) {
      console.error("Failed to vote for theme", err);
    }
  };

  return (
    <StyledGameWeek>
      <GridContainer>
        <GridItem>
          <BoxWithSpacer>
            <P>{formatDateTime(gameWeek.startDateTime, "timeShortMonthDay")}</P>
          </BoxWithSpacer>
        </GridItem>
        <GridItem $smCol={6}>
          <BoxWithSpacer>
            <FlexContainer
              $gap="medium"
              $direction="column"
              $alignItems="stretch"
            >
              <FlexItem>
                <BoxWithSpacer backgroundColor="white">
                  <Heading $variant="h4">
                    Theme:&nbsp;
                    {isAdmin ? (
                      <TextEditable
                        text={theme || "No theme set"}
                        onChange={(e) => setNewTheme(e)}
                        onBlur={handleThemeSubmit}
                      />
                    ) : (
                      <Span>{theme || "No theme set"}</Span>
                    )}
                  </Heading>
                </BoxWithSpacer>
              </FlexItem>
              {isAdmin && !theme && (
                <BoxWithSpacer backgroundColor="white">
                  <CreateOrEditThemePoll
                    existingPoll={themePoll}
                    handleFinalizePoll={finalizeThemePoll}
                    handleUpsertPoll={(themes) => upsertThemePoll(themes)}
                  />
                </BoxWithSpacer>
              )}
              {isAdmin && !theme && themePoll && (
                <BoxWithSpacer backgroundColor="white">
                  <ThemePoll
                    pollOptions={themePoll.options}
                    handleVote={(theme: string) => handleVote(theme)}
                  />
                </BoxWithSpacer>
              )}
            </FlexContainer>
          </BoxWithSpacer>
        </GridItem>
        <GridItem $smCol={6}>
          <BoxWithSpacer>
            <CommentBox resourcePath={`gameWeeks/${gameWeek.firestoreId}`} />
          </BoxWithSpacer>
        </GridItem>
      </GridContainer>
    </StyledGameWeek>
  );
}

interface CreateThemePollProps {
  handleUpsertPoll: (themes: string[]) => Promise<void>;
  handleFinalizePoll: () => Promise<void>;
  existingPoll: TFirebaseGameWeekThemePollSchema | null;
}
function CreateOrEditThemePoll({
  handleUpsertPoll,
  existingPoll,
  handleFinalizePoll,
}: CreateThemePollProps) {
  const isCreate = !existingPoll;

  const handleOptionItemChange = (uid: string) => (value: string) => {
    setThemeOptions((opts) => {
      return opts.map((opt) => {
        if (opt.uid === uid) {
          return { ...opt, value };
        }
        return opt;
      });
    });
  };

  const [themeOptions, setThemeOptions] = useState<
    {
      value: string;
      uid: string;
    }[]
  >([]);

  useEffect(() => {
    setThemeOptions(
      Object.keys((existingPoll || {}).options || {}).map((theme) => ({
        value: theme,
        uid: v4(),
      })),
    );
  }, [existingPoll]);

  const handleOptionDelete = (uid: string) => () => {
    setThemeOptions((opts) => {
      const updatedOptions = opts.filter((opt) => opt.uid !== uid);

      // Call handleUpsertPoll with the new list of themes
      handleUpsertPoll(updatedOptions.map((opt) => opt.value))
        .then(() => {
          console.log("Updated theme options after deletion");
        })
        .catch((err) => {
          console.error("Failed to update theme options after deletion", err);
        });

      return updatedOptions;
    });
  };

  const [newThemeOption, setNewThemeOption] = useState<string>("Add option +");
  return (
    <FlexItem>
      <List
        items={themeOptions}
        orderBy={(a, b) => a.value.localeCompare(b.value)}
        renderItem={(opt) => (
          <FlexContainer $alignItems="center" $gap="medium">
            <FlexItem $grow={1}>
              <TextEditable
                text={opt.value}
                onChange={handleOptionItemChange(opt.uid)}
              />
            </FlexItem>
            <Badge
              $color="red"
              text="x"
              $size="small"
              $cursor="pointer"
              onClick={handleOptionDelete(opt.uid)}
            />
          </FlexContainer>
        )}
        keyExtractor={(opt) => opt.uid}
        ListHeaderComponent={
          <Heading $variant="h4" $underline>
            Create theme poll.
          </Heading>
        }
        ListFooterComponent={
          <>
            <TextEditable
              text={newThemeOption}
              onChange={(value) => setNewThemeOption(value)}
              onBlur={(value) => {
                setThemeOptions((opts) => {
                  if (opts.some((opt) => opt.value === value)) {
                    return opts;
                  }
                  return [...opts, { value, uid: v4() }];
                });
                setNewThemeOption("Add option +");
              }}
            />
            <HorizontalDivider $marginY="small" />
            <Button
              size="sm"
              disabled={themeOptions.length < 2}
              onClick={() => {
                handleUpsertPoll(themeOptions.map((opt) => opt.value))
                  .then(() => {
                    console.log("Created theme poll");
                  })
                  .catch((err) => {
                    console.error("Failed to create theme poll", err);
                  });
              }}
              buttonText={isCreate ? "Create poll" : "Update poll"}
            />
            <Button
              size="sm"
              disabled={themeOptions.length < 2}
              onClick={handleFinalizePoll}
              buttonText="End Poll"
            />
          </>
        }
      />
    </FlexItem>
  );
}
interface ThemePollProps {
  handleVote: (theme: string) => Promise<void>;
  pollOptions: TFirebaseGameWeekThemePollSchema["options"];
}

function ThemePoll({ pollOptions, handleVote }: ThemePollProps) {
  return (
    <FlexContainer $gap="medium" $direction="column">
      <Heading $variant="h4" $underline>
        Current Theme Poll
      </Heading>
      <List
        items={Object.keys(pollOptions)}
        orderBy={(a, b) => a.localeCompare(b)}
        renderItem={(theme) => (
          <FlexContainer
            $gap="small"
            $alignItems="center"
            onClick={() => handleVote(theme)}
            $width="100%"
          >
            <FlexItem $grow={1}>
              <Badge
                text={theme}
                $color={getPseudoRandomFromArrayFromString(theme, gameColors)}
                $fullWidth={true}
                $cursor="pointer"
                $size="medium"
              />
            </FlexItem>
            <FlexItem>
              <Span>{pollOptions[theme].votes.length}</Span>
            </FlexItem>
          </FlexContainer>
        )}
      />
    </FlexContainer>
  );
}
