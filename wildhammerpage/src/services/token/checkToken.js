import { fetcher } from '../fetcher';

export const checkToken = async (token) => {
    // return await fetcher(`/auth/decode-auth-token`, {
    //     method: 'POST',
    //     body: { token },
    // });

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/auth/decode-auth-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ token }),
    });
    const data = await response.json();
    return data;
};