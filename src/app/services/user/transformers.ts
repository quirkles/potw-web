import { StoreFetchedUser } from "@/app/services/schemas/store/user";
import { UserWithRelations } from "@/app/services/schemas/withRelations";

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
