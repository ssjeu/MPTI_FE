import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Character } from '../../images/character/Frame_single.svg';

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
      {images && images.length > 0 ? (
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
      ) : (
        <NoImage>
          <div>
            <Character />
            <p>
              아직 등록된 프로필이 없어요!
              <br />
              프로필을 등록해보세요✨
            </p>
          </div>
        </NoImage>
      )}
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

const NoImage = styled.div`
  background-color: #fff;
  width: 100%;
  height: 500px;
  border-radius: 4px;
  border: 0.5px solid var(--gray1);

  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    margin-bottom: 20px;
  }

  & > p {
    font-weight: 300;
  }
`;

export default ProfileSwiper;
