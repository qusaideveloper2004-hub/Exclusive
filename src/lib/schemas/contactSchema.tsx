

import { z } from "zod";
import { PHONE_NUMBER_REGEX } from "./patterns";

export const contactSchema = z.object({


name: z .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
email: z.email({ error: "Please enter a valid email address" }),
phone: z.string()
    .regex(PHONE_NUMBER_REGEX, { error: "Enter a valid phone number." }),
message: z .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

