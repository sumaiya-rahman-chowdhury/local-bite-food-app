"use client";
import API_URL from "@/lib/static/static";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface image {
  id: string;
  url: string;
  alt: string;
}
interface images {
  images: image[];
}
function Banner({ images }: images) {
  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Navigation, EffectFade]}
        effect="fade"
        speed={600}
        className="mySwiper"
      >
        {images.map((image) => {
          return (
            <SwiperSlide className="h-full relative" key={image.id}>
              <Image fill src={image.url} alt={image.alt || "Banner Images"} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Banner;
