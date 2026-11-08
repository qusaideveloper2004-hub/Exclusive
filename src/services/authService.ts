import { LoginCredentials, AuthResponse } from "@/types/auth";

const BASE_URL = "https://fakestoreapi.com";

export const authService = {

async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({

            username: credentials.username 
            // || credentials.emailOrPhone,
            ,password: credentials.password,
        }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message );
    }

    const data: AuthResponse = await response.json();
    return data;
},
};

