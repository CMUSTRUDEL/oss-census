import React from "react";
import { Button, Divider, Space } from "antd";
import Icon from '@ant-design/icons';

import {ReactComponent as LogoIcon} from '../../assets/logo.svg';

import { Link } from 'react-router-dom';

import './Header.css';

export default function Header(props) {
  return (
    <div style={{ 
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        background: "white",
    }}>
        <Space size="middle" style={{margin: "16px 24px", float: "left"}}>
            <Button type="text" icon={<Icon component={LogoIcon} />}>
              <Link to="/" />
            </Button>
            <Button type="text">
              <Link to="/">Home</Link>
            </Button>
            <Button type="text">
              <Link to="/quick-facts">Quick Facts</Link>
            </Button>
            <Button type="text">
              <Link to="/gallery">Gallery</Link>
            </Button>
            <Button type="text">
              <Link to="/comparisons">Comparisons</Link>
            </Button>
            <Button type="text">
              <Link to="/references">References</Link>
            </Button>
        </Space>
        <Divider style={{margin: "4px 0"}}/>
    </div>
  );
}
