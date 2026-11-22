import { LoginCredentials, AuthResponse } from "@/types/auth";

const BASE_URL = "https://fakestoreapi.com";

export const AUTH_LOGIN_FAILED = "AUTH_LOGIN_FAILED";

export const authService = {

async login(credentials: LoginCredentials): Promise<AuthResponse> {

    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
        }),

    });

    if (!response.ok) {
        throw new Error(AUTH_LOGIN_FAILED);
    }

    const data: AuthResponse = await response.json();
    
    return data;
},
};


