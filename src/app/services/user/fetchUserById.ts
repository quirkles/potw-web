import {
    FindUserByIdResponse,
    findUserByIdResponseSchema
} from "@/app/services/schemas/user";
import {getConfig} from "@/config";

export const fetchUserByIdRequest = (id: string):Promise<FindUserByIdResponse> =>
    fetch(`${getConfig().functionsUrl}/fetchUserById?id=${id}&includeGames=true`)
        .then(r => r.json())
        .then(d => findUserByIdResponseSchema.parse(d));
