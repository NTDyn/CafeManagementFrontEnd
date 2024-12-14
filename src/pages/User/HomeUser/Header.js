import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #f8f9fa;
  padding: 10px 0;
  text-align: center;
  font-size: 16px;
  color: #333;


`;

const Header = () => {
  return (
    <HeaderContainer>
      Chào mừng bạn đến với Coffee House !
    </HeaderContainer>
  );
};

export default Header;
