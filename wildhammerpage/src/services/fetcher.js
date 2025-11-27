
export const fetcher = async (url, options = {}) => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL ;

        // Get token or fallback to guestToken
        const token = localStorage.getItem('token') || localStorage.getItem('guestToken');
        
        // Prepare body and headers
        let body = options.body;
        let headers = { 
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        };
        
        if (body instanceof FormData) {
            // For FormData, don't set Content-Type header (let browser set it with boundary)
        } else if (body && typeof body === 'object') {
            // For regular objects, stringify and set JSON content type
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        const response = await fetch(baseUrl+"/api" + url, {
            ...options,
            body,
            headers
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
        }
        
        return response.json();
    } catch (error) {
        // Suppress runtime.lastError messages from browser extensions
        if (error.message && error.message.includes('runtime.lastError')) {
            console.warn('Browser extension error suppressed:', error.message);
            return null; // Return null for extension-related errors
        }
        
        // Re-throw other errors
        throw error;
    }
};

