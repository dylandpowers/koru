import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Logout from './Logout';

const Header = styled(Layout.Header)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 30px;
  color: rgba(0, 0, 0, 0.65);
`;

const RightAlignedDiv = styled.div`
  position: absolute;
  right: 10px;
`;

export default function TopHeader() {
  return (
    <Header>
      <Title>Koru Meditation</Title>
      <RightAlignedDiv>
        <Logout/>
      </RightAlignedDiv>
    </Header>
  );
}