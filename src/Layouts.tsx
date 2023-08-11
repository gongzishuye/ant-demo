import React, { ReactNode, useState, useContext } from 'react';
import { Breadcrumb, Layout, Menu, theme, Row, Col } from 'antd';
import Logins from './routes/Login';
import { Link, useLocation } from "react-router-dom";
import UserContext from './routes/Contexts';

const { Header, Content, Footer } = Layout;

interface LayoutProps {
  children: ReactNode;
}

const contentStyle = {
  flex: 1, // Let Content take available space
  padding: '1rem',
};

const Layouts: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const context = useContext(UserContext);
  console.log(context);
  
  return (
    <Layout className="layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {
        // I want the Header contains two parts, one in the left is the menu, the other
        // in the right is the login in button, show me the code.
      }
      <Header>
        <Row>
          <Col span={12}>
            <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
              <Menu.Item key="/">
                <Link to="/">教练资源</Link>
              </Menu.Item>
              <Menu.Item key="/coachee">
                <Link to="/coachee">客户资源</Link>
              </Menu.Item>
              <Menu.Item key="/activities">
                <Link to="/activities">随喜体验</Link>
              </Menu.Item>
              <Menu.Item key="/about">
                <Link to="/about">关于我们</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={12} push={10}>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                {context?.username? context?.username: <Link to="/login">Login</Link>}
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content style={contentStyle}>{children}</Content>
      
      <Footer style={{ padding: '1rem', textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
    </Layout>
  );
};


export default Layouts;
