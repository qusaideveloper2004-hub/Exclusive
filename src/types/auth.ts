
export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phone?: string;
    address?: string;
    username?: string;
}


export interface LoginCredentials {
    username: string;
    // emailOrPhone?: string;
    password?: string;
}

export interface AuthResponse {
    token: string;
}



export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (token: string, user?: User) => void;
    logout: () => void;

    updateUser: (updatedData: Partial<User>) => void;
}

