import React from 'react';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import TopHeader from '../../components/TopHeader';
import SignUpForm from '../../components/SignUpForm';

const CenteredLayout = styled(Layout)`
  display: flex;
  flex-direction: row;
  padding: 10px;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

export default function SignupPage() {
  const auth = useSelector((state) => state.auth);

  if (auth && auth.id) {
    return <Redirect to="/meditate" />
  }

  return (
    <Layout>
      <TopHeader />
      <CenteredLayout>
        <SignUpForm />
      </CenteredLayout>
    </Layout>
  );
}