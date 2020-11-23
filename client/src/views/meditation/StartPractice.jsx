import React from 'react';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import CenteredWrapper from '../../components/CenteredWrapper';

const CenteredButton = styled(Button)`
  width: 50%;
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