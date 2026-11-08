"use client";

import { useEffect, useState } from "react";

import { Search, Heart, ShoppingCart } from "lucide-react";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";

import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";




import { useAuthStore } from "@/store/useAuthStore";
import HeaderAccountDropdown from "./HeaderAccountDropdown";


export const Header = () => {

const t = useTranslations("Header");
const pathname = usePathname();
const router = useRouter();

const [searchQuery, setSearchQuery] = useState("");
const [hasMounted, setHasMounted] = useState(false);

useEffect(() => {

  setHasMounted(true);
}, []);

const cartCount = useCartStore((state) => state.getTotalItems());
const wishlistCount = useWishlistStore((state) => state.items.length);

const navLinks = [
  
  { label: t("home"), href: "/" },
  { label: t("contact"), href: "/contact" },
  { label: t("about"), href: "/about" },
  { label: t("signup"), href: "/signup" },
];

const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const query = searchQuery.trim();

    if (!query) return;

    router.push(`/category/all?search=${encodeURIComponent(query)}`);
  };





const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

return (

<header className="relative z-40 w-full border-b border-[#e5e5e5] bg-white">

  <div className="page-container">

    <div className="flex min-h-[86px] flex-wrap items-center justify-between gap-x-6 gap-y-3 py-3 lg:h-[86px] lg:flex-nowrap lg:py-0">


      <Link href="/" className="order-1 shrink-0 text-[24px] font-bold leading-none tracking-[-0.5px] text-black" >
          Exclusive
      </Link>


      <nav className="order-2 hidden items-center gap-[46px] lg:flex">

        {navLinks.map((link) => { const isActive = pathname === link.href;

          return (
              <Link
                key={link.href}
                href={link.href}

                className={`whitespace-nowrap text-[15px] leading-none text-black transition-colors hover:text-gray-500 ${
                isActive? "underline underline-offset-[5px] decoration-[1px]" : "" }`}
                >
                  {link.label}
              </Link>
            );
          })}

      </nav>


      <div className="order-2 flex shrink-0 items-center gap-[26px] lg:order-4">
        <Link href="/wishlist" aria-label={t("wishlist")} className="relative flex shrink-0 items-center justify-center text-black" >

          <Heart size={23} strokeWidth={1.6} />

          {hasMounted && wishlistCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[var(--brand)] px-1 text-[10px] text-white rtl:-right-auto rtl:-left-2">
              {wishlistCount}
            </span>
          )}

        </Link>


        <Link href="/cart" aria-label={t("cart")}  className="relative flex shrink-0 items-center justify-center text-black">

          <ShoppingCart size={25} strokeWidth={1.5} />
        
            {hasMounted && cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[var(--brand)] px-1 text-[10px] text-white rtl:-right-auto rtl:-left-2">
                {cartCount}
              </span>
            )}

        </Link>



        {hasMounted && isAuthenticated ? (

            <HeaderAccountDropdown />

            ) : (
              <Link href="/signup" className="text-sm font-medium hover:underline; textColor=text-red-500  hoverTextColor=text-[#DB4444]">
                {t("signup")}
              </Link>
            )}

      </div>

      <form onSubmit={handleSearchSubmit} className="relative order-3 h-10 w-full lg:h-[35px] lg:w-[224px]">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="h-full w-full rounded-[4px] border-0 bg-[#f5f5f5] py-2 pl-[13px] pr-[42px] text-[12px] text-black outline-none placeholder:text-[#777] focus:ring-1 focus:ring-gray-300 rtl:pl-[42px] rtl:pr-[13px]"
        />
        <button
          type="submit"
          aria-label={t("searchAction")}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-black rtl:right-auto rtl:left-2"
        >
          <Search size={19} strokeWidth={1.8} />
        </button>
      </form>

    </div>

  </div>

</header>

);
};



