"use client";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

import { User,  ShoppingBag, XCircle, Star,  LogOut  } from "lucide-react";

import { useAuthStore } from "@/store/useAuthStore";

export default function HeaderAccountDropdown() {

const t = useTranslations("Auth");

const router = useRouter();

const logout = useAuthStore((state) => state.logout);
const [isOpen, setIsOpen] = useState(false);




const dropdownRef = useRef<HTMLDivElement>(null);

useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {

        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                
            setIsOpen(false);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

}, []);



const handleLogout = () => {

    logout();
    setIsOpen(false);
    router.push("/login");
};


return (

    <div className="relative" ref={dropdownRef}>

        <button
            onClick={() => setIsOpen(!isOpen)}
            
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#DB4444] text-white transition-opacity hover:opacity-90"

            aria-label={t("accountMenu")}
            aria-expanded={isOpen}
            
            aria-haspopup="menu"
            aria-controls="account-menu"
            >
                <User className="h-5 w-5" />
        </button>


            {isOpen && (

            <div
                id="account-menu"
                role="menu"
                className="absolute end-0 top-10 z-50 w-[240px] rounded-sm bg-gradient-to-br from-[#aaa7ad]/95 via-[#716d75]/95 to-[#251c2a]/95 p-2 text-white shadow-xl backdrop-blur-md"
            >

                <ul className="space-y-0.5 text-[15px]">

                    <li>
                        <Link
                            href="/account"
                            onClick={() => setIsOpen(false)}

                            role="menuitem"
                            className="flex min-h-10 items-center gap-3 rounded-sm px-3 py-2 whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                        >

                            <User className="h-6 w-6 shrink-0" />
                            <span>{t("manageAccount")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/account"
                            onClick={() => setIsOpen(false)}

                            role="menuitem"
                            className="flex min-h-10 items-center gap-3 rounded-sm px-3 py-2 whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                        >

                            <ShoppingBag className="h-6 w-6 shrink-0" />
                            <span>{t("myOrders")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/account"
                            onClick={() => setIsOpen(false)}

                            role="menuitem"
                            className="flex min-h-10 items-center gap-3 rounded-sm px-3 py-2 whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                        >
                            <XCircle className="h-6 w-6 shrink-0" />
                            <span>{t("myCancellations")}</span>
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/account"
                            onClick={() => setIsOpen(false)}

                            role="menuitem"
                            className="flex min-h-10 items-center gap-3 rounded-sm px-3 py-2 whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                        >
                            <Star className="h-6 w-6 shrink-0" />
                            <span>{t("myReviews")}</span>
                        </Link>
                    </li>

                    <li>
                        <button
                            onClick={handleLogout}
                            
                            role="menuitem"
                            className="flex min-h-10 w-full items-center gap-3 rounded-sm px-3 py-2 text-start whitespace-nowrap transition-colors hover:bg-white/10 focus-visible:bg-white/10"
                        >
                            <LogOut className="h-6 w-6 shrink-0" />
                            <span>{t("logout")}</span>
                        </button>
                    </li>
                    
                </ul>

            </div>

            )}

    </div>

);
}


