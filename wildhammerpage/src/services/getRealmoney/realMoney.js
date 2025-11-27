
// import { fetcher } from '../fetcher';

export const getRealMoney = async (userId, token) => {
    // return await fetcher(`/auth/decode-auth-token`, {
    //     method: 'POST',
    //     body: { token },
    // });

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/userEvent/getInfo/${userId}?token=${token}`, {
        method: 'GET',
    });
    const data = await response.json();
    return data;
};