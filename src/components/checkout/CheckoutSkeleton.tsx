export default function CheckoutSkeleton() {

    return (

        <main className="page-container max-w-[1170px] animate-pulse py-10 md:py-12">

            <div className="mb-10 h-4 w-48 rounded bg-gray-200" />


            <div className="mb-10 grid max-w-xl grid-cols-2 gap-4">

                <div className="h-10 border-b-2 border-gray-300" />

                <div className="h-10 border-b-2 border-gray-200" />

            </div>


            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-16">


                <section className="space-y-6 lg:col-span-6">

                    <div className="h-8 w-48 rounded bg-gray-200" />

                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (

                        <div key={item} className="space-y-2">

                            <div className="h-3 w-28 rounded bg-gray-200" />

                            <div className="h-11 w-full rounded bg-gray-100" />

                        </div>

                    ))}

                </section>


                <section className="space-y-6 lg:col-span-6">

                    <div className="h-7 w-40 rounded bg-gray-200" />

                    {[1, 2, 3].map((item) => (

                        <div key={item} className="flex items-center gap-4">

                            <div className="h-14 w-14 rounded bg-gray-200" />

                            <div className="h-4 flex-1 rounded bg-gray-200" />

                        </div>

                    ))}

                    <div className="h-32 rounded bg-gray-100" />

                    <div className="h-11 rounded bg-gray-200" />

                </section>


            </div>

        </main>

    );

}