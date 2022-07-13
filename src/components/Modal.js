import React, { useCallback } from "react";
import styled from "styled-components";

const Modal = ({ show, onCloseModal, style, children }) => {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CreateModal onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
        {children}
      </div>
    </CreateModal>
  );
};

const CreateModal = styled.div`
  position: absolute;
  bottom: 0;
  top: 0;
  z-index: 1022;
  text-align: center;

  & > div {
    display: inline-block;
    position: relative;
    padding: 32px 24px 20px 24px;
    max-width: 200px;
    font-size: 12px;
    font-weight: 300;
    background-color: white;
    border-radius: 6px;
    --saf-0: rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);
    box-shadow: 0 0 0 1px var(--saf-0), 0 4px 12px 0 rgba(0, 0, 0, 0.12);
    user-select: none;
    z-index: 1012;
  }
`;

const CloseModalButton = styled.button`
  position: absolute;
  left: 8px;
  top: 6px;
  background: transparent;
  border: none;
  font-size: 14px;
  cursor: pointer;
`;

export default Modal;
