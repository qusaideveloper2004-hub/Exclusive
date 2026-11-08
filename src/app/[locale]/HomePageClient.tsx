// TODO: ارجع للملف ده و اعمل شروط عشان لو المنتجات فشلت يقدر يبعت ريكويست تاني و يعرض باقي الصفحه ع ما يحمل 


"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

import { HeroSection } from "@/components/home/HeroSection";
import { FlashSalesSection } from "@/components/home/FlashSalesSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { BestSellingSection } from "@/components/home/BestSellingSection";
import { PromoBannerSection } from "@/components/home/PromoBannerSection";
import { ExploreProductsSection } from "@/components/home/ExploreProductsSection";
import { ServicesFeatureSection } from "@/components/home/ServicesFeatureSection";

import { Button } from "@/components/ui/Button";
import { productService } from "@/services/productService";
import { Product } from "@/types/product";

type ProductLoadStatus = "loading" | "success" | "error";

export default function HomePage() {

const locale = useLocale();

const [allProducts, setAllProducts] = useState<Product[]>([]);

const [status, setStatus] = useState<ProductLoadStatus>("loading");

const [requestKey, setRequestKey] = useState(0);

useEffect(() => {

    let isActive = true;

    productService.getAllProducts() .then((products) => {

        if (!isActive) return;
        setAllProducts(products);

        setStatus("success");

      }).catch((error: unknown) => {

        console.error("Unable to load products from FakeStoreAPI:", error);

        if (isActive) setStatus("error");

      });

    return () => {

      isActive = false;
  };

}, [requestKey]);




return (

<div>

  <HeroSection />

      {status === "loading" && (

        <p className="page-container py-10 text-sm text-gray-600" role="status">

          {locale === "ar" ? "جارٍ تحميل المنتجات..." : "Loading products..."}

        </p>

      )}


      {status === "error" && (

        <div className="page-container flex flex-col items-start gap-4 py-10" role="alert" >

          <p className="text-sm text-red-600">

            {locale === "ar"
              ? "تعذر تحميل المنتجات من المتجر. تحقق من اتصال الإنترنت ثم أعد المحاولة."
              : "Products could not be loaded. Check your internet connection and try again."}

          </p>

          <Button 
            type="button"
            size="sm"

            onClick={() => {

              setStatus("loading");

              setRequestKey((key) => key + 1);
            }}
          >

            {locale === "ar" ? "إعادة المحاولة" : "Retry"}

          </Button>

        </div>

      )}

      {status !== "success" && (
        <>
          <PromoBannerSection />
          <ServicesFeatureSection />
        </>
      )}


      {status === "success" && (

        <>

          <FlashSalesSection products={allProducts} />

          <CategoriesSection />

          <BestSellingSection products={allProducts} />

          <PromoBannerSection />

          <ExploreProductsSection products={allProducts} />

          <ServicesFeatureSection />

        </>

      )}

</div>

  );

}


