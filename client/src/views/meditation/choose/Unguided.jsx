import React, { useState } from 'react';
import { Select, Button } from 'antd';
import styled from 'styled-components';

import CenteredWrapper from '../../../components/CenteredWrapper';

const MarginButton = styled(Button)`
  margin-top: 10px;
  width: 30%;
`;

const FormWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const { Option } = Select;

export default function Unguided({ onFinish }) {
  const [lengthInMinutes, setLengthInMinutes] = useState(3);

  function onClick() {
    onFinish({ lengthInMinutes });
  }

  return (
    <CenteredWrapper>
      <FormWrapper>
        <Select defaultValue="3" onChange={setLengthInMinutes} style={{ width: '100%' }}>
          <Option value="3">3</Option>
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="15">15</Option>
          <Option value="20">20</Option>
          <Option value="25">25</Option>
          <Option value="30">30</Option>
          <Option value="40">40</Option>
          <Option value="45">45</Option>
          <Option value="50">50</Option>
          <Option value="60">60</Option>
        </Select>
        <MarginButton type="primary" onClick={onClick}>
          Start
        </MarginButton>
      </FormWrapper>
    </CenteredWrapper>
  );
}