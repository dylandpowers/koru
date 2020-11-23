import React from 'react';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';

import history from '../util/history';

const Sider = styled(Layout.Sider)`
  height: 100%;
  overflow: hidden;
`;

export default function NavSider({ selectedKey }) {
  function onClick(key) {
    if (selectedKey !== key) {
      history.push(`/${key}`);
    }
  }

  return (
    <Sider width={240} theme="light">
      <Menu theme="light" defaultSelectedKeys={[selectedKey]}>
        <Menu.Item key="meditation" onClick={() => onClick('meditation')}>
          Meditation
        </Menu.Item>
        <Menu.Item key="sessions" onClick={() => onClick('sessions')}>
          Sessions
        </Menu.Item>
        <Menu.Item key="gratitudes" onClick={() => onClick('gratitudes')}>
          Gratitude River
        </Menu.Item>
      </Menu>
    </Sider>
  );
}