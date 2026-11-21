export default function Loading() {

    return (
        <main
            role="status"
            aria-label="Loading"
            className="page-container max-w-[1170px] animate-pulse py-12 md:py-16"
        >
            <div className="h-4 w-40 rounded bg-gray-200" />

            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="h-48 rounded bg-gray-100"
                    />
                ))}
            </div>

            <div className="mt-8 space-y-4">
                <div className="h-8 w-2/3 rounded bg-gray-200" />
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-5/6 rounded bg-gray-100" />
            </div>
        </main>
    );
}


