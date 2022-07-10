// 커뮤니티 게시글 작성
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

import UploadImage from "../images/filter@3x.png";
import CategoryDown from "../images/expand-more@3x.png";

const PostWrite = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 카테고리 선택
  const [selected, setSelected] = useState();
  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  // 게시글 내용란 data
  const img_ref = React.useRef();
  const content_ref = React.useRef();
  const [img, setImg] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);

  // 이미지 업로드
  const uploadFile = (e) => {
    setImg(e.target.files[0]);
    const fileArr = e.target.files;
    let filePreviewURLs = [];
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      let file = fileArr[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        filePreviewURLs[i] = reader.result;
        setPreviewImg([...filePreviewURLs]);
      };
    }
  };

  // 프리뷰에서 이미지 삭제
  const deleteImg = (index) => {
    // const imgArr = img.filter((el, idx) => idx !== index);
    const imgNameArr = previewImg.filter((el, idx) => idx !== index);

    // setImg([...imgArr]);
    setPreviewImg([...imgNameArr]);
  };

  // 게시글 업로드 function
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

      dispatch(postActions.addPostAC(formData));
    }
  };

  return (
    <PostWriteWrap>
      <Notice>
        <span>필독!</span>커뮤니티 이용 규칙
      </Notice>

      <SelectWrap>
        {/* <SelectCategory>
          카테고리
          <img src={CategoryDown} alt="categorydown" />
        </SelectCategory> */}
        <Select onChange={handleSelect} name="category">
          <option value="">카테고리</option>
          <option value="MBTI">MBTI</option>
          <option value="자유">자유</option>
          <option value="고민상담">고민상담</option>
          <option value="익명">익명</option>
        </Select>

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

      <TextArea>
        <textarea
          placeholder="최소 5자 이상 입력해 주세요"
          ref={content_ref}
        ></textarea>
      </TextArea>

      {/* 이미지 프리뷰 */}
      {previewImg && (
        <ImagePreview>
          {" "}
          {previewImg.map((data, index) => (
            <div key={index}>
              <img src={data} alt="preview" key={index} />
              <div onClick={() => deleteImg(index)}>x</div>
            </div>
          ))}{" "}
        </ImagePreview>
      )}

      <UploadButton onClick={addPost}>업로드</UploadButton>
    </PostWriteWrap>
  );
};

const PostWriteWrap = styled.div``;

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
    margin-left: 20px;
    margin-right: 10px;
  }
`;

const SelectWrap = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectCategory = styled.div`
  background-color: var(--maincolor);
  width: 88px;
  height: 28px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;

  & img {
    width: 16px;
    margin-left: 4px;
  }
`;

const Select = styled.select`
  background-color: var(--maincolor);
  width: 88px;
  height: 28px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 4px;
  border: none;
  &: focus {
    border: none;
  }
`;

const SelectImage = styled.div`
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
  margin: 20px;
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
  margin: 20px;
  padding-bottom: 20px;
  text-algin: left;
  display: flex;
  overflow: auto;

  & img {
    height: 160px;
    border-radius: 6px;
    margin-right: 8px;
  }
`;

const UploadButton = styled.div`
  background-color: var(--maincolor);
  border-radius: 26px;
  color: white;
  font-size: 16px;
  margin: 20px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default PostWrite;
