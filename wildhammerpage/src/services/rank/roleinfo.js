import { fetcher } from "../fetcher";

export const getRoleinfo = async () => {
    return await fetcher('/roleinfo?limit=1000', {
        method: 'GET',
    })
};       