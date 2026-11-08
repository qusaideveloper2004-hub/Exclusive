"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ShoppingBag } from "lucide-react";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {

const t = useTranslations("CartPage");

const [couponCode, setCouponCode] = useState("");
const [couponStatus, setCouponStatus] = useState<"success" | "error" | null>(null);

const items = useCartStore((state) => state.items);
const removeFromCart = useCartStore((state) => state.removeFromCart);
const updateQuantity = useCartStore((state) => state.updateQuantity);
const getTotalPrice = useCartStore((state) => state.getTotalPrice);
const appliedCoupon = useCartStore((state) => state.appliedCoupon);
const applyCoupon = useCartStore((state) => state.applyCoupon);

const subtotal = getTotalPrice();

const shipping = 0; 
const discount = appliedCoupon ? subtotal * 0.1 : 0;
const total = subtotal - discount + shipping;

const handleApplyCoupon = () => {
    const isValid = applyCoupon(couponCode);
    setCouponStatus(isValid ? "success" : "error");
};



if (items.length === 0) {

return (

    <main className="py-20">

        <div className="page-container max-w-[1170px] flex flex-col items-center justify-center gap-6 text-center">

            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">

                <ShoppingBag className="w-10 h-10" />

            </div>

            <h1 className="text-2xl font-bold text-black">
                {t("emptyTitle")}
            </h1>

            <p className="text-gray-500 max-w-md">
                {t("emptySubtitle")}
            </p>

            <Link href="/">

                <Button variant="primary" size="md" className="!bg-[var(--brand)] !text-white px-8 py-3">
                    {t("returnToShop")}
                </Button>

            </Link>

        </div>

    </main>

);

}


return (

    <main className="py-10">

            <div className="page-container max-w-[1170px] flex flex-col gap-10">

                <nav className="flex items-center gap-2 text-sm text-gray-500">

                    <Link href="/" className="hover:text-black transition-colors">
                        {t("breadcrumbHome")}
                    </Link>

                    <span>/</span>

                    <span className="text-black font-medium">
                        {t("breadcrumbCart")}
                    </span>

                </nav>



                <div className="flex flex-col gap-6">


                    <div className="hidden md:grid grid-cols-12 gap-4 bg-white p-6 rounded shadow-sm border border-gray-100 text-base font-normal text-black">

                        <div className="col-span-5">{t("colProduct")}</div>

                        <div className="col-span-2 text-center">{t("colPrice")}</div>

                        <div className="col-span-2 text-center">{t("colQuantity")}</div>

                        <div className="col-span-3 text-right">{t("colSubtotal")}</div>

                    </div>


                    {items.map((item) => {

                        const itemSubtotal = item.product.price * item.quantity;

                        return (

                            <div
                                key={`  ${item.product.id} -   ${item.selectedColor || ""} -   ${item.selectedSize || ""}`}
                                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-white p-6 rounded shadow-sm border border-gray-100 relative group"
                            >

                                <div className="col-span-1 md:col-span-5 flex items-center gap-4">

                                    <div className="relative w-14 h-14 bg-[#F5F5F5] rounded shrink-0 flex items-center justify-center p-2">

                                        <button
                                            onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}

                                            className="absolute -top-2 -left-2 w-5 h-5 bg-[var(--brand)] text-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform z-10"
                                        >

                                            <X className="w-3 h-3 stroke-[3]" />

                                        </button>

                                        <Image
                                            src={item.product.image}
                                            alt={item.product.title}

                                            fill
                                            unoptimized
                                            className="object-contain p-1"
                                        />

                                    </div>

                                    <div className="flex flex-col gap-1">

                                        <Link
                                            href={`/product/${item.product.id}`}
                                            className="text-base font-normal text-black hover:text-[var(--brand)] transition-colors line-clamp-1"
                                        >

                                            {item.product.title}

                                        </Link>

                                        {(item.selectedColor || item.selectedSize) && (

                                            <div className="flex items-center gap-3 text-xs text-gray-500">

                                                {item.selectedColor && (
                                                    <span>{t("color")}: {item.selectedColor}</span>
                                                )}

                                                {item.selectedSize && (
                                                    <span>{t("size")}: {item.selectedSize}</span>
                                                )}

                                            </div>

                                        )}

                                    </div>

                                </div>


                                <div className="col-span-1 md:col-span-2 md:text-center text-base font-normal text-black flex md:block items-center justify-between">

                                    <span className="md:hidden text-gray-500 text-sm">{t("colPrice")}:</span>

                                    ${item.product.price.toFixed(2)}

                                </div>


                                <div className="col-span-1 md:col-span-2 flex items-center md:justify-center justify-between">

                                    <span className="md:hidden text-gray-500 text-sm">{t("colQuantity")}:</span>
                                
                                    <div className="w-16 h-11 border border-gray-300 rounded flex items-center justify-center px-2">
                                
                                        <input
                                            type="number"
                                            min="1"

                                            value={item.quantity < 10 ? `0${item.quantity}` : item.quantity}

                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10);
                                
                                                if (!isNaN(val) && val > 0) {
                                
                                                    updateQuantity(item.product.id, val, item.selectedColor, item.selectedSize);
                                
                                                }
                                
                                            }}
                                            className="w-full text-center text-base font-normal text-black outline-none bg-transparent"
                                        />
                                
                                    </div>

                                </div>



                                <div className="col-span-1 md:col-span-3 md:text-right text-base font-normal text-black flex md:block items-center justify-between">

                                    <span className="md:hidden text-gray-500 text-sm">{t("colSubtotal")}:</span>

                                    ${itemSubtotal.toFixed(2)}

                                </div>

                            </div>

                        );

                    })}

                </div>




                <div className="flex items-center justify-between gap-4 flex-wrap">

                    <Link href="/">

                        <Button
                            variant="outline"
                            size="md"
                            className="border-gray-400 text-black font-medium px-8 py-4 rounded hover:bg-black hover:text-white transition-colors"
                        >
                            {t("returnToShop")}
                        </Button>

                    </Link>

                    <Button
                        variant="outline"
                        size="md"

                        onClick={() => window.location.reload()}
                        className="border-gray-400 text-black font-medium px-8 py-4 rounded hover:bg-black hover:text-white transition-colors"
                    >
                        {t("updateCart")}
                    </Button>

                </div>




                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">

                    <div className="lg:col-span-6 flex flex-wrap items-center gap-4">

                        <div className="w-full sm:w-72">

                            <Input
                                value={couponCode}
                                onChange={(event) => setCouponCode(event.target.value)}
                                placeholder={t("couponPlaceholder")}
                                    className="h-14 border-black text-sm"
                            />

                        </div>

                        <Button
                            variant="primary"
                            size="md"
                            className="!bg-[var(--brand)] !text-white font-medium px-9 py-4 h-14 rounded shrink-0"
                            onClick={handleApplyCoupon}
                        >
                            {t("applyCoupon")}
                        </Button>

                        {couponStatus && (
                            <p role="status" className={`w-full text-xs ${couponStatus === "success" ? "text-green-700" : "text-red-600"}`}>
                                {t(couponStatus === "success" ? "couponApplied" : "couponInvalid")}
                            </p>
                        )}

                    </div>




                    <div className="lg:col-span-6 border-2 border-black rounded p-6 sm:p-8 flex flex-col gap-6">

                        <h3 className="text-xl font-medium text-black">
                            {t("cartTotalTitle")}
                        </h3>

                        <div className="flex flex-col gap-4 text-base text-black">

                            <div className="flex items-center justify-between border-b border-gray-300 pb-4">

                                <span>{t("subtotal")}:</span>

                                <span>${subtotal.toFixed(2)}</span>

                            </div>

                            {appliedCoupon && (
                                <div className="flex items-center justify-between border-b border-gray-300 pb-4 text-green-700">
                                    <span>{t("discount")}:</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="flex items-center justify-between border-b border-gray-300 pb-4">

                                <span>{t("shipping")}:</span>

                                <span>{t("free")}</span>

                            </div>

                            <div className="flex items-center justify-between font-normal text-lg">

                                <span>{t("total")}:</span>

                                <span>${total.toFixed(2)}</span>

                            </div>

                        </div>


                        <div className="flex justify-center pt-2">

                            <Link href="/checkout" className="w-full sm:w-auto">

                                <Button
                                    variant="primary"
                                    size="md"
                                    className="!bg-[var(--brand)] !text-white font-medium px-12 py-4 h-14 rounded w-full"
                                >
                                    {t("proceedToCheckout")}
                                </Button>

                            </Link>

                        </div>

                    </div>

                </div>

            </div>

    </main>

);

}



