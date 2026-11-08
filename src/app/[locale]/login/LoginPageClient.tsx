"use client";

import { useState } from "react";

import Image from "next/image";

import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { createLoginSchema } from "@/lib/schemas/authSchema";
import type { LoginFormData } from "@/lib/schemas/authSchema";

import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {

const t = useTranslations("Auth");

const router = useRouter();

const loginStore = useAuthStore((state) => state.login);

const [errorMessage, setErrorMessage] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);

const loginSchema = createLoginSchema({ requiredField: t("validation.required"), });

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
        emailOrPhone: "",
        password: "",
    },
});

const onSubmit: SubmitHandler<LoginFormData> = async (data) => {

    try {
        setIsLoading(true);
        setErrorMessage(null);

        const res = await authService.login({
            username: data.emailOrPhone,
            password: data.password,
        });

        loginStore(res.token, {
            email: data.emailOrPhone.includes("@") ? data.emailOrPhone : "user@example.com",
            username: data.emailOrPhone,
            firstName: "John",
            lastName: "Doe",
        });

        router.push("/");

    } catch (err: unknown) {
        setErrorMessage(err instanceof Error ? err.message : t("loginFailed"));
        
    } finally {
        setIsLoading(false);
    }
};



return (
    
<main className="w-full py-10 md:pb-20 md:pt-0">

    <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[56%_44%] md:gap-0">

        <div className="relative aspect-[1.03/1] w-full overflow-hidden bg-[#CBE4E8]">
            <Image
                src="/images/auth/auth-login.jpg"
                alt="A shopping cart, phone, and shopping bags"
                fill
                priority
                className="object-cover"
            />
        </div>

        <div className="px-6 md:pl-[clamp(2rem,9vw,8rem)] md:pr-[max(2rem,calc((100vw-1170px)/2))]">

            <div className="mx-auto w-full max-w-[370px] md:mx-0">

                <h1 className="mb-3 text-2xl font-medium text-black sm:text-3xl">
                    {t("loginTitle")}
                </h1>
                
                <p className="mb-8 text-sm text-black">
                    {t("loginSubtitle")}
                </p>

                {errorMessage && (
                    <div className="mb-4 rounded bg-red-50 p-3 text-xs text-red-600">
                        {errorMessage}
                    </div>
                )}

                <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                    <div>
                        <Input
                            type="text"
                            placeholder={t("emailOrPhonePlaceholder")}

                            {...register("emailOrPhone")}
                            error={errors.emailOrPhone?.message}
                            
                            className="h-11 border-b border-black/50 border-t-0 border-x-0 bg-transparent px-0 rounded-none focus:border-black"
                        />
                    </div>
    
                    <div>
                        <Input
                            type="password"
                            placeholder={t("passwordPlaceholder")}

                            {...register("password")}
                            error={errors.password?.message}

                            className="h-11 border-b border-black/50 border-t-0 border-x-0 bg-transparent px-0 rounded-none focus:border-black"
                        />
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            disabled={isLoading}
                            className="h-[38px] min-w-[77px] px-6 py-0 text-xs"
                        >
                            {isLoading ? t("loggingIn") : t("logIn")}
                        </Button>

                        <button
                            type="button"

                            onClick={() => alert(" الصفحه دي مش مطلوبه مني ولا في متطلبات التاسك ولا صفحات ال التصميمم في فيجما ")}

                            className="text-sm font-medium text-[#DB4444] transition-colors hover:underline"
                        >
                            {t("forgotPassword")}
                        </button>
                    </div>

                </form>
            </div>

        </div>

    </div>
</main>
);
}



