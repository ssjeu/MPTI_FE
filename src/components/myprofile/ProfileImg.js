import React, { useRef } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';

import AddImgBtn from '../../elements/AddImgBtn';
import { imageApi } from '../../shared/api';

const ProfileImg = (props) => {
  const { margin, parent, data } = props;

  const imageInput = useRef();
  const dispatch = useDispatch();

  const [profileFile, setProfileFile] = React.useState(null);
  const [userProfileImages, setUserProfileImages] = React.useState([]);

  // 이미지 추가 버튼 누를 시, input 연결 부분
  const imageUpload = () => {
    imageInput.current?.click();
  };

  // 이미지 압축
  const compressImage = async (image) => {
    try {
      const options = {
        maxSizeMb: 0.2,
        maxWidthOrHeight: 600,
      };
      return await imageCompression(image, options);
    } catch (e) {
      console.log(e);
    }
  };

  const addFileImage = async (e) => {
    const originalImg = e.target.files[0];
    const compressedImg = await compressImage(originalImg);
    setProfileFile(compressedImg);
  };

  // s3 url 받아오는 api 연결 부분
  React.useEffect(() => {
    if (profileFile) {
      const formData = new FormData();
      formData.append('profileImages', profileFile);

      imageApi
        .userImage(formData)
        .then((res) => {
          setUserProfileImages((userProfileImages) => [
            ...userProfileImages,
            res.data.profileImages,
          ]);
        })
        .catch((err) => console.log(err));
    }
  }, [profileFile]);

  React.useEffect(() => {
    imageInput.current.value = '';
    parent(userProfileImages);
  }, [userProfileImages]);

  React.useEffect(() => {
    if (data) {
      setUserProfileImages(data);
    }
  }, [data]);

  return (
    <>
      <ProfileArea margin={margin}>
        <div
          style={{
            backgroundImage:
              userProfileImages && `url(${userProfileImages[0]})`,
          }}
        >
          <AddImgBtn
            _onClick={
              userProfileImages[0] === undefined
                ? imageUpload
                : () => {
                    setUserProfileImages(
                      userProfileImages.filter(
                        (e) => e !== userProfileImages[0]
                      )
                    );
                  }
            }
            state={userProfileImages[0]}
          />
        </div>

        <div
          style={{
            backgroundImage:
              userProfileImages && `url(${userProfileImages[1]})`,
          }}
        >
          <AddImgBtn
            _onClick={
              userProfileImages[1] === undefined
                ? imageUpload
                : () => {
                    setUserProfileImages(
                      userProfileImages.filter(
                        (e) => e !== userProfileImages[1]
                      )
                    );
                  }
            }
            state={userProfileImages[1]}
          />
        </div>

        <div
          style={{
            backgroundImage:
              userProfileImages && `url(${userProfileImages[2]})`,
          }}
        >
          <AddImgBtn
            _onClick={
              userProfileImages[2] === undefined
                ? imageUpload
                : () => {
                    setUserProfileImages(
                      userProfileImages.filter(
                        (e) => e !== userProfileImages[2]
                      )
                    );
                  }
            }
            state={userProfileImages[2]}
          />
        </div>

        <div
          style={{
            backgroundImage:
              userProfileImages && `url(${userProfileImages[3]})`,
          }}
        >
          <AddImgBtn
            _onClick={
              userProfileImages[3] === undefined
                ? imageUpload
                : () => {
                    setUserProfileImages(
                      userProfileImages.filter(
                        (e) => e !== userProfileImages[3]
                      )
                    );
                  }
            }
            state={userProfileImages[3]}
          />
        </div>

        <div
          style={{
            backgroundImage:
              userProfileImages && `url(${userProfileImages[4]})`,
          }}
        >
          <AddImgBtn
            _onClick={
              userProfileImages[4] === undefined
                ? imageUpload
                : () => {
                    setUserProfileImages(
                      userProfileImages.filter(
                        (e) => e !== userProfileImages[4]
                      )
                    );
                  }
            }
            state={userProfileImages[4]}
          />
        </div>

        <div
          style={{
            backgroundImage:
              userProfileImages && `url(${userProfileImages[5]})`,
          }}
        >
          <AddImgBtn
            _onClick={
              userProfileImages[5] === undefined
                ? imageUpload
                : () => {
                    setUserProfileImages(
                      userProfileImages.filter(
                        (e) => e !== userProfileImages[5]
                      )
                    );
                  }
            }
            state={userProfileImages[5]}
          />
        </div>
      </ProfileArea>

      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        ref={imageInput}
        onChange={addFileImage}
      />
    </>
  );
};

const ProfileArea = styled.div`
  margin: ${(props) => props.margin};

  width: 100%;

  display: grid;
  grid-template: 193.5px 193.5px / 1fr 1fr 1fr;
  grid-gap: 15.5px 7.1px;

  & > div {
    background-color: #eee;
    border-radius: 4px;
    position: relative;

    background-position: center;
    background-size: cover;
  }

  & > div > * {
    position: absolute;
    bottom: -7px;
    right: -4px;
  }
`;

export default ProfileImg;
