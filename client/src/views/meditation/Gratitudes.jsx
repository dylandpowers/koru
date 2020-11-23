import React from 'react';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import CenteredWrapper from '../../components/CenteredWrapper';

const ShadowCard = styled(Card)`
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  width: 50%;
`;

const ConstrainedForm = styled(Form)`
  width: 30vw;
  min-width: 30vw;
`;

export default function Gratitudes({ onFinish }) {
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  return (
    <CenteredWrapper>
      <ShadowCard title="Gratitudes" headStyle={{ textAlign: 'center' }}>
        <ConstrainedForm {...layout} title="gratitudes" onFinish={onFinish} initialValues={{ isPublicGratitudes: true }}>
          <Form.Item
            label="1"
            name="gratitude1"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="2"
            name="gratitude2"
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout} name="isPublicGratitudes" valuePropName="checked">
            <Checkbox defaultChecked={true}>Share to Gratitude River</Checkbox>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Next
            </Button>
        </Form.Item>
        </ConstrainedForm>
      </ShadowCard>
    </CenteredWrapper>
  );
}