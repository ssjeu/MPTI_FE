import React from 'react';
import styled from 'styled-components';

import AddImg from '../../elements/AddImg';

const ProfileImg = (props) => {
  const { margin } = props;

  return (
    <>
      <ProfileArea margin={margin}>
        <div>
          <AddImg />
        </div>

        <div>
          <AddImg />
        </div>

        <div>
          <AddImg />
        </div>

        <div>
          <AddImg />
        </div>

        <div>
          <AddImg />
        </div>

        <div>
          <AddImg />
        </div>
      </ProfileArea>
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
  }

  & > div > * {
    position: absolute;
    bottom: -7px;
    right: -4px;
  }
`;

export default ProfileImg;
