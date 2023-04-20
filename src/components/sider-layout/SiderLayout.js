import React from "react";

import { Row, Col, Typography } from 'antd';

import CollapseContainer from "../collapse-container/CollapseContainer";

export default function SiderLayout({
  title,
  description,
  sections,
}) {
  return (
    <Row style={{margin: "65px 0"}}>
      <Col span={4} offset={1}>
        <Typography.Title level={2} style={{
          textAlign: "left",
          textTransform: "uppercase",
          marginTop: 0,
        }}>
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