import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
// import {EffectCoverflow} from 'swiper/core'
import Image from 'next/image'
import React, {useRef, useState} from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow'

const Promo = () => {
  const swiperRef = useRef()
  const [swiperIndex, setSwiperIndex] = useState(0)
  return (
    <>
      <div className="h-full w-full rounded-b-xl bg-secondary-500 overflow-hidden">
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: false }}
      scrollbar={{ draggable: false }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="my-12"
      // onBeforeInit={(swiper) => (swiperRef.current = swiper)}
      //   onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}
      //   modules={[Navigation, Pagination, EffectCoverflow, Autoplay]}
      //   slidesPerView={1}
      //   spaceBetween={0}
      //   // spaceBetween={30}
      //   effect="coverflow"
      //   coverflowEffect={{
      //     scale: 1,
      //     rotate: 0,
      //     stretch: 0,
      //     depth: 0,
      //     slideShadows: false,
      //   }}
      //   autoplay={{
      //     delay: 2500,
      //   }}
      //   direction="vertical"
      //   centeredSlides={true}
      //   pagination={{
      //     el: '.swiper-pagination',
      //     clickable: true,
      //     bulletActiveClass: 'bg-pagination-active',
      //     renderBullet: (i, classname) => {
      //       return `<div class="${classname} w-4 h-8 sm:w-6 sm:h-10 bg-pagination bg-no-repeat bg-contain bg-center"></div>`
      //     },
      //   }}
      //   navigation={{
      //     disabledClass: 'opacity-50',
      //     nextEl: '.swiper-button-next',
      //     prevEl: '.swiper-button-prev',
      //   }}
    >
      <SwiperSlide>Slide 1</SwiperSlide>
      <SwiperSlide>Slide 2</SwiperSlide>
      <SwiperSlide>Slide 3</SwiperSlide>
      <SwiperSlide>Slide 4</SwiperSlide>
    </Swiper>
      </div>
    </>
  );
};

export default Promo;
