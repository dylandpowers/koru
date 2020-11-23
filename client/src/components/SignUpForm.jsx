import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Typography } from 'antd';
import styled from 'styled-components';

import { registerUser } from '../redux/auth';

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
  height: 65vh;
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export default function SignUpForm() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

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
    values.name = `${values.firstName} ${values.lastName}`;
    delete values.firstName;
    delete values.lastName;
    dispatch(registerUser(values));
  }

  return (
    <Wrapper>
      <Title>Sign Up</Title>
      <ConstrainedForm {...layout} name="signup" onFinish={onFinish}>
        <Form.Item 
          label="First Name" 
          name="firstName" 
          rules={[
            {
              required: true,
              message: 'First Name'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item 
          label="Last Name" 
          name="lastName" 
          rules={[
            {
              required: true,
              message: 'Last Name'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item 
          label="Email" 
          name="email" 
          rules={[
            {
              required: true,
              message: 'Email'
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
              message: 'Enter a password'
            }
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item 
          label="Confirm Password" 
          name="confirmPassword" 
          rules={[
            {
              required: true,
              message: 'Confirm your password'
            }
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Typography.Text type="danger">{auth.errorMessage}</Typography.Text>
        </Form.Item>
      </ConstrainedForm>
    </Wrapper>
  );
}