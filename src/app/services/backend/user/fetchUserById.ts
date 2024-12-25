import {
  sqlUserWithRelationsSchema,
  TSqlUserWithRelations,
  userUpdateSchema,
} from "@potw/schemas";
import { TUserUpdate } from "@potw/schemas/dist/lib/contract/user";

import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";

export const fetchUserByIdRequest = (
  id: string,
): Promise<TSqlUserWithRelations> =>
  httpService.get({
    url: `${getConfig().functionsUrl}/app-user-fetchOne?id=${id}&includeGames=true`,
    responseSchema: sqlUserWithRelationsSchema,
    useAppCheck: true,
  }) as Promise<TSqlUserWithRelations>;

export const updateUserRequest = (
  user: Partial<TUserUpdate>,
): Promise<TUserUpdate> =>
  httpService.post({
    url: `${getConfig().functionsUrl}/app-user-update`,
    responseSchema: userUpdateSchema,
    useAppCheck: true,
    body: user,
  });
