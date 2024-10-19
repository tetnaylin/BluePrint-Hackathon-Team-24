
const checkTokenExpiration = (token) => {
    if (!token) {
        return true; // No token means expired
    }

    // Split the token into its parts
    const parts = token.split('.');
    if (parts.length !== 3) {
        console.log(parts.length);
        console.log(parts);
        throw new Error('Invalid JWT');
    }

    // Decode the payload (second part)
    const payload = parts[1];
    
    // Decode Base64 URL string
    const base64Url = payload.replace(/-/g, '+').replace(/_/g, '/');
    const binaryString = window.atob(base64Url);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    const decoder = new TextDecoder('utf-8');
    const decodedPayload = decoder.decode(bytes);

    // Parse the JSON payload
    const { exp } = JSON.parse(decodedPayload);
    
    // Check if the token is expired
    return exp * 1000 < Date.now(); // exp is in seconds, Date.now() is in milliseconds
};

export default async function checkLoggedIn() {
    console.log("hello");
    const refreshToken = localStorage.getItem(`present-refresh`);
    const accessToken = localStorage.getItem(`present-access`);

    console.log(accessToken);

    if(!checkTokenExpiration(accessToken) && refreshToken) {
        const response = await fetch('https://a627-193-119-101-191.ngrok-free.app/getNewToken', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
        });
        const newToken  = await response.json();
        localStorage.setItem('present-access', newToken.accessToken);
        return true;
    } 
    return false;
}