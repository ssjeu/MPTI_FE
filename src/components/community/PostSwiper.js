// 이미지 다중 슬라이드
import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react'; // basic
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/css'; //basic
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './PostSwiper.css';

const PostSwiper = ({ card }) => {
  SwiperCore.use([Navigation, Pagination]);
  return (
    <PostSwiperWrap>
      <StyledSwiper pagination={{ clickable: true }}>
        {card.postImage.map((card, index) => (
          <SwiperSlide key={index}>
            <SwiperImg src={card.toString()} alt='postImage' />
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </PostSwiperWrap>
  );
};

const PostSwiperWrap = styled.div`
  margin-top: 12px;
  z-index: 999;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  height: 35vh;
  border-radius: 6px;
  overflow: hidden;
`;

const SwiperImg = styled.img`
  position: absolute;
  border-radius: 6px;
  height: 100%;
  bottom: 0%;
`;

export default PostSwiper;
