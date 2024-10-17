// It's for the backend, so I tink it's fine if we export this
// Input: (zID: string, password: string)
// Output: Boolean(promise) and console.errors
export async function authenticateStudent(zID: string, password: string): Promise<boolean> {
    if (process.env.NODE_ENV !== 'development') {
        if (/^[a-zA-Z0-9]+$/.test(zID) || !/^z[0-9]{7}$/.test(zID)) {

        const payload = { zid: zID, zpass: password };
        const verifyResponse = await fetch('https://verify.csesoc.unsw.edu.au/v1', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (verifyResponse.ok) {
            console.log(`STUDENT=${zID} is logged in`);
            return true;
        }

        if (verifyResponse.status === 401) {
            console.error(`Failed to login STUDENT=${zID} due to INCORRECT PASSWORD`);
        } else {
            console.error(
            `Failed to login STUDENT=${zID} due to ERROR CODE ${verifyResponse.status}`,
            );
        }
        return false;
        }

        // if unexpected characters are found, immediately reject
        console.error(`Failed to login STUDENT=${zID} due to INVALID FORMAT`);
        return false;
    }
    return true;
}
