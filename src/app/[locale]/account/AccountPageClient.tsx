"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccountSchema } from "@/lib/schemas/authSchema";
import type { AccountFormData } from "@/lib/schemas/authSchema";

import { Link } from "@/i18n/routing";
import { useRouter } from "@/i18n/routing";

import { useAuthStore } from "@/store/useAuthStore";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function AccountPage() {

const t = useTranslations("Auth");
const accountT = useTranslations("AccountPage");

const router = useRouter();

const { user, isAuthenticated, updateUser } = useAuthStore();

const accountSchema = createAccountSchema({
    requiredField: t("validation.required"),
    invalidEmail: t("validation.invalidEmail"),
    passwordMatch: t("validation.passwordMatch"),
});


const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
} = useForm<AccountFormData>({ resolver: zodResolver(accountSchema),
    defaultValues: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        address: user?.address || "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    },
});



useEffect(() => {
    if (!isAuthenticated) {
        router.push("/login");
    }
}, [isAuthenticated, router]);

// تحديث القيم في الـ Form عند تحميل بيانات المستخدم
// ودا يضمنلي ان البيانات لما توصل الفورم تتحدث بيها مهمه جدا و كل دا بفضل الريسيت 
// و كمان عشان ميجيش مسجل جديد ف نفس مسجل تاني و يلاقي بياناته ظاهره بايديفولت 
// الريسيت بيحذف القيم او بشكل اصح بيرجعها للديفولت  عشان كدا استخدمته ف زرار الكانسيل 
// اهم خطوه للمرحله التانيه 
useEffect(() => {
    if (user) {
        reset({
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            address: user.address || "",
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        });
    }
}, [user, reset]);


const onSubmit: SubmitHandler<AccountFormData> = (data) => {
    updateUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.address,
    });

    alert(accountT("profileUpdated"));
};

// لاحظت الصفحه بتتعرض قبل ما يحصل ريرندر و يوجهني لتسجيل الدخول ف وقفت الصفحه تماما 
if (!isAuthenticated) return null;

const welcomeName = user?.firstName || user?.name || user?.username || "User";

return (

<main className="mx-auto w-[82%] max-w-[1170px] py-8 pb-16 md:py-10 md:pb-20">

    <div className="mb-10 flex flex-wrap items-center justify-between gap-4 text-xs">

        <div className="flex items-center gap-2 text-gray-500">
            <Link href="/" className="hover:text-black">
                {accountT("home")}
            </Link>
            <span>/</span>
            <span className="font-medium text-black">{accountT("myAccount")}</span>
        </div>

        <div className="text-sm font-normal text-black">
            {accountT("welcome", { name: "" })}
            <span className="font-medium text-[#DB4444]">{welcomeName}</span>
        </div>

    </div>



    <div className="grid grid-cols-1 gap-8 md:grid-cols-12">

        <aside className="md:col-span-3">

            <div className="space-y-5 text-xs">

                <div>
                    <h3 className="mb-2 font-medium text-black">{accountT("manageAccount")}</h3>
                    <ul className="space-y-1.5 ps-4 text-gray-500">
                        <li>
                            <Link href="/account" className="font-medium text-[#DB4444]">
                                {accountT("myProfile")}
                            </Link>
                        </li>
                        <li>
                            <button type="button" className="hover:text-black">
                                {accountT("addressBook")}
                            </button>
                        </li>
                        <li>
                            <button type="button" className="hover:text-black">
                                {accountT("paymentOptions")}
                            </button>
                        </li>
                    </ul>
                </div>

                <div>

                    <h3 className="mb-2 font-medium text-black">{accountT("myOrders")}</h3>

                    <ul className="space-y-1.5 ps-4 text-gray-500">
                        <li>
                            <button type="button" className="hover:text-black">
                                {accountT("myReturns")}
                            </button>
                        </li>
                        <li>
                            <button type="button" className="hover:text-black">
                                {accountT("myCancellations")}
                            </button>
                        </li>
                    </ul>
                    
                </div>

                <div>
                    <h3 className="font-medium text-black">
                        <button type="button" className="hover:text-black">
                            {accountT("myWishlist")}
                        </button>
                    </h3>
                </div>

            </div>

        </aside>



        <section className="rounded-sm border border-gray-100 bg-white px-6 py-5 shadow-[0_1px_12px_rgba(0,0,0,0.04)] md:col-span-9 md:px-10 md:py-4">

            <h2 className="mb-3 text-sm font-medium text-[#DB4444]">
                {accountT("editProfile")}
            </h2>

            <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-2">

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <div>
                        <label className="mb-1 block text-xs leading-4 text-black">{accountT("firstName")}</label>
                        <Input
                            type="text"
                            placeholder={accountT("firstNamePlaceholder")}

                            {...register("firstName")}
                            error={errors.firstName?.message}

                            className="h-7 rounded-none border-none bg-[#F5F5F5] px-3 text-xs"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs leading-4 text-black">{accountT("lastName")}</label>
                        <Input
                            type="text"
                            placeholder={accountT("lastNamePlaceholder")}

                            {...register("lastName")}
                            error={errors.lastName?.message}

                            className="h-7 rounded-none border-none bg-[#F5F5F5] px-3 text-xs"
                        />
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <div>
                        <label className="mb-1 block text-xs leading-4 text-black">{accountT("email")}</label>
                        <Input
                            type="email"
                            placeholder={accountT("emailPlaceholder")}

                            {...register("email")}
                            error={errors.email?.message}

                            className="h-7 rounded-none border-none bg-[#F5F5F5] px-3 text-xs"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-xs leading-4 text-black">{accountT("address")}</label>
                        <Input
                            type="text"
                            placeholder={accountT("addressPlaceholder")}

                            {...register("address")}
                            error={errors.address?.message}

                            className="h-7 rounded-none border-none bg-[#F5F5F5] px-3 text-xs"
                        />
                    </div>

                </div>

                <div className="space-y-1 pt-1">

                    <label className="block text-xs font-medium leading-4 text-black">
                        {accountT("passwordChanges")}
                    </label>

                    <Input
                        type="password"

                        placeholder={accountT("currentPassword")}
                        {...register("currentPassword")}

                        className="h-7 rounded-none border-none bg-[#F5F5F5] px-3 text-xs"
                    />

                    <Input
                        type="password"

                        placeholder={accountT("newPassword")}
                        {...register("newPassword")}

                        className="h-7 rounded-none border-none bg-[#F5F5F5] px-3 text-xs"
                    />

                    <Input
                        type="password"
                        placeholder={accountT("confirmNewPassword")}

                        {...register("confirmNewPassword")}
                        error={errors.confirmNewPassword?.message}

                        className="h-7 rounded-none border-none bg-[#F5F5F5] px-3 text-xs"
                    />

                </div>

                <div className="flex items-center justify-end gap-5 pt-1">

                    <button
                        type="button"
                        onClick={() => reset()}

                        className="text-xs text-black hover:underline"
                    >
                        {accountT("cancel")}
                    </button>

                    <Button
                        type="submit"
                        variant="primary"
                        size="md"
                        disabled={isSubmitting}
                        className="h-7 rounded-sm bg-[#DB4444] px-5 py-0 text-xs hover:bg-[#c33b3b]"
                    >
                        {accountT("saveChanges")}
                    </Button>

                </div>

            </form>

        </section>

    </div>

</main>

);
}



