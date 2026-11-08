import { useTranslations } from "next-intl";

import { Product } from "@/types/product";


interface ProductOptionsProps {
    colors: Product["colors"];
    selectedColor: string;
    selectedSize: string;
    onColorChange: (color: string) => void;
    onSizeChange: (size: string) => void;
}


export function ProductOptions({ colors, selectedColor, selectedSize, onColorChange, onSizeChange }: ProductOptionsProps) {

const t = useTranslations("ProductDetails");


return (

<div className="flex flex-col gap-5">

    {colors && colors.length > 0 && (

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">

            <span className="text-xl font-normal text-black">
                {t("colours")}:
            </span>

            <div className="flex items-center gap-2">

                {colors.map((color, idx) => (

                    <button
                        key={idx}
                        type="button"
                        onClick={() => onColorChange(color.name)}
                        aria-label={color.name}
                        aria-pressed={selectedColor === color.name}
                        className={`w-5 h-5 rounded-full border p-0.5 flex items-center justify-center cursor-pointer transition-transform ${
                            selectedColor === color.name
                                ? "border-black scale-110"
                                : "border-transparent"
                        }`}
                    >

                        <span
                            className="w-full h-full rounded-full"
                            style={{ backgroundColor: color.hex }}
                        />

                    </button>

                ))}

            </div>

        </div>

    )}


    <div className="flex flex-wrap items-center gap-3 sm:gap-4">

        <span className="text-xl font-normal text-black">
            {t("size")}:
        </span>

        <div className="flex items-center gap-2">

            {["XS", "S", "M", "L", "XL"].map((size) => (

                <button
                    key={size}
                    type="button"
                    onClick={() => onSizeChange(size)}
                    aria-pressed={selectedSize === size}
                    className={`w-8 h-8 rounded border text-xs font-medium flex items-center justify-center cursor-pointer transition-colors ${
                        selectedSize === size
                            ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                            : "bg-white text-black border-gray-300 hover:border-black"
                    }`}
                >
                    {size}
                </button>

            ))}

        </div>

    </div>

</div>

);

}



