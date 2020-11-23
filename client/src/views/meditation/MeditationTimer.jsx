import React from 'react';
import { useSelector } from 'react-redux';
import { Typography } from 'antd';
import Countdown, { zeroPad } from 'react-countdown';
import styled from 'styled-components';
import moment from 'moment';

import PausePlayIcon from '../../assets/pause_play.png';
import Bowl from '../../assets/bowl.mp3';
import CenteredWrapper from '../../components/CenteredWrapper';
import ShadowCard from '../../components/ShadowCard';
import { useEffect } from 'react';

const CenterShadowCard = styled(ShadowCard)`
  text-align: center;
  padding: 10px;
`;

const CountdownText = styled(Typography.Text)`
  font-size: 36px;
`;

const PauseIcon = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

/**
 * Meditation timer component which plays a pausable timer and plays a sound out loud
 * to indicate the beginning and end of the meditation.
 */
export default function MeditationTimer({ onFinish }) {
  const lengthInMinutes = useSelector((state) => state.session.lengthInMinutes);
  let countdownRef;
  var isPaused = false;
  const audio = new Audio(Bowl);

  // play the bowl sound when we first navigate to this page
  useEffect(() => {
    audio.play();
  }, []);

  function renderer({ minutes, seconds }) {
    return (
      <CountdownText>{zeroPad(minutes)}:{zeroPad(seconds)}</CountdownText>
    );
  }

  function onButtonClick() {
    if (isPaused) {
      countdownRef.start();
    } else {
      countdownRef.pause();
    }
    isPaused = !isPaused;
  }

  /**
   * Called when the timer is complete. We should play the bowl sound again.
   */
  function onComplete() {
    audio.play();
    onFinish();
  }

  return (
    <CenteredWrapper>
      <CenterShadowCard title="Meditate">
        <Countdown
          ref={(ref) => { countdownRef = ref; }}
          date={moment(new Date()).add(lengthInMinutes, 'm').toDate()}
          renderer={renderer}
          onComplete={onComplete}
        />
        <br />
        <PauseIcon src={PausePlayIcon} alt="Pause/Play Icon" onClick={onButtonClick} />
      </CenterShadowCard>
    </CenteredWrapper>
  );
}