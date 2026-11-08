"use client";

import { Product } from "@/types/product";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";


import { useProductDetails } from "@/hooks/products/useProductDetails";

import { ProductGallery } from "@/components/products/details/ProductGallery";
import { ProductInfo } from "@/components/products/details/ProductInfo";
import { ProductOptions } from "@/components/products/details/ProductOptions";
import { ProductActions } from "@/components/products/details/ProductActions";
import { ProductDeliveryInfo } from "@/components/products/details/ProductDeliveryInfo";
import { RelatedProducts } from "@/components/products/details/RelatedProducts";
import { ProductDetailsError } from "@/components/products/details/ProductDetailsError";


interface ProductDetailsClientProps {
    product: Product | null;
    relatedProducts: Product[];
}


export default function ProductDetailsClient({
    product,
    relatedProducts
}: ProductDetailsClientProps) {

const t = useTranslations("ProductDetails");

const {
    selectedImage,
    setSelectedImage,

    selectedImageIndex,
    setSelectedImageIndex,

    selectedColor,
    setSelectedColor,

    selectedSize,
    setSelectedSize,

    quantity,

    handleIncreaseQuantity,
    handleDecreaseQuantity,

    handleAddToCart,
    handleToggleWishlist,
    isInWishlist
    
} = useProductDetails(product);


if (!product) {
    return <ProductDetailsError />;
}


const galleryImages = [product.image, product.image, product.image, product.image];


return (

<main className="py-8 sm:py-10">

    <div className="page-container max-w-[1170px] flex flex-col gap-8 sm:gap-10">


        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-500">

            <Link href="/" className="hover:text-black transition-colors">
                {t("breadcrumbAccount")}
            </Link>

            <span>/</span>

            <Link href={`/category/${product.category}`} className="hover:text-black transition-colors capitalize">
                {product.category}
            </Link>

            <span>/</span>

            <span className="text-black font-medium truncate max-w-[200px] sm:max-w-none">
                {product.title}
            </span>

        </nav>


        <div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[112px_minmax(0,1.15fr)_minmax(320px,0.9fr)] lg:gap-8 xl:gap-10">

            <ProductGallery
                title={product.title}
                images={galleryImages}
                selectedImage={selectedImage}
                selectedImageIndex={selectedImageIndex}
                onSelectImage={(image, index) => {
                    setSelectedImage(image);
                    setSelectedImageIndex(index);
                }}
            />


            <div className="order-3 flex min-w-0 flex-col gap-4 sm:gap-5 lg:gap-6">

                <ProductInfo product={product} />


                <ProductOptions
                    colors={product.colors}
                    selectedColor={selectedColor}
                    selectedSize={selectedSize}
                    onColorChange={setSelectedColor}
                    onSizeChange={setSelectedSize}
                />


                <ProductActions
                    product={product}
                    quantity={quantity}
                    isInWishlist={isInWishlist}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                />


                <ProductDeliveryInfo />

            </div>

        </div>


        <RelatedProducts products={relatedProducts} />

    </div>

</main>

);


}





