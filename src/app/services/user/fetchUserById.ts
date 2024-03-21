import {
    FindUserByIdResponse,
    findUserByIdResponseSchema
} from "@/app/services/schemas/user";
import {getConfig} from "@/config";

export const fetchUserByIdRequest = (id: string):Promise<FindUserByIdResponse> => {
    return fetch(`${getConfig().functionsUrl}/fetchUserById?id=${id}`)
        .then(r => r.json())
        .then(d => {
          return new Promise((resolve, reject) => setTimeout(() => resolve(d), 500000))
        })
        .then(d => findUserByIdResponseSchema.parse(d));
}
