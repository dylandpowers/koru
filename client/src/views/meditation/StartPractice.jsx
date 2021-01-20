import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import CenteredWrapper from '../../components/CenteredWrapper';

const CenteredButton = styled(Button)`
  max-width: 400px;
  overflow-x: ellipsis;
`;

export default function StartPractice({ onClick }) {
  return (
    <CenteredWrapper>
      <CenteredButton onClick={onClick} type="primary">
        <PlusCircleOutlined /> Start Practice
      </CenteredButton>
    </CenteredWrapper>
  );
}