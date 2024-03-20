import {
    FindUserByIdResponse,
    findUserByIdResponseSchema
} from "@/app/services/schemas/user";
import {getConfig} from "@/config";

export const fetchUserByIdRequest = (id: string):Promise<FindUserByIdResponse> => {
    return fetch(`${getConfig().functionsUrl}/fetchUserById?id=${id}`)
        .then(r => r.json())
        .then(d => {
            console.log('\n####\n',d ,'\n####\n')
            return d;
        })
        .then(d => findUserByIdResponseSchema.parse(d));
}
