// 커뮤니티 게시글 작성
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import uuid from "react-uuid";
import imageCompression from "browser-image-compression";

import "../css/component.css";
import PostDropdown from "../elements/PostDropdown";
import UploadButton from "../elements/MainButton";
import UploadImage from "../images/icons/filter@3x.png";

const PostUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const id = params.index;
  const post = useSelector((state) => state.post.detail_post);

  // 카테고리
  const [selected, setSelected] = useState();
  const categoryList = ["MBTI", "자유", "고민상담", "익명"];

  // 게시글 내용
  const img_ref = useRef();
  const content_ref = useRef();
  const [img, setImg] = useState();
  const [previewImg, setPreviewImg] = useState([]);

  useEffect(() => {
    dispatch(postActions.detailPostDB(id));
  }, []);

  // 카테고리 선택
  const categoryDrop = (x) => {
    setSelected(x);
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
    const imgNameArr = previewImg.filter((el, idx) => idx !== index);
    setPreviewImg([...imgNameArr]);
  };

  // 게시글 수정 function
  const addPost = async () => {
    if (selected === undefined) alert("카테고리를 선택해주세요!");
    else if (content_ref.current.value === "") alert("내용을 입력해주세요!");
    else if (content_ref.current.value.length < 5)
      alert("최소 5자 이상 입력해주세요!");
    else {
      const formData = new FormData();
      formData.append("postCategory", selected);
      formData.append("postContent", content_ref.current.value);
      formData.append("postImage", img);

      dispatch(postActions.updatePostAC(id, formData));
    }
  };

  return (
    <PostWriteWrap>
      <Notice
        onClick={() => navigate("/community/notice")}
        className="contents-container"
      >
        <span>필독!</span>커뮤니티 이용 규칙
      </Notice>

      <SelectWrap className="contents-container">
        <PostDropdown
          data={categoryList}
          width="88px"
          height="auto"
          parent={categoryDrop}
          children={post.posts.postCategory}
        />
        <SelectImage>
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
          defaultValue={post.posts.postContent}
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

      <div onClick={addPost} className="contents-container">
        <UploadButton text="수정하기" />
      </div>
    </PostWriteWrap>
  );
};

const PostWriteWrap = styled.div`
  height: 100%;
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
`;

const SelectWrap = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    border: none;
    font-size: 16px;
    font-weight: 500;
    font-family: NotoSansCJKKR;
  }

  & textarea::placeholder {
    color: var(--gray2);
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

export default PostUpdate;
