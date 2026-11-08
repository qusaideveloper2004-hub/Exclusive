'use client';

import React, { useState } from 'react';
import Image from 'next/image';

import { FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

import { Input } from '@/components/ui/Input';

export const Footer = () => {

const t = useTranslations('Footer');

const [email, setEmail] = useState('');

const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
        if (email.trim()) {

            setEmail('');
            alert(t('subscribeSuccess'));
            
        } else {
            alert(t('subscribeError'));
        }
    };


return (

<footer className="bg-black text-white pt-16 pb-6 border-t border-gray-800">

    <div className="page-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">


        <div className="flex flex-col gap-4">

            <Link href="/" className="text-2xl font-bold tracking-wider">
                Exclusive
            </Link>

            <h3 className="text-xl font-medium">{t('subscribeTitle')}</h3>

            <p className="text-sm text-gray-300">{t('subscribeText')}</p>

            <form onSubmit={handleSubscribe} className="mt-2">
                <Input
                    type="email"
                    placeholder={t('emailPlaceholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}

                    className="bg-transparent text-white border-white placeholder:text-gray-400 focus:border-[var(--brand)]"

                    icon={
                        <button
                            type="submit"
                            aria-label={t('subscribeTitle')}
                            className="hover:opacity-80 transition-opacity"
                        >
                            <FaPaperPlane className="w-4 h-4 text-white rtl:-scale-x-100" />
                        </button>
                    }
                />
            </form>

        </div>


            <div className="flex flex-col gap-4">

                <h3 className="text-xl font-medium">{t('supportTitle')}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                    {t('supportAddressLine1')}
                    <br />
                    {t('supportAddressLine2')}
                </p>
                <p className="text-sm text-gray-300">qusaideveloper2004@gmail.com</p>
                <p className="text-sm text-gray-300" dir="ltr">+201032831805</p>

            </div>


            <div className="flex flex-col gap-4">

                <h3 className="text-xl font-medium">{t('accountTitle')}</h3>

                <ul className="flex flex-col gap-3 text-sm text-gray-300">

                    <li>
                        <Link href="/account" className="hover:text-white transition-colors">
                            {t('myAccount')}
                        </Link>
                    </li>

                    <li>
                        <Link href="/login"   className="hover:text-white transition-colors">
                            {t('loginRegister')}
                        </Link>
                    </li>

                    <li>
                        <Link href="/cart"   className="hover:text-white transition-colors">
                            {t('cart')}
                        </Link>
                    </li>

                    <li>
                        <Link href="/wishlist"   className="hover:text-white transition-colors">
                            {t('wishlist')}
                        </Link>
                    </li>

                    <li>
                        <Link href="/category/all"  className="hover:text-white transition-colors">
                            {t('shop')}
                        </Link>
                    </li>
                        
                </ul>
                
            </div>



            <div className="flex flex-col gap-4">

                <h3 className="text-xl font-medium">{t('quickLinkTitle')}</h3>

                <ul className="flex flex-col gap-3 text-sm text-gray-300">

                    <li>
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">
                            {t('privacyPolicy')}
                        </Link>
                    </li>

                    <li>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            {t('termsOfUse')}
                        </Link>
                    </li>

                    <li>
                        <Link href="/faq" className="hover:text-white transition-colors">
                            {t('faq')}
                        </Link>
                    </li>

                    <li>
                        <Link href="/contact" className="hover:text-white transition-colors">
                            {t('contact')}
                        </Link>
                    </li>

                </ul>

            </div>



            <div className="flex flex-col gap-4">

                <h3 className="text-xl font-medium">{t('downloadAppTitle')}</h3>

                <p className="text-xs text-gray-400 font-medium">{t('appDiscountText')}</p>

                <div className="flex items-center gap-3">

                    <div className="w-20 h-20 relative bg-white p-1 rounded">
                        <Image
                                src="/images/footer/qr-code.png"
                            alt={t('qrCodeAlt')}
                            width={76}
                            height={76}

                            className="object-contain"
                        />
                    </div>


                    <div className="flex flex-col gap-2">
                        <a
                            href="https://play.google.com/store"
                            target="_blank"
                            rel="noopener noreferrer"

                            className="block hover:opacity-80 transition-opacity"
                        >
                            <Image
                                    src="/images/footer/google-play.png"
                                alt={t('googlePlayAlt')}
                                width={110}
                                height={36}

                                className="object-contain"
                            />
                        </a>

                        <a
                            href="https://www.apple.com/app-store/"
                            target="_blank"
                            rel="noopener noreferrer"

                            className="block hover:opacity-80 transition-opacity"
                        >
                            <Image
                                    src="/images/footer/app-store.png"
                                alt={t('appStoreAlt')}
                                width={110}
                                height={36}

                                className="object-contain"
                            />
                        </a>

                    </div>

                </div>



                    <div className="flex items-center gap-6 mt-2 text-white">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('facebook')}

                            className="hover:text-[var(--brand)] transition-colors"
                        >
                            <FaFacebookF className="w-5 h-5" />
                        </a>

                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('twitter')}

                            className="hover:text-[var(--brand)] transition-colors"
                        >
                            <FaTwitter className="w-5 h-5" />
                        </a>

                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('instagram')}

                            className="hover:text-[var(--brand)] transition-colors"
                        >
                            <FaInstagram className="w-5 h-5" />
                        </a>

                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={t('linkedin')}

                            className="hover:text-[var(--brand)] transition-colors"
                        >
                            <FaLinkedinIn className="w-5 h-5" />
                        </a>

                    </div>
            </div>


    </div>


    <div className="border-t border-gray-900 pt-4 text-center text-sm text-gray-400">
        <p>{t('copyright')}</p>
    </div>

</footer>

);
};


