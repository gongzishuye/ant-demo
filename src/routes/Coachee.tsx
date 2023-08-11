import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Row, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserContext from './Contexts';

interface DataType {
  name: string;
  desc: string;
  intro: string;
  contact: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '问题描述',
    dataIndex: 'desc',
    key: 'desc',
  },
  {
    title: '自我介绍',
    dataIndex: 'intro',
    key: 'intro',
  },
  {
    title: '联系方式',
    key: 'contact',
    dataIndex: 'contact',
  }
];

// const data: DataType[] = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: '职场/人际/家庭/个人成长…',
//     address: '哈佛博士'
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     age: '职场/人际/家庭/个人成长…',
//     address: '蓝翔技校首席博士'
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     age: '职场/人际/家庭/个人成长…',
//     address: '中国挖掘机首席技术官'
//   },
// ];

const Coachee: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    // 异步获取数据的逻辑
    const resp = await axios.get('https://backend.lifecoachchina.co/base/coachees');
    const data = resp.data?.data;
    const dataNew = data.map((item:any)=>{
      return item;
    });
    console.log(dataNew);
    setData(dataNew);
  };

  const navigate = useNavigate(); 
  const context = useContext(UserContext);

  const onClick = () => {
    if(context?.isLogged) {
      navigate('/ecoachee');
    } else {
      message.error('请先登录');
    }
  }

  return (
    <Row justify="center">
      <Col span={2}></Col>
      <Col span={16}>
        <Table columns={columns} dataSource={data} />
      </Col> 
      <Col span={2} push={1}>
        <Button onClick={onClick} type="primary" shape="circle" icon={<UploadOutlined />} size='large' />
    </Col>
    </Row>
  )
};

export default Coachee;