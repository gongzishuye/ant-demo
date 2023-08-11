import React, { useState } from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';

const { Meta } = Card;

const About: React.FC = () => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
    <Card
    style={{ width: 300 }}
    title="Life Coach中国"
    cover={
      <img
        alt="example"
        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      />
    }
  >
    <Meta
      avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
      title="Guide"
      description={`
        Life Coach中国致力于向中国人科普Life Coach，帮助中国人探索自我、探索世界、成为自我、成为世界。
      `}
    />
  </Card>
  </div>
  );
};

export default About;
