import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { imageApi } from "../../shared/api";
import imageCompression from "browser-image-compression";

import UploadImage from "../../images/icons/filter@3x.png";

const PostImg = (props) => {
  const { margin, parent, data } = props;

  const img_ref = useRef();

  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);

  // s3 url 받아오는 api 연결 부분
  useEffect(() => {
    if (imgFile) {
      const formData = new FormData();
      formData.append("profileImages", imgFile);

      imageApi
        .userImage(formData)
        .then((res) => {
          setImgUrl((userProfileImages) => [
            ...userProfileImages,
            res.data.profileImages,
          ]);
        })
        .catch((err) => console.log(err));
    }
  }, [imgFile]);

  useEffect(() => {
    img_ref.current.value = "";
    parent(imgUrl);
  }, [imgUrl]);

  const onClickImageUpload = () => {
    img_ref.current.click();
  };

  const addFileImg = (e) => {
    setImgFile(e.target.files[0]);
  };

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

  return (
    <SelectImage onClick={onClickImageUpload}>
      <label>
        <img src={UploadImage} alt="uploadimage" />
      </label>
      <input
        type="file"
        id="image_uploads"
        name="image_uploads"
        accept=".jpg, .jpeg, .png"
        ref={img_ref}
        onChange={addFileImg}
        multiple
      />
    </SelectImage>
  );
};

const SelectImage = styled.div`
  margin-right: -16px;
  margin: ${(props) => props.margin};

  & img {
    width: 24px;
    height: 24px;
  }

  & input {
    width: 20px;
    height: 20px;
    opacity: 0%;
  }
`;

export default PostImg;
