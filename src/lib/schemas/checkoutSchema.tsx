import * as z from "zod";
import type { CheckoutFormData, CheckoutFormInput, CheckoutValidationMessages,  } from "@/types/checkout";
import { PHONE_NUMBER_REGEX } from "./patterns";


export function createCheckoutSchema(messages: CheckoutValidationMessages) {

    return z.object({

        firstName: z.string().min(2, messages.firstName),
        companyName: z.string().optional(),
        streetAddress: z.string().min(5, messages.streetAddress),
        apartment: z.string().optional(),
        townCity: z.string().min(2, messages.townCity),
        phoneNumber: z.string().regex(PHONE_NUMBER_REGEX, messages.phoneNumber),
        emailAddress: z.email({ error: messages.emailAddress }),
        saveInfo: z.boolean().default(false),
        paymentMethod: z.enum(["bank", "cash"]).default("cash"),
        couponCode: z.string().optional(),

    }) satisfies z.ZodType<CheckoutFormData, CheckoutFormInput>;
}
