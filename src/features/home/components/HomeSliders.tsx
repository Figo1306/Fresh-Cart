"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import sliderImg1 from "@/assets/images/home-slider-1.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export interface SlideItem {
  id: number;
  image: string | { src: string };
  title: string;
  subtitle: string;
  primaryBtn: {
    text: string;
    href: string;
    colorClass: string;
  };
  secondaryBtn: {
    text: string;
    href: string;
  };
}

// You can easily replace the photos, titles, and links below
export const HOME_SLIDES: SlideItem[] = [
  {
    id: 1,
    image: sliderImg1,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primaryBtn: {
      text: "Shop Now",
      href: "/products",
      colorClass: "text-green-500",
    },
    secondaryBtn: {
      text: "View Deals",
      href: "/deals",
    },
  },
  {
    id: 2,
    image: sliderImg1,
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primaryBtn: {
      text: "Shop Now",
      href: "/products",
      colorClass: "text-blue-500",
    },
    secondaryBtn: {
      text: "Learn More",
      href: "/about",
    },
  },
  {
    id: 3,
    image: sliderImg1,
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    primaryBtn: {
      text: "Order Now",
      href: "/products",
      colorClass: "text-purple-500",
    },
    secondaryBtn: {
      text: "Delivery Info",
      href: "/delivery",
    },
  },
];

export default function HomeSliders() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        speed={700}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="w-full"
      >
        {HOME_SLIDES.map((slide) => {
          const bgUrl =
            typeof slide.image === "string" ? slide.image : slide.image.src;

          return (
            <SwiperSlide key={slide.id}>
              <div
                style={{
                  backgroundImage: `url(${bgUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                className="h-[400px] flex items-center justify-center relative overflow-hidden"
              >
                <div className="overlay py-20 text-white p-4 w-full h-full bg-linear-to-r from-green-500/90 to-green-400/50 flex items-center">
                  <div className="container h-full flex flex-col justify-center">
                    <h2 className="text-white text-3xl font-bold mb-4 max-w-96">
                      {slide.title}
                    </h2>
                    <p className="text-white/95 text-base">
                      {slide.subtitle}
                    </p>
                    <div className="mt-4 flex items-center">
                      <Link
                        href={slide.primaryBtn.href}
                        className={`btn bg-white border-2 border-white/50 ${slide.primaryBtn.colorClass} inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`}
                      >
                        {slide.primaryBtn.text}
                      </Link>
                      <Link
                        href={slide.secondaryBtn.href}
                        className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                      >
                        {slide.secondaryBtn.text}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Prev Navigation Button */}
      <button
        type="button"
        aria-label="Previous Slide"
        onClick={() => swiperRef.current?.slidePrev()}
        className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <IconChevronLeft className="w-6 h-6" stroke={2.5} />
      </button>

      {/* Custom Next Navigation Button */}
      <button
        type="button"
        aria-label="Next Slide"
        onClick={() => swiperRef.current?.slideNext()}
        className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-white/90 hover:bg-white text-green-500 hover:text-green-600 rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
      >
        <IconChevronRight className="w-6 h-6" stroke={2.5} />
      </button>
    </section>
  );
}
