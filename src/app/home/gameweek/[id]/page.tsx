"use client";

import { useEffect } from "react";
import { styled } from "styled-components";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectGameWeekBySqlId } from "@/app/store/selectors/gameWeeks";
import { fetchGameWeekWithGameAction } from "@/app/store/sharedActions/fetch";

const Styled = styled.div``;

export default function GameWeek({ params }: { params: { id: string } }) {
  const gameWeek = useAppSelector((state) =>
    selectGameWeekBySqlId(state, params.id),
  );
  const dispatch = useAppDispatch();

  const doesGameWeekExist = !!gameWeek;

  useEffect(() => {
    if (!doesGameWeekExist && params.id) {
      dispatch(fetchGameWeekWithGameAction(params.id));
    }
    return;
  }, [dispatch, params.id, doesGameWeekExist]);
  return <Styled>GameWeek</Styled>;
}
