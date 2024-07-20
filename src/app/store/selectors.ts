import {createSelector} from "reselect";
import {authUserSelectors} from "@/app/store/reducers/authUserReducer";
import {gameSelectors} from "@/app/store/reducers/gamesReducer";

export const selectGamesForUsers = createSelector(
    [authUserSelectors.getAuthUser, gameSelectors.getGames],
    (authUser, games) => {
        return authUser && Object.values(games).length ?
            Object.values(games).filter(game => game.players.includes(authUser?.sqlId || "NONE") || game.admin.sqlId === authUser?.sqlId || "NONE") : null;
    })