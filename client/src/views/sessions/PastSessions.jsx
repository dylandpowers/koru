import React, { useState, useEffect } from 'react';
import { Calendar, Badge } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import DashboardWrapper from '../../components/DashboardWrapper';
import SessionDrawer from './SessionDrawer';

const List = styled.ul`
  list-style: none;
  margin: 0px;
  padding: 0px;
`;

const ConstrictedBadge = styled(Badge)`
  white-space: nowrap;
  width: 100%;
  font-size: 12px;
`;

export default function PastSessions() {
  const [sessions, setSessions] = useState({});
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState({});
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    axios.get('/sessions/all', config)
      .then((res) => {
        const docs = res.data.docs || [];
        const responseSessions = {};
        docs.forEach((doc) => {
          responseSessions[doc.date] = doc;
        });
        setSessions(responseSessions);
      })
      .catch((err) => alert(err.msg || err));
  }, [token]);

  function dateCellRender(value) {
    const sessionsToday = Object.keys(sessions)
      .filter(key => {
        const date = moment(key);
        return date.year() === value.year() &&
          date.month() === value.month() &&
          date.date() === value.date();
      })
      .reduce((obj, key) => [...obj, sessions[key]], []);
    return (
      <List>
        {sessionsToday.map((session) => (
          <li key={session.date} onClick={() => onSessionClick(session)}>
            <ConstrictedBadge 
              status="default"
              text={getSessionText(session)}
              size="small"
            />
          </li>
        ))}
      </List>
    );
  }

  function onSessionClick(session) {
    setIsDrawerVisible(true);
    setSelectedSession(session);
  }

  function getSessionText(session) {
    return `${session.lengthInMinutes}m ${session.isGuided ? 'Guided' : 'Unguided'}`;
  }

  return (
    <DashboardWrapper pageName="sessions">
      <Calendar dateCellRender={dateCellRender} />
      <SessionDrawer 
        isVisible={isDrawerVisible} 
        onClose={() => setIsDrawerVisible(false)}
        session={selectedSession} 
      />
    </DashboardWrapper>
  );
}
