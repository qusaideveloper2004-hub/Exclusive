
export interface CheckoutValidationMessages {
    firstName: string;
    streetAddress: string;
    townCity: string;
    phoneNumber: string;
    emailAddress: string;
}


export interface CheckoutFormInput {
    firstName: string;
    companyName?: string;
    streetAddress: string;
    apartment?: string;
    townCity: string;
    phoneNumber: string;
    emailAddress: string;
    saveInfo?: boolean;
    paymentMethod?: "bank" | "cash";
    couponCode?: string;
}

export interface CheckoutFormData {
    firstName: string;
    companyName?: string;
    streetAddress: string;
    apartment?: string;
    townCity: string;
    phoneNumber: string;
    emailAddress: string;
    saveInfo: boolean;
    paymentMethod: "bank" | "cash";
    couponCode?: string;
}

