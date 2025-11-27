import { fetcher } from "../fetcher";

export const getPackage = async () => {
    return await fetcher('/gamePackets', {
        method: 'GET',
    })
};       


export const PurchasePackage = async (id, token) => {
    return await fetcher(`/gamepackets/purchase/${id}`, {
        method: 'POST',
        body: { token },
    })
};


export const getGamePacketsHistory = async (token) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Build URL with token as query parameter if token is provided
    let url = `${baseUrl}/api/gamepackets/purchase/history`;
    if (token) {
        url += `?token=${encodeURIComponent(token)}`;
    }

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }

    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }
    return response.json();
}