import React, { useState } from 'react';
import styled from 'styled-components';

import CenteredWrapper from '../../../components/CenteredWrapper';
import Guided from './Guided';
import Unguided from './Unguided';
import ShadowCard from '../../../components/ShadowCard';

const TallShadowCard = styled(ShadowCard)`
  height: 40vh;
`;

const GUIDED_TAB = 'Guided';
const UNGUIDED_TAB = 'Unguided';

export default function ChooseMeditation({ onFinish }) {
  const [activeTab, setActiveTab] = useState(UNGUIDED_TAB);

  const tabs = [
    {
      key: GUIDED_TAB,
      tab: GUIDED_TAB
    },
    {
      key: UNGUIDED_TAB,
      tab: UNGUIDED_TAB
    }
  ];

  const tabContent = {
    [GUIDED_TAB]: <Guided />,
    [UNGUIDED_TAB]: <Unguided onFinish={onFinish}/>
  }

  return (
    <CenteredWrapper>
      <TallShadowCard 
        title="Choose Meditation"
        tabList={tabs}
        activeTabKey={activeTab}
        onTabChange={(key) => setActiveTab(key)}
      >
        {tabContent[activeTab]}
      </TallShadowCard>
    </CenteredWrapper>
  );
}