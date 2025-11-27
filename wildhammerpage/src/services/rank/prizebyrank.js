import { fetcher } from "../fetcher";

export const getPrizeByRank = async () => {
    return await fetcher('/prizebyrank', {
        method: 'GET',
    })
};       


export const getPrizeSettings = async () => {
    return  await fetcher('/prizesettings', {
        method: 'GET',
    })
}