'use client';

import { useTranslations } from 'next-intl';

export default function Error({ error, reset, }: {

    error: Error & { digest?: string };
    reset: () => void;

}) {

const t = useTranslations('Errors');

    return (
        <main role="alert" className="page-container py-20 text-center">

            <h1 className="text-2xl font-semibold">{t('title')}</h1>
            <p className="mt-2 text-gray-600">{t('description')}</p>

            {process.env.NODE_ENV === 'development' && error.message && (
                <p className="mx-auto mt-4 max-w-2xl text-sm text-red-600">
                    {error.message}
                </p>
            )}

            <button
                type="button"
                onClick={reset}
                className="mt-6 rounded bg-[var(--brand)] px-6 py-3 text-white"
            >
                {t('retry')}
            </button>
            
        </main>
    );
}



