class AuthService {
    constructor() {
        this.baseUrl = config.API_BASE_URL;
    }

    async register(data) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Registration Error:', error);
            throw error;
        }
    }

    async login(data) {
        try {
            const response = await fetch(`${this.baseUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorData = await response.json(); // Usually a map of errors or simple message
                throw new Error(errorData.message || 'Login failed'); // Backend might send different error structure
            }

            const responseData = await response.json();
            if (responseData.token) {
                localStorage.setItem('token', responseData.token);
                localStorage.setItem('user', JSON.stringify(responseData));
            }
            return responseData;
        } catch (error) {
            console.error('Login Error:', error);
            throw error;
        }
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }

    getCurrentUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
}

const authService = new AuthService();
