import React from "react";
import styled from "styled-components";

// swiper 관련
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSwiper = ({ images }) => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);

  return (
    <>
      <StyledSwiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop
      >
        {images &&
          images.map((list, idx) => {
            return (
              <SwiperSlide key={idx}>
                <IMG src={list} alt="banner" key={idx} />
              </SwiperSlide>
            );
          })}
      </StyledSwiper>
    </>
  );
};

const StyledSwiper = styled(Swiper)`
  width: 100%;
  border-radius: 14px;

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

  &:hover {
    cursor: pointer;
  }
`;

export default BannerSwiper;
