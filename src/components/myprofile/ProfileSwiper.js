import React from 'react';
import styled from 'styled-components';

// swiper 관련
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProfileSwiper = ({ images }) => {
  SwiperCore.use([Navigation, Pagination]);

  let elements = document.getElementsByClassName('swiper-slide');
  let swiperElements = elements[1];
  if (swiperElements) {
    swiperElements.style.width = '100%';
  }

  return (
    <>
      <StyledSwiper pagination={{ clickable: true }} loop>
        {images &&
          images.map((list, idx) => {
            return (
              <SwiperSlide key={idx}>
                <IMG src={list} alt='' key={idx} />
              </SwiperSlide>
            );
          })}
      </StyledSwiper>
    </>
  );
};

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 500px;
  border-radius: 4px;

  .swiper-horizontal > .swiper-pagination-bullets,
  .swiper-pagination-bullets.swiper-pagination-horizontal,
  .swiper-pagination-custom,
  .swiper-pagination-fraction {
    bottom: 95%;
    left: 0;
    width: 100%;
  }

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: var(--gray2);
    border: none;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--maincolor);
    transition: background-color 0.3s;
  }
`;

const IMG = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export default ProfileSwiper;
