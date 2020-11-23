import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography } from 'antd';
import styled from 'styled-components';
import { loginUser, clearError } from '../redux/auth';
import { useEffect } from 'react';

const Title = styled(Typography.Title)`
  padding-top: 10px;
  align-self: center;
`;

const ConstrainedForm = styled(Form)`
  width: 30vw;
  min-width: 30vw;
  padding: 10px;
`;

const Wrapper = styled.div`
  min-width: 40vw;
  height: 42vh;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const PaddedLink = styled(Typography.Link)`
  margin-top: 25px;
  align-self: center;
`;

/**
 * The main login form for logging a user in. Will also point the user
 * to a sign-up page if they need to create an account.
 * 
 * @author Dylan Powers
 */
export default function LoginForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  /**
   * Because we store the error messages in global state and the auth state
   * is persisted, we need to clear out the error messages on refresh. 
   */
  useEffect(() => {
    dispatch(clearError());
  }, []);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  }

  const onFinish = (values) => {
    const { email, password } = values;
    dispatch(loginUser({ email, password }));
  }

  return (
    <Wrapper>
      <Title>Sign In</Title>
      <ConstrainedForm {...layout} name="login" onFinish={onFinish}>
        <Form.Item 
          label="Email" 
          name="email" 
          rules={[
            {
              required: true,
              message: 'Please enter an email'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item 
          label="Password" 
          name="password" 
          rules={[
            {
              required: true,
              message: 'Please enter a password'
            }
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Typography.Text type="danger">{auth.errorMessage}</Typography.Text>
        </Form.Item>
      </ConstrainedForm>
      <PaddedLink href="/signup">New here? Sign Up</PaddedLink> 
    </Wrapper>
  );
}