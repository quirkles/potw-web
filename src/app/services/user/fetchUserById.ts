import { User, userSchema } from "@/app/services/schemas/user";
import { getConfig } from "@/config";

export const fetchUserByIdRequest = (id: string): Promise<User> =>
  fetch(`${getConfig().functionsUrl}/fetchUserById?id=${id}&includeGames=true`)
    .then((r) => r.json())
    .then((d) => userSchema.parse(d));
