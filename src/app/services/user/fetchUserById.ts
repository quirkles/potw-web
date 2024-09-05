import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import {
  User,
  userSchema,
  UserUpdate,
  userUpdateSchema,
} from "@/app/services/schemas/user";

export const fetchUserByIdRequest = (id: string): Promise<User> =>
  httpService.get({
    url: `${getConfig().functionsUrl}/app-user-fetchOne?id=${id}&includeGames=true`,
    responseSchema: userSchema,
    useAppCheck: true,
  });

export const updateUserRequest = (
  user: Partial<UserUpdate>,
): Promise<UserUpdate> =>
  httpService.post({
    url: `${getConfig().functionsUrl}/app-user-update`,
    responseSchema: userUpdateSchema,
    useAppCheck: true,
    body: user,
  });
