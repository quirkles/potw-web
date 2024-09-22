import { createAsyncThunk } from "@reduxjs/toolkit";

import { fetchGame as fetchGameRequest } from "@/app/services/backend/game";
import { fetchOneWithGame } from "@/app/services/backend/gameWeek/fetchOneWithGame";

export const fetchGameAction = createAsyncThunk(
  "game/fetchOne",
  fetchGameRequest,
);

export const fetchGameWeekWithGameAction = createAsyncThunk(
  "gameWeek/fetchOneWithGame",
  fetchOneWithGame,
);
