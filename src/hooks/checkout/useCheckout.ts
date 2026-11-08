import { useState } from "react";

import { useLocale, useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import { type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createCheckoutSchema } from "@/lib/schemas/checkoutSchema";

import type { CheckoutFormData, CheckoutFormInput } from "@/types/checkout";

import { useCartStore } from "@/store/useCartStore";


export function useCheckout() {

    const t = useTranslations("Checkout");
    const locale = useLocale();


    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [couponStatus, setCouponStatus] = useState<"success" | "error" | null>(null);


    const { items, clearCart, getTotalPrice, appliedCoupon, applyCoupon } = useCartStore();


    const checkoutSchema = createCheckoutSchema({
        firstName: t("validation.firstName"),
        streetAddress: t("validation.streetAddress"),
        townCity: t("validation.townCity"),
        phoneNumber: t("validation.phoneNumber"),
        emailAddress: t("validation.emailAddress"),
    });


    const {
        register,
        handleSubmit,
        trigger,
        getValues,
        formState: { errors },
    } = useForm<CheckoutFormInput, unknown, CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            firstName: "",
            companyName: "",
            streetAddress: "",
            apartment: "",
            townCity: "",
            phoneNumber: "",
            emailAddress: "",
            paymentMethod: "cash",
            saveInfo: true,
            couponCode: "",
        },
    });


    const subtotal = getTotalPrice();
    const shipping = 0;
    const discount = appliedCoupon ? subtotal * 0.1 : 0;
    const total = subtotal - discount + shipping;


    const formatPrice = (amount: number) =>
        new Intl.NumberFormat(locale, {
            style: "currency",
            currency: "USD",
        }).format(amount);



    const handleApplyCoupon = () => {

        const couponCode = getValues("couponCode")?.trim().toUpperCase();
        const isValid = applyCoupon(couponCode ?? "");

        setCouponStatus(isValid ? "success" : "error");

    };



    const handleNextStep = async () => {

        const valid = await trigger([
            "firstName",
            "streetAddress",
            "townCity",
            "phoneNumber",
            "emailAddress",
        ]);

        if (valid) setStep(2);

    };



    const handleBackStep = () => {
        setStep(1);
    };



    const handleEditShipping = () => {
        setStep(1);
    };



    const onSubmit: SubmitHandler<CheckoutFormData> = () => {

        clearCart();
        setStep(3);

    };


    return {
        t,

        step,
        setStep,

        couponStatus,

        items,
        appliedCoupon,

        register,
        handleSubmit,
        getValues,
        errors,

        subtotal,
        shipping,
        discount,
        total,
        formatPrice,

        handleApplyCoupon,
        handleNextStep,
        handleBackStep,
        handleEditShipping,

        onSubmit,

        formValues: getValues(),

    };

}


