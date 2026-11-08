
"use client";


import { useState } from "react";

import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

import { Store, DollarSign, ShoppingBag, Banknote } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

import { ServicesSection } from "@/components/shared/ServicesSection";

const STATS_ITEMS = [
{

    id: "sellers",
    icon: Store,
    number: "10.5k",
    labelKey: "sellersLabel",
},
{

    id: "monthly",
    icon: DollarSign,
    number: "33k",
    labelKey: "monthlyLabel",
    highlighted: true,
},
{
    id: "customers",
    icon: ShoppingBag,
    number: "45.5k",
    labelKey: "customersLabel",
},
{

    id: "annual",
    icon: Banknote,
    number: "25k",
    labelKey: "annualLabel",
},
];


const TEAM_PAGES = [

[

{
    id: "tom-1",
    name: "Tom Cruise",
    roleKey: "tomRole",
    image: "/images/about/tom-cruise.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "emma-1",
    name: "Emma Watson",
    roleKey: "emmaRole",
    image: "/images/about/emma-watson.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "will-1",
    name: "Will Smith",
    roleKey: "willRole",
    image: "/images/about/will-smith.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
],


[
{

    id: "will-2",
    name: "Will Smith",
    roleKey: "willRole",
    image: "/images/about/will-smith.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "tom-2",
    name: "Tom Cruise",
    roleKey: "tomRole",
    image: "/images/about/tom-cruise.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "emma-2",
    name: "Emma Watson",
    roleKey: "emmaRole",
    image: "/images/about/emma-watson.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
],



[
{
    id: "tom-3",
    name: "Tom Cruise",
    roleKey: "tomRole",
    image: "/images/about/tom-cruise.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "emma-3",
    name: "Emma Watson",
    roleKey: "emmaRole",
    image: "/images/about/emma-watson.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "will-3",
    name: "Will Smith",
    roleKey: "willRole",
    image: "/images/about/will-smith.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
],

[
{
    id: "emma-4",
    name: "Emma Watson",
    roleKey: "emmaRole",
    image: "/images/about/emma-watson.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "will-4",
    name: "Will Smith",
    roleKey: "willRole",
    image: "/images/about/will-smith.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "tom-4",
    name: "Tom Cruise",
    roleKey: "tomRole",
    image: "/images/about/tom-cruise.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
],


[
{
    id: "will-5",
    name: "Will Smith",
    roleKey: "willRole",
    image: "/images/about/will-smith.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "emma-5",
    name: "Emma Watson",
    roleKey: "emmaRole",
    image: "/images/about/emma-watson.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
{
    id: "tom-5",
    name: "Tom Cruise",
    roleKey: "tomRole",
    image: "/images/about/tom-cruise.jpg",
    socials: { twitter: "#", instagram: "#", linkedin: "#" },
},
],


];

export default function AboutPage() {

const t = useTranslations("AboutPage");

const [activePageIndex, setActivePageIndex] = useState(2);

// دي بقا اللي هعمل عليها مابينج و اعرض المجموعه اللي هستقبل رقمها 
const currentMembers = TEAM_PAGES[activePageIndex];

return (

<main className="py-10 md:py-16">

    <div className="page-container max-w-[1170px] flex flex-col">

        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">

                    <Link href="/" className="hover:text-black transition-colors">
                        {t("breadcrumbHome")}
                    </Link>

                    <span>/</span>

                    <span className="text-black font-medium">
                        {t("breadcrumbAbout")}
                    </span>

        </nav>


        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_1.1fr] md:gap-10">
        
            <div className="flex flex-col gap-4 pr-0 md:gap-5 md:pr-6">

                <h1 className="text-3xl font-semibold text-black sm:text-4xl">
                    {t("storyTitle")}
                </h1>
                <p className="text-sm text-black leading-relaxed">
                    {t("storyText1")}
                </p>
                <p className="text-sm text-black leading-relaxed">
                    {t("storyText2")}
                </p>

            </div>
        
            <div className="relative aspect-[1.16/1] w-full md:translate-x-[max(var(--page-gutter),calc((100vw-1170px)/2))] rtl:md:-translate-x-[max(var(--page-gutter),calc((100vw-1170px)/2))]">

                <Image
                    src="/images/about/about-hero.jpg"

                    alt={t("storyImageAlt")}
                    fill
                    unoptimized
                    priority
                    className="object-cover object-center"
                />

            </div>

        </div>



        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">

            {STATS_ITEMS.map((stat) => {

                const Icon = stat.icon;

                return (
                    
                <div key={stat.id} className={`flex min-h-[148px] flex-col items-center justify-center rounded border border-gray-200 p-5 transition-all duration-300 group ${

                    stat.highlighted
                        ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-md"
                        : "bg-white text-black hover:bg-[var(--brand)] hover:text-white hover:border-[var(--brand)]"}`} >

                    <div className={`mb-3 flex h-13 w-13 items-center justify-center rounded-full transition-colors ${

                        stat.highlighted
                            ? "bg-white/30 text-white"
                            : "bg-gray-200 text-black group-hover:bg-white/30 group-hover:text-white"}`}>

                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${

                            stat.highlighted
                                ? "bg-white text-black"
                                : "bg-black text-white group-hover:bg-white group-hover:text-black"}`}>

                            <Icon className="h-5 w-5" />

                        </div>

                    </div>

                    <h3 className="mb-1 text-xl font-bold leading-6">
                        {stat.number}
                    </h3>

                    <p className="text-center text-xs font-normal leading-tight">
                        {t(stat.labelKey)}
                    </p>

                </div>
                );
            })}
        </div>


        <div className="mt-16 flex flex-col gap-6">

            <div className="grid grid-cols-1 gap-8 transition-all duration-500 md:grid-cols-3">

                {currentMembers.map((member) => (

                    <div key={member.id} className="flex flex-col gap-4">

                        <div className="relative aspect-[0.86/1] w-full overflow-hidden rounded bg-[#F5F5F5]">

                            <Image
                                src={member.image}

                                alt={member.name}
                                fill
                                unoptimized
                                className="object-cover object-top"
                            />

                        </div>

                        <div className="flex flex-col gap-1">

                            <h3 className="text-xl font-medium text-black">
                                {member.name}
                            </h3>

                            <p className="text-sm text-gray-600">
                                {t(member.roleKey)}
                            </p>

                        </div>

                        <div className="flex items-center gap-4 text-black">

                            <a
                                href={member.socials.twitter}

                                aria-label="Twitter"
                                className="hover:text-[var(--brand)] transition-colors"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>

                            <a
                                href={member.socials.instagram}

                                aria-label="Instagram"
                                className="hover:text-[var(--brand)] transition-colors"
                            >
                                <FaInstagram className="w-5 h-5" />
                            </a>

                            <a
                                href={member.socials.linkedin}
                                
                                aria-label="LinkedIn"
                                className="hover:text-[var(--brand)] transition-colors"
                            >
                                <FaLinkedinIn className="w-5 h-5" />
                            </a>

                        </div>

                    </div>
                ))}

            </div>

            <div className="flex items-center justify-center gap-3 pt-4">

                {TEAM_PAGES.map((_, index) => (

                    <button
                        key={index}
                        onClick={() => setActivePageIndex(index)}

                        aria-label={t("teamSlideLabel", { number: index + 1 })}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                            activePageIndex === index
                                ? "w-3 h-3 bg-[var(--brand)] border-2 border-white ring-1 ring-[var(--brand)]"
                                : "w-3 h-3 bg-gray-300 hover:bg-gray-400"}`} 
                    />

                ))}

            </div>

        </div>


        <div className="mt-16">
            <ServicesSection compact />
        </div>

    </div>

</main>
);
}


