import React from 'react';
import styled from 'styled-components';
import '../css/component.css';
import logo from '../images/logo@2x.png';

const Header = (props) => {
  const { margin } = props;

  return (
    <>
      <Logo className='logo' src={logo} alt='' margin={margin} />
    </>
  );
};

const Logo = styled.img`
  margin: ${(props) => props.margin};
`;

export default Header;