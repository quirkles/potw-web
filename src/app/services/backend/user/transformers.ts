import { TSqlUserWithRelations } from "@potw/schemas";

import { StoreFetchedUser } from "@/app/store/schemas/user";

export function userToStoreUser(user: TSqlUserWithRelations): StoreFetchedUser {
  return {
    ...user,
    status: "fetched",
    gamesAsAdmin: user.gamesAsAdmin?.map((game) => game.sqlId) || [],
    gamesAsParticipant:
      user.gamesAsParticipant?.map((game) => game.sqlId) || [],
    picks: user.picks?.map((pick) => pick.sqlId) || [],
  };
}
