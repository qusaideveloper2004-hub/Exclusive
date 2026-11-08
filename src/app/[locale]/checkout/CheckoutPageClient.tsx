
"use client";

import { Link } from "@/i18n/routing";

import { useCheckout } from "@/hooks/checkout/useCheckout";

import CheckoutProgress from "@/components/checkout/CheckoutProgress";
import BillingDetailsForm from "@/components/checkout/BillingDetailsForm";
import ShippingInformation from "@/components/checkout/ShippingInformation";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import CouponForm from "@/components/checkout/CouponForm";
import CheckoutActions from "@/components/checkout/CheckoutActions";
import OrderConfirmation from "@/components/checkout/OrderConfirmation";


export default function CheckoutClient() {

const {

t,

step,

couponStatus,

items,
appliedCoupon,

register,
handleSubmit,
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

    
formValues,  } = useCheckout();



if (step === 3) {
    return <OrderConfirmation />;
}


    return (

        <main className="page-container max-w-[1170px] py-10 md:py-12">

            <nav className="mb-10 flex items-center gap-2 text-xs text-gray-500 sm:text-sm">

                <Link href="/cart" className="transition-colors hover:text-black">
                    {t("breadcrumbCart")}
                </Link>

                <span>/</span>

                <span className="font-medium text-black">
                    {t("breadcrumbCheckout")}
                </span>

            </nav>


            <CheckoutProgress step={step} />


            <form noValidate onSubmit={handleSubmit(onSubmit)}>

                <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">



                    <section className="lg:col-span-6">

                        {step === 1 ? (

                            <BillingDetailsForm
                                register={register}
                                errors={errors}
                            />

                        ) : (

                            <ShippingInformation
                                formValues={formValues}
                                onEdit={handleEditShipping}
                            />

                        )}

                    </section>



                    <section className="lg:col-span-6 lg:pt-1">

                        <OrderSummary
                            step={step}
                            items={items}
                            appliedCoupon={appliedCoupon}
                            subtotal={subtotal}
                            shipping={shipping}
                            discount={discount}
                            total={total}
                            formatPrice={formatPrice}
                        />


                        <PaymentMethod register={register} />


                        <CouponForm
                            register={register}
                            couponStatus={couponStatus}
                            onApplyCoupon={handleApplyCoupon}
                        />


                        <CheckoutActions
                            step={step}
                            onNextStep={handleNextStep}
                            onBackStep={handleBackStep}
                        />

                    </section>


                </div>

            </form>

        </main>

    );

}


