import React from "react";
import { Button, Divider, Space } from "antd";
import Icon from '@ant-design/icons';

import {ReactComponent as LogoIcon} from '../../assets/logo.svg';

export default function Header(props) {
  return (
    <div style={{ 
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        background: "white",
    }}>
        <Space size="large" style={{margin: "16px 24px", float: "left"}}>
            <Button type="text" icon={<Icon component={LogoIcon} />} />
            <Button type="text">HOME</Button>
            <Button type="text">QUICK FACTS</Button>
            <Button type="text">GALLERY</Button>
            <Button type="text">COMPARISONS</Button>
            <Button type="text">REFERENCES</Button>
        </Space>
        <Divider style={{margin: "4px 0"}}/>
    </div>
  );
}
