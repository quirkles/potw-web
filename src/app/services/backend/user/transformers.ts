import { UserWithRelations } from "@/app/services/schemas/backend/withRelations";
import { StoreFetchedUser } from "@/app/services/schemas/store/user";

export function userToStoreUser(user: UserWithRelations): StoreFetchedUser {
  return {
    ...user,
    status: "fetched",
    gamesAsAdmin: user.gamesAsAdmin?.map((game) => game.sqlId) || [],
    gamesAsParticipant:
      user.gamesAsParticipant?.map((game) => game.sqlId) || [],
    picks: user.picks?.map((pick) => pick.sqlId) || [],
  };
}
