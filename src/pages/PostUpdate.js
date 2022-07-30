// 커뮤니티 게시글 작성
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";
import Swal from "sweetalert2";

import "../css/component.css";
import PostImg from "../components/community/PostImg";
import PostDropdown from "../elements/PostDropdown";
import UploadButton from "../elements/MainButton";

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
  const content_ref = useRef();
  const [img, setImg] = useState();
  const [previewImg, setPreviewImg] = useState([]);

  // 서버에서 받아오는 유저 프로필 이미지
  const [serverImg, setServerImg] = useState();

  useEffect(() => {
    dispatch(postActions.detailPostDB(id));
  }, []);

  useEffect(() => {
    if (post) {
      setServerImg(post.posts.postImage);
      setImg(post.posts.postImage);
      setPreviewImg(post.posts.postImage);
    }
  }, [post]);

  // 카테고리 선택
  const categoryDrop = (x) => {
    setSelected(x);
  };

  // PostImg.js에서 이미지 데이터 받아오기
  const getImgUrl = (x) => {
    setImg(x);
    setPreviewImg(x);
  };

  // 프리뷰에서 이미지 삭제
  const deleteImg = (index) => {
    const imgNameArr = previewImg.filter((el, idx) => idx !== index);

    setImg([...imgNameArr]);
    setPreviewImg([...imgNameArr]);
  };

  // 게시글 수정 function
  const addPost = async () => {
    if (selected === undefined || selected === "" || selected === "카테고리")
      Swal.fire("", "카테고리를 선택해주세요!", "warning");
    else if (content_ref.current.value === "")
      Swal.fire("", "내용을 입력해주세요!", "warning");
    else if (content_ref.current.value.length < 5)
      Swal.fire("", "최소 5자 이상 입력해주세요!", "warning");
    else {
      dispatch(
        //   console.log(id, selected, content_ref.current.value, [previewImg]);
        postActions.updatePostAC(id, selected, content_ref.current.value, previewImg)
      );
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
        <PostImg parent={getImgUrl} data={serverImg}/>
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

      <ButtonWrap onClick={addPost} className="contents-container">
        <UploadButton text="수정하기" />
      </ButtonWrap>
    </PostWriteWrap>
  );
};

const PostWriteWrap = styled.div`
  height: auto;
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
  text-algin: left;
  display: flex;
  overflow: auto;
  min-height: 180px;

  & img {
    height: 160px;
    border-radius: 6px;
    margin-right: 8px;
  }
`;

const ButtonWrap = styled.div`
  padding-bottom: 100px;
`;

export default PostUpdate;
