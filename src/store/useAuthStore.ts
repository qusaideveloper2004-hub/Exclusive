import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "@/types/auth";


export const useAuthStore = create<AuthState>()(

persist( 

    (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,

    login: (token: string, user?: User) => {

        set({

            token: token,

            user: user || {
                firstName: "Qusai",
                lastName: "Essam",
                email: "qusaideveloper2004@gmail.com",
                address: "Mansoura, 110, Egypt",
            },
                isAuthenticated: true,
        });
        
    },

    logout: () => {
        set({
            user: null,
            token: null,
            isAuthenticated: false,
        });
    },
    
    
    updateUser: (updatedData) => {
        set((state) => ({ user: state.user ? { ...state.user, ...updatedData } : null, }));
    },

}),

    {
        name: "ecommerce-auth-storage",
    }
)

);