import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { List, Typography } from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';

import './GratitudeRiver.css';
import DashboardWrapper from '../../components/DashboardWrapper';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
`;

export default function GratitudeRiver() {
  const [gratitudes, setGratitudes] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`
      }
    };

    axios.get('/gratitudes/all', config)
      .then((res) => {
        setGratitudes(res.data.gratitudes);
      })
      .catch((err) => alert(err.data.msg || err));
  }, [token]);

  return (
    <DashboardWrapper pageName="gratitudes">
      <Wrapper>
        <div className="marquee">
          <List
            dataSource={gratitudes}
            renderItem={(item) => (
              <List.Item>
                <Typography.Text style={{ fontSize: '28px' }}>{item}</Typography.Text>
              </List.Item>
            )}
          />
        </div>
      </Wrapper>
    </DashboardWrapper>
  );
}