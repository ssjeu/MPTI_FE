import React, { useEffect, useState } from "react";
import styled from "styled-components";

//element
import Button03 from "../elements/Button03";

const MbtiFilterSelect = (props) => {
  const { parent } = props;

  const [ei, setEi] = useState([0, 0]);
  const [sn, setSn] = useState([0, 0]);
  const [tf, setTf] = useState([0, 0]);
  const [jp, setJp] = useState([0, 0]);

  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");

  const user_mbti = first + second + third + fourth;

  useEffect(() => {
    parent(user_mbti);
  }, [first, second, third, fourth]);

  return (
    <Buttons>
      <BtnWrap>
        <Button03
          state={ei[0]}
          _onClick={() => {
            if (ei[0] === 0) {
              setEi([1, 0]);
              setFirst("E");
            } else {
              setEi([0, 0]);
              setFirst("");
            }
          }}
          margin="0 20px 20px 0"
        >
          E (외향)
        </Button03>
        <Button03
          state={ei[1]}
          _onClick={() => {
            if (ei[1] === 0) {
              setEi([0, 1]);
              setFirst("I");
            } else {
              setEi([0, 0]);
              setFirst("");
            }
          }}
          margin="0 0 20px 0"
        >
          I (내향)
        </Button03>
      </BtnWrap>

      <BtnWrap>
        <Button03
          state={sn[0]}
          _onClick={() => {
            if (sn[0] === 0) {
              setSn([1, 0]);
              setSecond("S");
            } else {
              setSn([0, 0]);
              setSecond("");
            }
          }}
          margin="0 20px 20px 0"
        >
          S (감각)
        </Button03>
        <Button03
          state={sn[1]}
          _onClick={() => {
            if (sn[1] === 0) {
              setSn([0, 1]);
              setSecond("N");
            } else {
              setSn([0, 0]);
              setSecond("");
            }
          }}
          margin="0 0 20px 0"
        >
          N (직관)
        </Button03>
      </BtnWrap>

      <BtnWrap>
        <Button03
          state={tf[0]}
          _onClick={() => {
            if (tf[0] === 0) {
              setTf([1, 0]);
              setThird("T");
            } else {
              setTf([0, 0]);
              setThird("");
            }
          }}
          margin="0 20px 20px 0"
        >
          T (사고)
        </Button03>
        <Button03
          state={tf[1]}
          _onClick={() => {
            if (tf[1] === 0) {
              setTf([0, 1]);
              setThird("F");
            } else {
              setTf([0, 0]);
              setThird("");
            }
          }}
          margin="0 0 20px 0"
        >
          F (감정)
        </Button03>
      </BtnWrap>

      <BtnWrap>
        <Button03
          state={jp[0]}
          _onClick={() => {
            if (jp[0] === 0) {
              setJp([1, 0]);
              setFourth("J");
            } else {
              setJp([0, 0]);
              setFourth("");
            }
          }}
          margin="0 20px 20px 0"
        >
          J (판단)
        </Button03>
        <Button03
          state={jp[1]}
          _onClick={() => {
            if (jp[1] === 0) {
              setJp([0, 1]);
              setFourth("P");
            } else {
              setJp([0, 0]);
              setFourth("");
            }
          }}
          margin="0 0 20px 0"
        >
          P (인식)
        </Button03>
      </BtnWrap>
    </Buttons>
  );
};

const Buttons = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default MbtiFilterSelect;