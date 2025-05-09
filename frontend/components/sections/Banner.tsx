"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface image {
  url: string;
}
function Banner({ images }: image[]) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, EffectFade]}
      effect="fade"
      speed={600}
      className="mySwiper"
    >
      {images.map((image) => {
        return <SwiperSlide className="">
            <Image
            
            />
        </SwiperSlide>;
      })}
    </Swiper>
  );
}

export default Banner;
