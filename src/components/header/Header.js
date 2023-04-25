import React from "react";
import { Button, Divider, Space } from "antd";
import Icon from '@ant-design/icons';

import {ReactComponent as LogoIcon} from '../../assets/logo.svg';

import { useNavigate } from 'react-router-dom';

import './Header.css';

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <div className="header">
        <Space size="middle" style={{margin: "16px 24px", float: "left"}}>
            <Button type="text" icon={<Icon component={LogoIcon} onClick={() => navigate('/')}/>} />
            <Button type="text" onClick={() => navigate('/')}>Home</Button>
            <Button type="text" onClick={() => navigate('/overview')}>Overview</Button>
            <Button type="text" onClick={() => navigate('/gallery')}>Gallery</Button>
            <Button type="text" onClick={() => navigate('/comparisons')}>Comparisons</Button>
            <Button type="text" onClick={() => navigate('/resources')}>Resources</Button>
        </Space>
        <Divider style={{margin: "4px 0"}}/>
    </div>
  );
}
