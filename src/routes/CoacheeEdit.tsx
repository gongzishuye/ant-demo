import React, { useContext } from 'react';
import type { FormInstance } from 'antd';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import axios from 'axios';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserContext, { HOST } from './Contexts';

const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = React.useState(false);

  // Watch all values
  const values = Form.useWatch([], form);

  React.useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};

const CoachEditCore: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    axios.post(`${HOST}/base/ecoachee`, 
      { name: values.name, 
        desc: values.desc,
        intro: values.intro,
        contact: values.contact
      }
    )
      .then(response => {
        const data = response.data;
        console.log(data);
        
        if(data?.data?.code === 1) {
          message.success('Login successful!');
          navigate('/coachee');
        } else {
          message.error('Something wrong with server.');
        }
      })
      .catch(error => {
        message.error('Something wrong with the server!');
      });
  };
  
  return (
    <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
      <Form.Item name="name" label="姓名" initialValue={context?.username} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="desc" label="问题描述" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="intro" label="自我介绍" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="contact" label="联系方式" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form} />
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

const CoacheeEdit: React.FC = () => {
  return (
    <Row justify="center">
      <Col span={16}>
        <CoachEditCore />
      </Col> 
    </Row>
  )
};

export default CoacheeEdit;