export default async function checkLoggedIn() {
    const refreshToken = localStorage.getItem(`present-refresh`);
    const accessToken = localStorage.getItem(`present-access`);

    if(!accessToken && refreshToken) {
        const response = await fetch('http://localhost:5180/getNewToken', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(refreshToken)
        });
        const { newToken } = await response.json();
        
        localStorage.setItem('present-access', newToken);
        return true;
    }
    return !!accessToken;
}