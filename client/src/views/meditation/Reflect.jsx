import React, { useState } from 'react';
import { Input, Typography, Button } from 'antd';
import styled from 'styled-components';

import ShadowCard from '../../components/ShadowCard';
import CenteredWrapper from '../../components/CenteredWrapper';

const MarginButton = styled(Button)`
  margin-top: 10px;
  width: 20%;
`;

const FormWrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default function Reflect({ onFinish }) {
  const [reflection, setReflection] = useState('');

  return (
    <CenteredWrapper>
      <ShadowCard title="Reflection" headStyle={{ textAlign: 'center' }}>
        <CenteredWrapper>
          <Typography.Text>
            What did you notice? Enter your thoughts here. 
          </Typography.Text>
          <br />
          <FormWrapper>
            <Input.TextArea 
              rows={4} 
              style={{ width: '100%' }} 
              placeholder="Reflect on your session" 
              onChange={(e) => setReflection(e.target.value)} 
            />
            <MarginButton onClick={() => onFinish(reflection)} type="primary">Next</MarginButton>
          </FormWrapper>
        </CenteredWrapper>
      </ShadowCard>
    </CenteredWrapper>
  );
}