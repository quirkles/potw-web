"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { gameWeeksSlice } from "@/app/store/reducers/gameWeeksReducer";
import { selectGameWeekBySqlId } from "@/app/store/selectors/gameWeeks";

const Styled = styled.div``;

export default function GameWeek({ params }: { params: { id: string } }) {
  const gameWeek = useAppSelector((state) =>
    selectGameWeekBySqlId(state, params.id),
  );
  const dispatch = useAppDispatch();

  const doesGameWeekExist = !!gameWeek;

  useEffect(() => {
    if (!doesGameWeekExist && params.id) {
      dispatch(gameWeeksSlice.actions.fetchOneWithGame(params.id));
    }
    return;
  }, [dispatch, params.id, doesGameWeekExist]);
  return <Styled>GameWeek</Styled>;
}
