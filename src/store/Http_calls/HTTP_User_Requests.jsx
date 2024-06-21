const serverURL = import.meta.env.VITE_APP_CODESPACE_NAME ? `https://${import.meta.env.VITE_APP_CODESPACE_NAME}-3001.app.github.dev/api` : 'localhost:3001';

export const registerUserRequests = async (userData) => {
    const response = await fetch(`${serverURL}/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
    return data;
}

export const logInUserRequests = async (userData) => {
    const response = await fetch(`${serverURL}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response:', data);
    return data;
}

