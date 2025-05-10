"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface image {
  url: string;
  alt:string
}
interface images {
  images: image[];
}
function Banner({ images }: images) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, EffectFade]}
      effect="fade"
      speed={600}
      className="mySwiper"
    >
      {images.map((image) => {
        return (
          <SwiperSlide className="h-full relative">
            <Image 
            fill
            src={image.url}
            alt={image.alt}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Banner;
