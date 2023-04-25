import React from "react";
import { Col, Collapse, Divider, Row, Space, Typography } from "antd";

import ColumnComparison from "../column-comparison/ColumnComparison";

import "./CollapseContainer.css"

function getSingleSection(
  section,
  index,
) {
  let content = "";
  if (!section.content) {
    // Do nothing
  } else if (section.content.constructor.name === "Object") { // This is a dictionary
    const content_type = Object.keys(section.content)[0];

    if (content_type === "references") {
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
    } else if (content_type === "comparison") {
      content = 
        <ColumnComparison 
          title={section.content.comparison.title}
          metrics={section.content.comparison.metrics}
        />;
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
  sections = []
}) {
  return (
    <Collapse 
      className="sections-container" 
      defaultActiveKey={
        [`section-1${sections.length > 0 ? 
          ("-" + sections[0].title) 
          : ""}`
        ]
      } 
      expandIconPosition="end"
      ghost
    >
      {sections.map(getSingleSection)}
    </Collapse>
  );
}