import React, { useContext } from 'react';
import UserContext from './Contexts';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Space } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';


const Logins: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    axios.post('http://localhost:3001/base', { email: values.email, password: values.password })
      .then(response => {
        const data = response.data;
        console.log(data);
        
        if(data?.data?.code?.code === 1) {
          message.success('Login successful!');
          context?.login(data?.data?.code?.username);
          navigate('/');
        } else {
          message.error('Invalid email or password');
        }
      })
      .catch(error => {
        message.error('Something wrong with the server!');
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          <Link to={'/register'}>注册</Link>
        </Space>
      </Form.Item>
    </Form>
    </div>
    
  );
};

export default Logins;