import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, List, Space, Row, Col, Button, Descriptions } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { fAvatar, mAvatar } from './Contexts';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import UserContext, { HOST } from './Contexts';

interface ActivityState {
  name: string;
  avatar: string;
  intro: string;
  content: string;
  contact: string;
  charge: string;
}

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const ActivitiesCore: React.FC = () => {
  const [activi, setActivi] = useState<ActivityState[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    // 异步获取数据的逻辑
    const resp = await axios.get(`${HOST}/base/activities`);
    const data = resp.data?.data;
    const dataNew = data.map((item:any)=>{
      item['avatar'] = item['gender'] === 'female' ? fAvatar: mAvatar;
      delete item.gender;
      return item;
    });
    console.log(dataNew);
    setActivi(dataNew);
  };
  
  return (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 8,
    }}
    dataSource={activi}
    renderItem={(item) => (
      <List.Item
        key={item.name}
        actions={[
          <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
        ]}
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={item.name}
          // description={item.description}
        />
        <Descriptions column={1} items={
          [
            {
              key: '1',
              label: '自我介绍',
              children: item.content,
            },
            {
              key: '2',
              label: '收取金额',
              children: item.charge,
            },
            {
              key: '3',
              label: '联系方式',
              children: item.contact,
            },
          ]
        } />
        {/* <div>
          <div>{`自我介绍：${item.content}`}</div>
          <div>{`收取金额：10元`}</div>
        </div> */}
      </List.Item>
    )}
  />
)};

const Activities: React.FC = () => {
  const navigate = useNavigate(); 
  const context = useContext(UserContext);

  const onClick = () => {
    if(context?.isLogged) {
      navigate('/eactivities');
    } else {
      message.error('请先登录');
    }
  }

  return (
    <Row justify="center">
      <Col span={2}></Col>
      <Col span={16}>
        <ActivitiesCore/>
      </Col> 
      <Col span={2} push={1}>
        <Button onClick={onClick} type="primary" shape="circle" icon={<UploadOutlined />} size='large' />
      </Col>
    </Row>
  );
}

export default Activities;