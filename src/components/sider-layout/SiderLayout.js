import React from "react";

import { Row, Col, Typography } from 'antd';

import CollapseContainer from "../collapse-container/CollapseContainer";

import "./SiderLayout.css";

function getLevelFromSize(size) {
  switch(size) {
    case "sm": return 3;
    case "md": return 2;
    case "lg": return 1;
    default: return 2;
  }
}

export default function SiderLayout({
  title,
  description,
  subdescription,
  sections = [],
  size = "md",
}) {
  return (
    <Row className={`sider-layout sider-layout-${size}`}>
      <Col span={4} offset={1}>
        <Typography.Title className="sider-layout-title" level={getLevelFromSize(size)}>
          {title}
        </Typography.Title>
      </Col>
      <Col span={14} style={{textAlign: "left"}} offset={3}>
        <div className="description-container">
          <Typography.Text>{description}</Typography.Text>
        </div>
        <div className="sections-container" style={{marginTop: "36px"}}>
          <CollapseContainer sections={sections} />
        </div>
      </Col>
      <Col span={1} />
    </Row>
  );
}