import { useTranslations } from "next-intl";
import { Truck, RotateCcw } from "lucide-react";


export function ProductDeliveryInfo() {

const t = useTranslations("ProductDetails");


return (

<div className="mt-2 divide-y divide-gray-300 rounded border border-gray-300">

    <div className="p-4 flex items-center gap-4">

        <Truck className="w-10 h-10 text-black" />

        <div className="flex flex-col gap-1">

            <h4 className="text-base font-medium text-black">
                {t("freeDeliveryTitle")}
            </h4>

            <p className="text-xs text-black underline cursor-pointer">
                {t("freeDeliverySub")}
            </p>

        </div>

    </div>


    <div className="p-4 flex items-center gap-4">

        <RotateCcw className="w-10 h-10 text-black" />

        <div className="flex flex-col gap-1">

            <h4 className="text-base font-medium text-black">
                {t("returnDeliveryTitle")}
            </h4>

            <p className="text-xs text-black">
                {t("returnDeliverySub")}
            </p>

        </div>

    </div>

</div>

);

}


