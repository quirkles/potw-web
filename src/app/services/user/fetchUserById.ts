import { getConfig } from "@/config";

import { httpService } from "@/app/services/http/http.service";
import { User, userSchema } from "@/app/services/schemas/user";

export const fetchUserByIdRequest = (id: string): Promise<User> =>
  httpService.get({
    url: `${getConfig().functionsUrl}/app-user-fetchOne?id=${id}&includeGames=true`,
    responseSchema: userSchema,
    useAppCheck: true,
  });
