import React from 'react';
import { Card, Form, Input, Checkbox, Button } from 'antd';
import styled from 'styled-components';

import CenteredWrapper from '../../components/CenteredWrapper';

const ShadowCard = styled(Card)`
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.2);
  min-width: 600px;
  max-height: 400px;
`;

const FormWrapper = styled.div`
`;

export default function Gratitudes({ onFinish }) {
  const layout = {
    labelCol: {
      span: 4
    },
    wrapperCol: {
      span: 16
    }
  };

  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 16
    }
  };

  return (
    <CenteredWrapper>
      <ShadowCard title="Gratitudes" headStyle={{ textAlign: 'center' }}>
        <FormWrapper>
          <Form {...layout} title="gratitudes" onFinish={onFinish} initialValues={{ isPublicGratitudes: true }}>
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
          </Form>
        </FormWrapper>
      </ShadowCard>
    </CenteredWrapper>
  );
}