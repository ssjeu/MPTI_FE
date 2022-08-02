// 커뮤니티 게시글 작성
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import imageCompression from "browser-image-compression";
import Swal from "sweetalert2";

import "../css/component.css";
import PostDropdown from "../elements/PostDropdown";
import UploadButton from "../elements/MainButton";
import UploadImage from "../images/icons/filter@3x.png";

const PostWrite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 카테고리
  const [selected, setSelected] = useState();
  const categoryList = ["MBTI", "자유", "고민상담", "익명"];

  // 게시글 내용
  const img_ref = useRef();
  const [img, setImg] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const content_ref = useRef();

  // 카테고리 선택
  const categoryDrop = (x) => {
    setSelected(x);
  };

  // 클릭 시 input file 연결
  const onClickImageUpload = () => {
    img_ref.current.click();
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

  // 이미지 업로드
  const uploadFile = async (e) => {
    const files = e.target.files;

    if (files && files[0]) {
      const originalImg = files[0];
      const compressedImg = await compressImage(originalImg);
      setImg(compressedImg);
    }

    let filePreviewURLs = [];
    let filesLength = files.length > 10 ? 10 : files.length;

    for (let i = 0; i < filesLength; i++) {
      let file = files[i];
      let reader = new FileReader();

      reader.onload = () => {
        filePreviewURLs[i] = reader.result;
        setPreviewImg([...filePreviewURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  // 프리뷰에서 이미지 삭제
  const deleteImg = (index) => {
    // const imgArr = img.filter((el, idx) => idx !== index);
    const imgNameArr = previewImg.filter((el, idx) => idx !== index);

    setImg([...imgNameArr]);
    setPreviewImg([...imgNameArr]);
  };

  // 게시글 업로드 function
  const addPost = async () => {
    if (selected === undefined || selected === "" || selected === "카테고리")
      Swal.fire("", "카테고리를 선택해주세요!", "warning");
    else if (content_ref.current.value === "")
      Swal.fire("", "내용을 입력해주세요!", "warning");
    else if (content_ref.current.value.length < 5)
      Swal.fire("", "최소 5자 이상 입력해주세요!", "warning");
    else {
      const formData = new FormData();
      formData.append("postCategory", selected);
      formData.append("postContent", content_ref.current.value);
      formData.append("postImage", img);

      dispatch(postActions.addPostAC(formData));
    }
  };

  return (
    <PostWriteWrap>
      <Notice
        onClick={() => navigate("/community/notice")}
        className="contents-container"
      >
        <span>필독!</span>커뮤니티 공지사항
      </Notice>

      <SelectWrap className="contents-container">
        <PostDropdown
          data={categoryList}
          width="88px"
          height="auto"
          parent={categoryDrop}
          children="카테고리"
        />
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
            onChange={uploadFile}
            multiple
          />
        </SelectImage>
      </SelectWrap>

      <TextArea className="contents-container">
        <textarea
          placeholder="최소 5자 이상 입력해 주세요"
          ref={content_ref}
        ></textarea>
      </TextArea>

      {previewImg && (
        <ImagePreview className="contents-container">
          {" "}
          {previewImg.map((data, index) => (
            <div key={index}>
              <img src={data} alt="preview" key={index} />
              <div onClick={() => deleteImg(index)}>x</div>
            </div>
          ))}{" "}
        </ImagePreview>
      )}

      <Upload onClick={addPost} className="contents-container">
        <UploadButton text="업로드" />
      </Upload>
    </PostWriteWrap>
  );
};

const PostWriteWrap = styled.div`
  height: calc(100% - 124.5px);
`;

const Notice = styled.div`
  background-color: var(--subcolor);
  width: 100vh;
  height: 50px;
  font-size: 14px;
  text-align: left;
  display: table-cell;
  vertical-align: middle;

  & span {
    color: var(--pointcolor);
    font-weight: bold;
    margin-right: 10px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const SelectWrap = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & :hover {
    cursor: pointer;
  }
`;

const SelectImage = styled.div`
  margin-right: -16px;

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

const TextArea = styled.div`
  margin: 20px 0;
  text-align: left;

  & textarea {
    resize: vertical;
    width: 100%;
    height: 25vh;
    // height: auto;
    border: none;
    font-size: 16px;
    font-weight: 500;
    font-family: NotoSansCJKKR;
  }

  & textarea::placeholder {
    color: var(--gray2);
  }

  & textarea:focus {
    // outline: none;
    // outline-color: var(--gray4);
  }
`;

const ImagePreview = styled.div`
  margin: 20px 0;
  padding-bottom: 20px;
  text-algin: left;
  display: flex;
  overflow: auto;
  min-height: 240px;

  & img {
    height: 160px;
    border-radius: 6px;
    margin-right: 8px;
  }
`;

const Upload = styled.div`
  width: 100%;
  height: 92px;
  //   box-shadow: 0 0 1px 0 var(--gray4);

  &:hover {
    cursor: pointer;
  }
`;

export default PostWrite;
