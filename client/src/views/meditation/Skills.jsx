import React, { useState } from 'react';
import { Tag, Divider, Input, Button } from 'antd';
import styled from 'styled-components';

import allSkills from '../../assets/allSkills';
import CenteredWrapper from '../../components/CenteredWrapper';
import ShadowCard from '../../components/ShadowCard';

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const MarginButton = styled(Button)`
  margin-top: 10px;
`;

const { CheckableTag } = Tag;

export default function Skills({ onFinish }) {
  const [skills, setSkills] = useState([]);
  const [mindfulAction, setMindfulAction] = useState('');

  function onClick(checked, skill) {
    const nextSkills = checked ? [...skills, skill] : skills.filter(s => s !== skill);
    setSkills(nextSkills);
  }

  return (
    <CenteredWrapper>
      <ShadowCard title="Skills and Mindfulness" headStyle={{ textAlign: 'center' }}>
        {allSkills.map((skill) => (
          <CheckableTag
            key={skill}
            checked={skills.indexOf(skill) > -1}
            onChange={checked => onClick(checked, skill)}
          >
            {skill}
          </CheckableTag>
        ))}
        <Divider />
        <Input 
          placeholder="Today I will mindfully..."
          onChange={(e) => setMindfulAction(e.target.value)} />
        <ButtonWrapper>
          <MarginButton type="primary" onClick={() => onFinish(skills, mindfulAction)}>Finish</MarginButton>
        </ButtonWrapper>
      </ShadowCard>
    </CenteredWrapper>
  );
}