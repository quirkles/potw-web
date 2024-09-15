import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import { UserUpdate, userUpdateSchema } from "@/app/services/schemas/backend/user";
import {
  UserWithRelations,
  userWithRelationsSchema,
} from "@/app/services/schemas/backend/withRelations";

export const fetchUserByIdRequest = (id: string): Promise<UserWithRelations> =>
  httpService.get({
    url: `${getConfig().functionsUrl}/app-user-fetchOne?id=${id}&includeGames=true`,
    responseSchema: userWithRelationsSchema,
    useAppCheck: true,
  }) as Promise<UserWithRelations>;

export const updateUserRequest = (
  user: Partial<UserUpdate>,
): Promise<UserUpdate> =>
  httpService.post({
    url: `${getConfig().functionsUrl}/app-user-update`,
    responseSchema: userUpdateSchema,
    useAppCheck: true,
    body: user,
  });
