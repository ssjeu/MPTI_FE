import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSwiper = ({ images, url }) => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  return (
    <>
      <StyledSwiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop
        breakpoints={{
          820: {
            slidesPerView: 3, //브라우저가 820보다 클 때
            spaceBetween: 20,
            loopFillGroupWithBlank: true,
          },
        }}
      >
        {images &&
          images.map((list, idx) => {
            return (
              <SwiperSlide key={idx}>
                {idx === 0 ? (
                  <a href={url[idx]} target="_blank">
                    <IMG src={list} alt="banner" key={idx} />
                  </a>
                ) : (
                  <a href={url[idx]}>
                    <IMG src={list} alt="banner" key={idx} />
                  </a>
                )}
              </SwiperSlide>
            );
          })}
      </StyledSwiper>
    </>
  );
};

const StyledSwiper = styled(Swiper)`
  width: 100%;

  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 92%;
    width: 100%;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: var(--gray2);
    border: none;
  }

  .swiper-pagination-bullet-active {
    background-color: white;
    transition: background-color 0.3s;
  }
`;

const IMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 14px;

  &:hover {
    cursor: pointer;
  }
`;

export default BannerSwiper;
