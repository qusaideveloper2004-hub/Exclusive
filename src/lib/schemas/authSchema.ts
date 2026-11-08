import * as z from "zod";

interface AuthMessages {

    requiredField?: string;
    invalidEmail?: string;
    passwordMin?: string;
    passwordMatch?: string;

}


export const createLoginSchema = (messages?: AuthMessages) =>

z.object({
    emailOrPhone: z .string() .min(1, messages?.requiredField || "Email or Phone Number is required"),
    password: z .string() .min(1, messages?.requiredField || "Password is required"),
});


export type LoginFormData = z.infer<ReturnType<typeof createLoginSchema>>;


export const createSignupSchema = (messages?: AuthMessages) =>
z.object({
    name: z.string().min(2, messages?.requiredField || "Name is required"),
    emailOrPhone: z .string() .min(1, messages?.requiredField || "Email or Phone Number is required"),
    password: z .string() .min(6, messages?.passwordMin || "Password must be at least 6 characters"),
});


export type SignupFormData = z.infer<ReturnType<typeof createSignupSchema>>;



export const createAccountSchema = (messages?: AuthMessages) =>
z.object({

        firstName: z.string().min(1, messages?.requiredField || "First Name is required"),
        lastName: z.string().min(1, messages?.requiredField || "Last Name is required"),

        email: z.string().email(messages?.invalidEmail || "Invalid email address"),

        address: z.string().min(1, messages?.requiredField || "Address is required"),

        currentPassword: z.string().optional(),
        newPassword: z.string().optional(),
        confirmNewPassword: z.string().optional(),

    })

.refine( (data) => {
    
    if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
        return false;
    }
        return true;
    },

    {
        message: messages?.passwordMatch || "Passwords do not match",
        path: ["confirmNewPassword"],
    }

);

export type AccountFormData = z.infer<ReturnType<typeof createAccountSchema>>;


