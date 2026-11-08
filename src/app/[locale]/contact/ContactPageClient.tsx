
"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { Phone, Mail } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useForm } from "react-hook-form";
import { contactSchema, ContactFormData } from "@/lib/schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";


export default function ContactPageClient() {

const t = useTranslations("ContactPage");

const {register, handleSubmit, reset, formState:{ errors, isSubmitting },} = useForm<ContactFormData>(
    {
        resolver: zodResolver(contactSchema),
    });

const onSubmit = async (data: ContactFormData) => {
    void data;
    alert(t("messageSent"));
    reset();
};



return (

<main className="py-10 md:py-16">

    <div className="page-container max-w-[1170px] flex flex-col gap-12">

        <nav className="flex items-center gap-2 text-sm text-gray-500">

            <Link href="/" className="hover:text-black transition-colors">
                {t("breadcrumbHome")}
            </Link>

            <span>/</span>

            <span className="text-black font-medium">
                {t("breadcrumbContact")}
            </span>

        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-4 bg-white rounded shadow-sm border border-gray-100 p-8 flex flex-col gap-8">
                        
                <div className="flex flex-col gap-4">

                    <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center shrink-0">
                            <Phone className="w-5 h-5 fill-current" />
                        </div>

                        <h3 className="text-base font-medium text-black">
                            {t("callTitle")}
                        </h3>

                    </div>
                    
                    <p className="text-sm text-black leading-relaxed">
                        {t("callSubtitle")}
                    </p>

                    <p className="text-sm text-black font-normal">
                        {t("phone")}: +201032831805
                    </p>

                </div>

                <hr className="border-gray-300" />

                <div className="flex flex-col gap-4">

                    <div className="flex items-center gap-4">

                        <div className="w-10 h-10 rounded-full bg-[var(--brand)] text-white flex items-center justify-center shrink-0">
                            <Mail className="w-5 h-5" />
                        </div>

                        <h3 className="text-base font-medium text-black">
                            {t("writeTitle")}
                        </h3>

                    </div>

                    <p className="text-sm text-black leading-relaxed">
                        {t("writeSubtitle")}
                    </p>

                    <p className="text-sm text-black font-normal">
                        {t("emailCustomer")}: qusaideveloper2004@gmail.com
                    </p>

                    <p className="text-sm text-black font-normal">
                        {t("emailSupport")}: support@exclusive.com
                    </p>

                </div>

            </div>


            <div className="lg:col-span-8 bg-white rounded shadow-sm border border-gray-100 p-8 sm:p-10">

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        <div className="flex flex-col gap-1">

                            <Input
                                {...register("name")}

                                placeholder={t("inputName")}
                                className="bg-[#F5F5F5] border-none h-12 text-sm placeholder:text-gray-400 focus:bg-white"
                            />
                            {errors.name && (
                                <span className="text-xs text-red-500 font-medium px-1">
                                    {errors.name.message}
                                </span>
                            )}

                        </div>

                        <div className="flex flex-col gap-1">

                            <Input
                                {...register("email")}

                                type="email"
                                placeholder={t("inputEmail")}
                                className="bg-[#F5F5F5] border-none h-12 text-sm placeholder:text-gray-400 focus:bg-white"
                            />
                            {errors.email && (
                                <span className="text-xs text-red-500 font-medium px-1">
                                    {errors.email.message}
                                </span>
                            )}

                        </div>

                        <div className="flex flex-col gap-1">

                            <Input
                                {...register("phone")}

                                type="tel"
                                placeholder={t("inputPhone")}
                                className="bg-[#F5F5F5] border-none h-12 text-sm placeholder:text-gray-400 focus:bg-white"
                            />
                            {errors.phone && (
                                <span className="text-xs text-red-500 font-medium px-1">
                                    {errors.phone.message}
                                </span>
                            )}

                        </div>

                    </div>

                    <div className="flex flex-col gap-1">

                                <textarea
                                    {...register("message")}

                                    rows={7}
                                    placeholder={t("inputMessage")}
                                    className="w-full bg-[#F5F5F5] border-none rounded p-4 text-sm outline-none resize-none placeholder:text-gray-400 focus:ring-1 focus:ring-black focus:bg-white transition-all"
                                />
                                {errors.message && (
                                    <span className="text-xs text-red-500 font-medium px-1">
                                        {errors.message.message}
                                    </span>
                                )}

                    </div>

                    <div className="flex justify-end">

                        <Button
                            disabled={isSubmitting}

                            type="submit"
                            variant="primary"
                            size="md"
                            className="!bg-[var(--brand)] !text-white font-medium px-12 py-4 h-14 rounded text-base cursor-pointer hover:bg-[#d23f3f] transition-colors w-full sm:w-auto"
                        >
                            {t("sendButton")}
                        </Button>

                    </div>

                </form>

            </div>

        </div>

    </div>

</main>
);
}

