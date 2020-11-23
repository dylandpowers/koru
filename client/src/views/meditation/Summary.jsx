import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from 'antd';
import styled from 'styled-components';

import ShadowCard from '../../components/ShadowCard';
import CenteredWrapper from '../../components/CenteredWrapper';

const CenterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const MarginButton = styled(Button)`
  margin-top: 10px;
`;

export default function Summary({ onRestartClick }) {
  const session = useSelector((state) => state.session);

  function getSkillsSentence() {
    const skills = session && session.skillsUsed;
    if (!skills || !skills.length) {
      return "";
    }

    const prefix = "You practiced ";

    if (skills.length === 1) {
      return prefix + skills[0] + '.';
    } else if (skills.length === 2) {
      return prefix + `${skills[0]} and ${skills[1]}.`;
    } else {
      const withoutLast = skills.slice(0, skills.length - 2);
      return prefix + withoutLast.join(", ") + ` and ${skills[skills.length - 1]}.`;
    }
  }

  return (
    <CenteredWrapper>
      <ShadowCard title="Summary">
        <Typography.Text>
          Today, you did a <b>{session.isGuided ? 'guided' : 'unguided'}</b> meditation for {session.lengthInMinutes} minutes.
          <br/>
          {getSkillsSentence()}
          <br/>
        </Typography.Text>
        <CenterDiv>
          <MarginButton onClick={onRestartClick}>Back to Home</MarginButton>
        </CenterDiv>
      </ShadowCard>
    </CenteredWrapper>
  );
}