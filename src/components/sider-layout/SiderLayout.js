import React from "react";

import { Row, Col, Typography } from 'antd';

export default function SiderLayout({
  title,
  description,
  sections,
}) {
  return (
    <Row style={{marginTop: "65px"}}>
      <Col span={8}>
        <Typography.Title level={2} style={{
          textTransform: "uppercase",
          marginTop: 0,
        }}>
          {title}
        </Typography.Title>
      </Col>
      <Col span={14} offset={2} style={{textAlign: "left"}}>
        <div className="description-container">
          <Typography.Text>{description}</Typography.Text>
        </div>
        <div className="sections-container" style={{marginTop: "36px"}}>
          {sections}
        </div>
      </Col>
    </Row>
  );
}