// TODO: ارجع للملف دا محتاج مراجعه 

"use client";

import { useState, useRef } from "react";

import Image from "next/image";
import { FaChevronRight, FaArrowRight, FaApple, FaGamepad, FaTshirt, FaHome, FaRunning, FaGift, } from "react-icons/fa";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const HERO_SLIDES = [
  {

    id: 1,
    titleKey: "iphoneTitle",
    subtitleKey: "iphoneSubtitle",

    image: "/images/home/hero/hero-iphone.jpg",
    link: "/category/electronics",

    icon: FaApple,
  },

  {

    id: 2,
    titleKey: "ps5Title",
    subtitleKey: "ps5Subtitle",

    image: "/images/home/hero/hero-playstation.jpg",
    link: "/category/electronics",

    icon: FaGamepad,
  },

  {

    id: 3,
    titleKey: "womenFashionTitle",
    subtitleKey: "womenFashionSubtitle",

    image: "/images/home/hero/hero-women.jpg",
    link: "/category/women's clothing",

    icon: FaTshirt,
  },

  {

    id: 4,
    titleKey: "lifestyleTitle",
    subtitleKey: "lifestyleSubtitle",

    image: "/images/home/hero/hero-lifestyle.jpg",
    link: "/category/jewelery",

    icon: FaHome,
  },

  {

    id: 5,
    titleKey: "outdoorTitle",
    subtitleKey: "outdoorSubtitle",

    image: "/images/home/hero/hero-outdoor.jpg",
    link: "/category/men's clothing",

    icon: FaRunning,
  },

  {

    id: 6,
    titleKey: "voucherTitle",
    subtitleKey: "voucherSubtitle",

    image: "/images/home/hero/hero-voucher.jpg",
    link: "/category/electronics",

    icon: FaGift,
  },

];

const CATEGORIES = [
  {

    key: "womanFashion",
    slug: "women's clothing",

    subs: ["dresses", "tops", "jackets", "shoes"],
  },

  {

    key: "manFashion",
    slug: "men's clothing",

    subs: ["shirts", "pants", "outerwear", "watches"],
  },

  { key: "electronics", slug: "electronics" },

  { key: "homeLifestyle", slug: "home-lifestyle" },

  { key: "medicine", slug: "medicine" },

  { key: "sportsOutdoor", slug: "sports-outdoor" },

  { key: "babyToys", slug: "baby-toys" },

  { key: "groceriesPets", slug: "groceries-pets" },

  { key: "healthBeauty", slug: "health-beauty" },
];

export const HeroSection = () => {

const t = useTranslations("Hero");

const [currentSlide, setCurrentSlide] = useState(0);
const [activeCategory, setActiveCategory] = useState<string | null>(null);
const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (key: string) => {

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);

    setActiveCategory(key);
  };

  const handleMouseLeave = () => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    hoverTimeoutRef.current = setTimeout(() => setActiveCategory(null), 200);
  };

  return (

<section className="mb-14">

      <div className="page-container flex flex-col md:flex-row items-stretch">

        <div className="relative w-full border-r border-gray-300 pt-10 pb-2 md:w-[217px] md:shrink-0 md:pr-4 ltr:border-r rtl:border-r-0 rtl:border-l rtl:pl-4 rtl:pr-0">
          
          <ul className="flex flex-col gap-4">

            {CATEGORIES.map((cat) => (

              <li
                key={cat.key}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(cat.key)}
                onMouseLeave={handleMouseLeave}
              >

                <div className="flex items-center justify-between gap-2">
                  <Link
                    href={`/category/${cat.slug}`}
                    className="min-w-0 flex-1 text-base text-black transition-colors hover:text-[var(--brand)]"
                  >
                    {t(`categories.${cat.key}`)}
                  </Link>

                  {cat.subs && (
                    <button
                      type="button"
                      aria-label={t("toggleSubcategories", { category: t(`categories.${cat.key}`) })}
                      aria-expanded={activeCategory === cat.key}
                      onClick={() => {
                        if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
                        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
                          setActiveCategory(cat.key);
                          return;
                        }

                        setActiveCategory((active) => active === cat.key ? null : cat.key);
                      }}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded text-black hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--brand)] md:h-7 md:w-7"
                    >
                      <FaChevronRight className={`h-3.5 w-3.5 transition-transform group-hover:text-[var(--brand)] rtl:rotate-180 ${activeCategory === cat.key ? "rotate-90 rtl:-rotate-90" : ""}`} />
                    </button>
                  )}
                </div>


                {cat.subs && activeCategory === cat.key && (

                  <div
                    className="relative z-30 mt-2 flex w-full flex-col gap-1 rounded border border-gray-100 bg-white p-3 shadow-sm md:absolute md:top-0 md:mt-0 md:w-52 md:shadow-lg md:ltr:left-[calc(100%+12px)] md:rtl:right-[calc(100%+12px)]"

                    onMouseEnter={() => handleMouseEnter(cat.key)}
                    onMouseLeave={handleMouseLeave}
                  >

                    {cat.subs.map((sub) => (

                      <Link
                        key={sub}
                        href={`/category/${cat.slug}`}
                        className="rounded px-2 py-[7px] text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-[var(--brand)]"
                      >
                        {t(`subCategories.${sub}`)}
                      </Link>

                    ))}

                  </div>
                )}

              </li>

            ))}

          </ul>

        </div>


        <div className="w-full flex-1 pt-10 ltr:md:pl-11 rtl:md:pr-11">

          <div
            className="relative flex min-h-[300px] w-full items-center overflow-hidden rounded-sm bg-black p-8 text-white md:min-h-[344px] md:p-12"
          >

            {HERO_SLIDES.map((slide, index) => {

              const IconComponent = slide.icon;

              return (

                <div
                  key={slide.id}

                  className={`absolute inset-0 flex items-center justify-between p-8 transition-opacity duration-700 ease-in-out md:p-12 ${
                    index === currentSlide
                      ? "z-10 opacity-100"
                      : "pointer-events-none z-0 opacity-0"
                  }`}
                >
                  <div className="z-10 flex max-w-xs flex-col gap-5 md:max-w-md">

                    <div className="flex items-center gap-6">

                      {IconComponent && (
                        <IconComponent className="h-10 w-10 text-white" />
                      )}

                      <span className="text-base font-normal tracking-wide">
                        {t(`slides.${slide.titleKey}`)}
                      </span>

                    </div>

                    <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
                      {t(`slides.${slide.subtitleKey}`)}
                    </h1>

                    <Link
                      href={slide.link}
                      className="group mt-2 flex w-fit items-center gap-2 text-base font-medium text-white"
                    >
                      <span className="border-b border-white pb-1">
                        {t("shopNow")}
                      </span>

                      <FaArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />

                    </Link>

                  </div>

                  <div className="relative h-[180px] w-[180px] md:h-[280px] md:w-[320px]">
                    {index === currentSlide && (
                      <Image
                        src={slide.image}
                        alt={t(`slides.${slide.titleKey}`)}
                        fill
                        priority
                        sizes="(max-width: 768px) 180px, 320px"
                        className="object-contain"
                      />
                    )}
                  </div>
                </div>

              );

            })}


            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">

              {HERO_SLIDES.map((slide, index) => (

                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}

                  aria-label={t("slideLabel", { number: index + 1 })}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "scale-125 border-2 border-white bg-[var(--brand)]"
                      : "bg-white/50 hover:bg-white"
                  }`}
                />

              ))}

            </div>

          </div>

        </div>
      </div>

</section>

  );

};



