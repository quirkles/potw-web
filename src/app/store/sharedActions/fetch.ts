import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchAllVotesForGame,
  fetchGame as fetchGameRequest,
} from "@/app/services/backend/game";
import { fetchOneWithGame } from "@/app/services/backend/gameWeek";

export const fetchGameAction = createAsyncThunk(
  "game/fetchOne",
  fetchGameRequest,
);

export const fetchGameWeekWithGameAction = createAsyncThunk(
  "gameWeek/fetchOneWithGame",
  fetchOneWithGame,
);

export const fetchAllVotesForGameAction = createAsyncThunk(
  "votes/fetchAllForGame",
  fetchAllVotesForGame,
);
