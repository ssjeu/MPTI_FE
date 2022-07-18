import React, { useRef } from 'react';
import styled from 'styled-components';

import AddImgBtn from '../../elements/AddImgBtn';

const ProfileImg = (props) => {
  const { margin, parent, data } = props;

  const imageInput = useRef();

  //! 서버에 보낼 이미지 데이터
  const [fileImage, setFileImage] = React.useState([]);
  console.log(fileImage);

  //! 미리보기 이미지 데이터
  const [preImage, setPreImage] = React.useState([]);
  console.log(preImage);

  // 이미지 추가 버튼 누를 시, input 연결 부분
  const imageUpload = () => {
    imageInput.current?.click();
  };

  const addFileImage = (e) => {
    setPreImage((preImage) => [
      ...preImage,
      URL.createObjectURL(e.target.files[0]),
    ]);
    setFileImage((fileImage) => [...fileImage, e.target.files[0]]);
  };

  React.useEffect(() => {
    imageInput.current.value = '';
    parent(fileImage);
  }, [fileImage]);

  React.useEffect(() => {
    if (data) {
      setFileImage(data);
      setPreImage(data);
      console.log(data);
    }
  }, [data]);

  return (
    <>
      <ProfileArea margin={margin}>
        <div style={{ backgroundImage: preImage && `url(${preImage[0]})` }}>
          <AddImgBtn
            _onClick={
              preImage[0] === undefined
                ? imageUpload
                : () => {
                    setFileImage(fileImage.filter((e) => e !== fileImage[0]));
                    setPreImage(preImage.filter((e) => e !== preImage[0]));
                  }
            }
            state={preImage[0]}
          />
        </div>

        <div style={{ backgroundImage: preImage && `url(${preImage[1]})` }}>
          <AddImgBtn
            _onClick={
              preImage[1] === undefined
                ? imageUpload
                : () => {
                    setFileImage(fileImage.filter((e) => e !== fileImage[1]));
                    setPreImage(preImage.filter((e) => e !== preImage[1]));
                  }
            }
            state={preImage[1]}
          />
        </div>

        <div style={{ backgroundImage: preImage && `url(${preImage[2]})` }}>
          <AddImgBtn
            _onClick={
              preImage[2] === undefined
                ? imageUpload
                : () => {
                    setFileImage(fileImage.filter((e) => e !== fileImage[2]));
                    setPreImage(preImage.filter((e) => e !== preImage[2]));
                  }
            }
            state={preImage[2]}
          />
        </div>

        <div style={{ backgroundImage: preImage && `url(${preImage[3]})` }}>
          <AddImgBtn
            _onClick={
              preImage[3] === undefined
                ? imageUpload
                : () => {
                    setFileImage(fileImage.filter((e) => e !== fileImage[3]));
                    setPreImage(preImage.filter((e) => e !== preImage[3]));
                  }
            }
            state={preImage[3]}
          />
        </div>

        <div style={{ backgroundImage: preImage && `url(${preImage[4]})` }}>
          <AddImgBtn
            _onClick={
              preImage[4] === undefined
                ? imageUpload
                : () => {
                    setFileImage(fileImage.filter((e) => e !== fileImage[4]));
                    setPreImage(preImage.filter((e) => e !== preImage[4]));
                  }
            }
            state={preImage[4]}
          />
        </div>

        <div style={{ backgroundImage: preImage && `url(${preImage[5]})` }}>
          <AddImgBtn
            _onClick={
              preImage[5] === undefined
                ? imageUpload
                : () => {
                    setFileImage(fileImage.filter((e) => e !== fileImage[5]));
                    setPreImage(preImage.filter((e) => e !== preImage[5]));
                  }
            }
            state={preImage[5]}
          />
        </div>
      </ProfileArea>

      <input
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
        ref={imageInput}
        onChange={addFileImage}
        // multiple
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
