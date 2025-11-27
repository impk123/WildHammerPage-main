export const getGacha = async (num, token) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${baseUrl}/api/gachapackets/buyGachaPacket?num=${num}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ token })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
};

export const getActiveGacha = async (token) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Build URL with token as query parameter if token is provided
    let url = `${baseUrl}/api/gachapackets/active`;
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

export const getGachaHistory = async (token) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    
    // Build URL with token as query parameter if token is provided
    let url = `${baseUrl}/api/gachapackets/history`;
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
