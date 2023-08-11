import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import React, { useContext, useEffect, useState } from 'react';
import { Avatar, List, Space, Descriptions, Row, Col, Button, DescriptionsProps, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import UserContext, { fAvatar, mAvatar } from './Contexts';
import { useNavigate } from 'react-router-dom';


interface CoachState {
  title: string;
  avatar: string;
  description: string;
  content: string;
  contact: string;
}

// const data = Array.from({ length: 23 }).map((_, i) => ({
//   title: `Coach ${i}`,
//   avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
//   description:
//     '探索人生教练（life coach）～',
//   content:
//     '我将全然地倾听你，不带任何评判，做一面“镜子”反映你当下的内心。同时，在对话过程中，逐渐帮助你理清自己的思路，看到自己的内在潜质。',
//   contact: '123'
// }));

// const items: DescriptionsProps['items'] = [
//   {
//     key: '1',
//     label: '自我介绍',
//     children: '我将全然地倾听你，不带任何评判，做一面“镜子”反映你当下的内心。同时，在对话过程中，逐渐帮助你理清自己的思路，看到自己的内在潜质。',
//   },
//   {
//     key: '2',
//     label: '联系方式',
//     children: '1810000000',
//   }
// ];

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const CoachCore: React.FC = () => {
  const [coach, setCoach] = useState<CoachState[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    // 异步获取数据的逻辑
    const resp = await axios.get('https://backend.lifecoachchina.co/base/coachs');
    const data = resp.data?.data;
    const dataNew = data.map((item:any)=>{
      item['avatar'] = item['gender'] === 'female' ? fAvatar: mAvatar;
      delete item.gender;
      return item;
    });
    console.log(dataNew);
    setCoach(dataNew);
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
    dataSource={coach}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText icon={LikeOutlined} text="0" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="0" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={item.title}
          description={item.description}
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
              label: '联系方式',
              children: item.contact,
            }
          ]
        } />
      </List.Item>
    )}
  />
)};

const Coach = () => {
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
        <CoachCore/>
      </Col> 
      <Col span={2} push={1}>
        <Button onClick={onClick} type="primary" shape="circle" icon={<UploadOutlined />} size='large' />
      </Col>
    </Row>
  )
}

export default Coach;