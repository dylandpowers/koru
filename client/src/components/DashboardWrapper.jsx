import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import TopHeader from './TopHeader';
import NavSider from './NavSider';

const PaddedLayout = styled(Layout)`
  padding: 10px;
  background-color: white;
`;

const FullSizeLayout = styled(Layout)`
  min-width: 100vw;
  min-height: 100vh;
`;

const { Footer } = Layout;

export default function DashboardWrapper({ children, pageName }) {
  return (
    <FullSizeLayout>
      <TopHeader/>
      <PaddedLayout>
        <NavSider selectedKey={pageName}/>
        <PaddedLayout>
          {children}
        </PaddedLayout>
      </PaddedLayout>
      <Footer/>
    </FullSizeLayout>
  );
}