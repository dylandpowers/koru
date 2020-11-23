import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import styled from 'styled-components';

import TopHeader from '../../components/TopHeader';
import LoginForm from '../../components/LoginForm';

const CenteredLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

export default function LoginPage() {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.id) {
    return <Redirect to="/meditate" />
  }

  return (
    <Layout>
      <TopHeader />
      <CenteredLayout>
        <LoginForm />
      </CenteredLayout>
    </Layout>
  )
}