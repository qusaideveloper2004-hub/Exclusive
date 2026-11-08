"use client";

import { useTranslations } from "next-intl";

import type { UseFormRegister, FieldErrors } from "react-hook-form";

import type { CheckoutFormInput } from "@/types/checkout";
import { Input } from "@/components/ui/Input";


type BillingDetailsFormProps = {register: UseFormRegister<CheckoutFormInput>;errors: FieldErrors<CheckoutFormInput>; };


export default function BillingDetailsForm({ register, errors }: BillingDetailsFormProps) {

    const t = useTranslations("Checkout");


    return (

        <div>

            <h1 className="mb-7 text-2xl font-medium text-black sm:text-3xl">
                {t("billingDetails")}
            </h1>

            <div className="space-y-5">

                <div>
                    <label htmlFor="firstName" className="mb-2 block text-xs text-gray-500">
                        {t("firstName")} <span aria-hidden="true">*</span>
                    </label>

                    <Input
                        id="firstName"
                        aria-required="true"
                        {...register("firstName")}
                        autoComplete="given-name"
                        className="h-11 border-none bg-[#F5F5F5]"
                        error={errors.firstName?.message}
                    />
                </div>

                <div>
                    <label htmlFor="companyName" className="mb-2 block text-xs text-gray-500">
                        {t("companyName")}
                    </label>

                    <Input
                        id="companyName"
                        {...register("companyName")}
                        autoComplete="organization"
                        className="h-11 border-none bg-[#F5F5F5]"
                    />
                </div>

                <div>
                    <label htmlFor="streetAddress" className="mb-2 block text-xs text-gray-500">
                        {t("streetAddress")} <span aria-hidden="true">*</span>
                    </label>

                    <Input
                        id="streetAddress"
                        aria-required="true"
                        {...register("streetAddress")}
                        autoComplete="street-address"
                        className="h-11 border-none bg-[#F5F5F5]"
                        error={errors.streetAddress?.message}
                    />
                </div>

                <div>
                    <label htmlFor="apartment" className="mb-2 block text-xs text-gray-500">
                        {t("apartment")}
                    </label>

                    <Input
                        id="apartment"
                        {...register("apartment")}
                        autoComplete="address-line2"
                        className="h-11 border-none bg-[#F5F5F5]"
                    />
                </div>

                <div>
                    <label htmlFor="townCity" className="mb-2 block text-xs text-gray-500">
                        {t("townCity")} <span aria-hidden="true">*</span>
                    </label>

                    <Input
                        id="townCity"
                        aria-required="true"
                        {...register("townCity")}
                        autoComplete="address-level2"
                        className="h-11 border-none bg-[#F5F5F5]"
                        error={errors.townCity?.message}
                    />
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="mb-2 block text-xs text-gray-500">
                        {t("phoneNumber")} <span aria-hidden="true">*</span>
                    </label>

                    <Input
                        id="phoneNumber"
                        aria-required="true"
                        {...register("phoneNumber")}
                        type="tel"
                        autoComplete="tel"
                        className="h-11 border-none bg-[#F5F5F5]"
                        error={errors.phoneNumber?.message}
                    />
                </div>

                <div>
                    <label htmlFor="emailAddress" className="mb-2 block text-xs text-gray-500">
                        {t("emailAddress")} <span aria-hidden="true">*</span>
                    </label>

                    <Input
                        id="emailAddress"
                        aria-required="true"
                        {...register("emailAddress")}
                        type="email"
                        autoComplete="email"
                        className="h-11 border-none bg-[#F5F5F5]"
                        error={errors.emailAddress?.message}
                    />
                </div>

                <label className="flex items-center gap-3 pt-1 text-xs text-black">

                    <input
                        type="checkbox"
                        {...register("saveInfo")}
                        className="h-4 w-4 accent-[#DB4444]"
                    />

                    {t("saveInfo")}

                </label>

            </div>

        </div>

    );

}


