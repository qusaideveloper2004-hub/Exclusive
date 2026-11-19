import Image from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";


interface ProductGalleryProps {
    title: string;
    images: string[];
    selectedImage: string;
    selectedImageIndex: number;
    onSelectImage: (image: string, index: number) => void;
}


export function ProductGallery({ title, images, selectedImage, selectedImageIndex, onSelectImage }: ProductGalleryProps) {

const [failedImages, setFailedImages] = useState<Set<string>>(() => new Set());

const markImageFailed = (image: string) => {
    setFailedImages((current) => new Set(current).add(image));
};

return (

<div className="grid min-w-0 grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[112px_minmax(0,1fr)] lg:gap-8 xl:gap-10">

    <div className="hide-scrollbar order-2 flex w-full gap-3 overflow-x-auto pb-1 lg:order-1 lg:w-auto lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">

        {images.map((imgSrc, idx) => (

            <button
            
                key={idx}
                type="button"

                onClick={() => onSelectImage(imgSrc, idx)}

                className={`relative h-[68px] w-[76px] shrink-0 cursor-pointer rounded border bg-[#F5F5F5] p-2 transition-all sm:h-[74px] sm:w-[88px] lg:h-[130px] lg:w-full ${
                    selectedImageIndex === idx
                        ? "border-black"
                        : "border-transparent hover:border-gray-300"
                }`}
            >

                {failedImages.has(imgSrc) || !imgSrc ? (
                    <span className="absolute inset-0 flex items-center justify-center text-gray-400" aria-hidden="true">
                        <ImageOff className="h-5 w-5" />
                    </span>
                ) : (
                    <Image
                        src={imgSrc}
                        alt={`${title} ${idx + 1}`}
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 112px, 88px"
                        onError={() => markImageFailed(imgSrc)}
                        className="object-contain p-2"
                    />
                )}

            </button>

        ))}

    </div>


    <div className="order-1 relative flex h-[320px] w-full items-center justify-center rounded bg-[#F5F5F5] p-5 sm:h-[440px] sm:p-8 lg:order-2 lg:h-[520px] xl:h-[562px]">

        {failedImages.has(selectedImage) || !selectedImage ? (
            <div role="img" aria-label={title} className="absolute inset-0 flex items-center justify-center text-gray-400">
                <ImageOff className="h-14 w-14" aria-hidden="true" />
            </div>
        ) : (
            <Image
                src={selectedImage}
                alt={title}
                fill
                unoptimized
                sizes="(max-width: 639px) calc(100vw - 2rem), (max-width: 1023px) calc(100vw - 3rem), 650px"
                priority
                onError={() => markImageFailed(selectedImage)}
                className="object-contain p-6"
            />
        )}

    </div>

</div>

);
}
