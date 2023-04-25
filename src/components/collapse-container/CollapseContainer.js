import React from "react";
import { Col, Collapse, Divider, Row, Space, Typography } from "antd";

import "./CollapseContainer.css"

function getSingleSection(
  section,
  index,
) {
  let content = "";
  if (!section.content) {
    // Do nothing
  } else if (section.content.constructor.name === "Object") { // This is a dictionary
    if (Object.keys(section.content) === "references") {
      content = section.content.references.map(
        (reference, referenceIndex) =>
        <Row 
          className={`section-reference section-${index}-reference-${referenceIndex}`}
          key={`section-${index}-reference-${referenceIndex}`}
        >
          <Col span={15}>
            <Space direction="vertical">
              <Typography.Text strong>{reference.title}</Typography.Text>
              <Typography.Text>{reference.author}</Typography.Text>
            </Space>
          </Col>
          <Col span={7} offset={1}>
            <Typography.Text italic>{reference.container}</Typography.Text>
          </Col>
        </Row>
      )
    } else if (section.content.$$typeof === Symbol.for('react.element')){
      content = section.content;
    }
  } else { // This is an HTML element
    content = section.content;
  }
  return (
    <>
      <Divider />
      <Collapse.Panel
        header={<Typography.Title level={3}>{section.title}</Typography.Title>}
        key={`section-${index+1}-${section.title}`}
      >
        <p>{section.description ?? ""}</p>
        {content}
      </Collapse.Panel>
    </>
  )
}
export default function CollapseContainer({
  sections
}) {
  return (
    <Collapse className="sections-container" defaultActiveKey={['1']} ghost>
      {sections.map(getSingleSection)}
    </Collapse>
  );
}