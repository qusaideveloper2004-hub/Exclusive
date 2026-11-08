import Image from "next/image";


interface ProductGalleryProps {
    title: string;
    images: string[];
    selectedImage: string;
    selectedImageIndex: number;
    onSelectImage: (image: string, index: number) => void;
}


export function ProductGallery({ title, images, selectedImage, selectedImageIndex, onSelectImage }: ProductGalleryProps) {


return (

<div className="grid grid-cols-1 items-start gap-5 sm:gap-6 lg:grid-cols-[112px_minmax(0,1.15fr)] lg:gap-8 xl:gap-10">

    <div className="order-2 flex w-full gap-3 overflow-x-auto pb-1 lg:order-1 lg:w-auto lg:flex-col lg:gap-3 lg:overflow-visible lg:pb-0">

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

                <Image
                    src={imgSrc}
                    alt={`${title} ${idx + 1}`}

                    fill
                    unoptimized
                    className="object-contain p-2"
                />

            </button>

        ))}

    </div>


    <div className="order-1 relative flex h-[320px] w-full items-center justify-center rounded bg-[#F5F5F5] p-5 sm:h-[440px] sm:p-8 lg:order-2 lg:h-[520px] xl:h-[562px]">

        <Image
            src={selectedImage}
            alt={title}

            fill
            unoptimized
            priority
            className="object-contain p-6"
        />

    </div>

</div>

);

}