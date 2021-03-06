import React, { useState, useEffect } from 'react';
import { Steps, Button } from 'antd';
import { RollbackOutlined, StopOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import DashboardWrapper from '../../components/DashboardWrapper';
import StartPractice from './StartPractice';
import Gratitudes from './Gratitudes.jsx';
import { 
  startSession,
  setSessionStep,
  addGratitudes,
  addIsGuided, 
  addLengthInMinutes, 
  addReflection, 
  addSkillsUsed, 
  addMindfulAction,
  endSession
} from '../../redux/session';
import ChooseMeditation from './choose/ChooseMeditation';
import MeditationTimer from './MeditationTimer';
import Reflect from './Reflect';
import Skills from './Skills';
import Summary from './Summary';

const { Step } = Steps;

const BackButton = styled(Button)`
  margin-left: 10px;
  width: 100%;
`;

const StopButton = styled(Button)`
  margin: 10px 0 0 10px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  width: 130px;
`;

/**
 * The meditation page which contains the entire meditation flow for performing a meditation.
 */
export default function MeditationPage() {
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const session = useSelector((state) => state.session);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (session.isActive) {
      setStep(session.step);
    }
  }, [session.isActive, session.step]);

  /**
   * Updates the step by both setting the state and updating the global store.
   * 
   * @param {number} newStep the step to set
   */
  function updateStep(newStep) {
    dispatch(setSessionStep(newStep));
    setStep(newStep);
  }

  function onMeditationStart() {
    dispatch(startSession());
    updateStep(1);
  }

  function onGratitudeFinish(values) {
    const { isPublicGratitudes } = values;
    delete values.isPublicGratitudes;
    dispatch(addGratitudes(Object.values(values), isPublicGratitudes));
    updateStep(2);
  }

  function onChooseFinish(values) {
    const isGuided = values.isGuided || false;
    dispatch(addIsGuided(isGuided));
    dispatch(addLengthInMinutes(values.lengthInMinutes));
    updateStep(3);
  }

  function onReflectFinish(reflection) {
    dispatch(addReflection(reflection));
    updateStep(5);
  }

  function onSkillsFinish(skillsUsed, mindfulAction) {
    dispatch(addSkillsUsed(skillsUsed));
    dispatch(addMindfulAction(mindfulAction));
    
    const submitSession = Object.assign({}, session);
    submitSession.skillsUsed = skillsUsed;
    submitSession.mindfulAction = mindfulAction;

    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    axios.post('/sessions/add', submitSession, config)
      .then(() => updateStep(6))
      .catch((err) => alert(err));
  }

  /**
   * End the current session and return to the beginning. Note that this may be called 
   * regardless of the step that the user is on, and it will end the session and clear 
   * any existing data.
   */
  function restartSession() {
    dispatch(endSession());
    setStep(0);
  }

  const steps = [
    {
      title: 'Start Practice',
      content: <StartPractice onClick={onMeditationStart} />
    },
    {
      title: 'Gratitudes',
      content: <Gratitudes onFinish={onGratitudeFinish} />
    },
    {
      title: 'Choose your meditation',
      content: <ChooseMeditation onFinish={onChooseFinish} />
    },
    {
      title: 'Meditate',
      content: <MeditationTimer onFinish={() => updateStep(4)} />
    },
    {
      title: 'Reflect',
      content: <Reflect onFinish={onReflectFinish} />
    },
    {
      title: 'Skills Used',
      content: <Skills onFinish={onSkillsFinish} />
    },
    {
      title: 'Summary',
      content: <Summary onRestartClick={restartSession} />
    }
  ];

  return (
    <DashboardWrapper pageName="meditation">
      <Steps progressDot current={step} size="small">
        {steps.map((item) => <Step key={item.title} title={item.title} />)}
      </Steps>
      {steps[step].content}
      <ButtonWrapper>
        {step > 0 ? (
          <BackButton onClick={() => updateStep(step - 1)}>
            <RollbackOutlined />
            Back
          </BackButton>
          ) : null}
        {step > 0 && step < steps.length - 1 ? (
          <StopButton onClick={() => restartSession()}>
            <StopOutlined />
            End Session
          </StopButton>
        ) : null}
      </ButtonWrapper>
    </DashboardWrapper>
  );
}