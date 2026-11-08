'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {

    targetDate: Date;

    variant?: 'default' | 'circular';
    className?: string;
}

export const CountdownTimer = ({ targetDate, variant = 'default', className = '' }: CountdownTimerProps) => {

const t = useTranslations('Countdown');

const [timeLeft, setTimeLeft] = useState({

    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
});

useEffect(() => {

    const timer = setInterval(() => {

    const differenceTime = targetDate.getTime() - new Date().getTime();

        if (differenceTime > 0) {

            setTimeLeft({

                days: Math.floor(differenceTime / (1000 * 60 * 60 * 24)),
                hours: Math.floor((differenceTime / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((differenceTime / (1000 * 60)) % 60),
                seconds: Math.floor((differenceTime / 1000) % 60)
            });

        }}, 1000);

    return () => clearInterval(timer);

}, [targetDate]);

const formatNumber = (num: number) => num.toString().padStart(2, '0');



if (variant === 'circular') {

    return (

        <div className={`flex items-center gap-4 ${className}`} dir="ltr">


            <div className="w-16 h-16 rounded-full bg-white text-black flex flex-col items-center justify-center shrink-0">

                <span className="text-base font-bold leading-tight">
                    {formatNumber(timeLeft.hours)}
                </span>

                <span className="text-[11px] font-medium leading-tight">
                    {t('hours')}
                </span>

            </div>


            <div className="w-16 h-16 rounded-full bg-white text-black flex flex-col items-center justify-center shrink-0">

                <span className="text-base font-bold leading-tight">
                    {formatNumber(timeLeft.days)}
                </span>

                <span className="text-[11px] font-medium leading-tight">
                    {t('days')}
                </span>

            </div>


            <div className="w-16 h-16 rounded-full bg-white text-black flex flex-col items-center justify-center shrink-0">

                <span className="text-base font-bold leading-tight">
                    {formatNumber(timeLeft.minutes)}
                </span>

                <span className="text-[11px] font-medium leading-tight">
                    {t('minutes')}
                </span>

            </div>


            <div className="w-16 h-16 rounded-full bg-white text-black flex flex-col items-center justify-center shrink-0">

                <span className="text-base font-bold leading-tight">
                    {formatNumber(timeLeft.seconds)}
                </span>

                <span className="text-[11px] font-medium leading-tight">
                    {t('seconds')}
                </span>

            </div>

        </div>

    );

}



    return (

        <div className={`flex items-center gap-3 sm:gap-4 text-black font-bold ${className}`} dir="ltr">

            <div className="flex flex-col items-center">

                <span className="text-[10px] sm:text-xs font-medium text-gray-600 mb-1">
                    {t('days')}
                </span>

                <span className="text-2xl sm:text-3xl tracking-tight">
                    {formatNumber(timeLeft.days)}
                </span>

            </div>

            <span className="text-2xl text-[var(--brand)] font-bold mb-1">:</span>

            <div className="flex flex-col items-center">

                <span className="text-[10px] sm:text-xs font-medium text-gray-600 mb-1">
                    {t('hours')}
                </span>

                <span className="text-2xl sm:text-3xl tracking-tight">
                    {formatNumber(timeLeft.hours)}
                </span>

            </div>

            <span className="text-2xl text-[var(--brand)] font-bold mb-1">:</span>

            <div className="flex flex-col items-center">

                <span className="text-[10px] sm:text-xs font-medium text-gray-600 mb-1">
                    {t('minutes')}
                </span>

                <span className="text-2xl sm:text-3xl tracking-tight">
                    {formatNumber(timeLeft.minutes)}
                </span>

            </div>

            <span className="text-2xl text-[var(--brand)] font-bold mb-1">:</span>

            <div className="flex flex-col items-center">

                <span className="text-[10px] sm:text-xs font-medium text-gray-600 mb-1">
                    {t('seconds')}
                </span>

                <span className="text-2xl sm:text-3xl tracking-tight">
                    {formatNumber(timeLeft.seconds)}
                </span>

            </div>

        </div>

    );

};



