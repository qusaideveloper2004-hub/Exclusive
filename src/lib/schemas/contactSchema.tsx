

import { z } from "zod";

export const contactSchema = z.object({


name: z .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
email: z .string()
    .email({ message: "Please enter a valid email address" }),
phone: z .string()
    .min(6, { message: "Please enter a valid phone number" }),
message: z .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;


