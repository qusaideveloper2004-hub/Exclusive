export function ProductDetailsSkeleton() {


return (

<main className="py-14 min-h-[60vh]">

    <div className="page-container max-w-[1170px] flex flex-col gap-10">

        <div className="w-48 h-6 bg-gray-200 rounded animate-pulse" />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            <div className="w-full h-[450px] bg-gray-200 rounded animate-pulse" />


            <div className="flex flex-col gap-6">

                <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse" />

                <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse" />

                <div className="w-full h-24 bg-gray-200 rounded animate-pulse" />

            </div>

        </div>

    </div>

</main>

);

}


