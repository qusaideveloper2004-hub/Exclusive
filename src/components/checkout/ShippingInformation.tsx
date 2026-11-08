"use client";

import { useTranslations } from "next-intl";

import type { CheckoutFormInput } from "@/types/checkout";
import { Button } from "@/components/ui/Button";


type ShippingInformationProps = { formValues: CheckoutFormInput; onEdit: () => void; };


export default function ShippingInformation({ formValues, onEdit }: ShippingInformationProps) {

    const t = useTranslations("Checkout");


    return (

        <div className="border-b border-gray-200 pb-6">

            <div className="mb-6 flex items-center justify-between gap-4">

                <h1 className="text-2xl font-medium text-black sm:text-3xl">
                    {t("shippingInformation")}
                </h1>

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={onEdit}
                >
                    {t("edit")}
                </Button>

            </div>

            <dl className="space-y-4 text-sm">

                <div>
                    <dt className="mb-1 text-xs text-gray-500">
                        {t("name")}
                    </dt>

                    <dd className="text-black">
                        {formValues.firstName}
                    </dd>
                </div>

                <div>
                    <dt className="mb-1 text-xs text-gray-500">
                        {t("address")}
                    </dt>

                    <dd className="text-black">
                        {[
                            formValues.streetAddress,
                            formValues.apartment,
                            formValues.townCity,
                        ]
                            .filter(Boolean)
                            .join(", ")}
                    </dd>
                </div>

                <div>
                    <dt className="mb-1 text-xs text-gray-500">
                        {t("phoneNumber")}
                    </dt>

                    <dd className="text-black">
                        {formValues.phoneNumber}
                    </dd>
                </div>

                <div>
                    <dt className="mb-1 text-xs text-gray-500">
                        {t("emailAddress")}
                    </dt>

                    <dd className="break-all text-black">
                        {formValues.emailAddress}
                    </dd>
                </div>

            </dl>

        </div>

    );

}


