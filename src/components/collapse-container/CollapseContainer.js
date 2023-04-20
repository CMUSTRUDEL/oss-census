import React from "react";
import { Collapse, Divider, Typography } from "antd";

import "./CollapseContainer.css"

function getSingleSection(
  section,
  index
) {
  let content = "";
  if (!section.content) {
    // Do nothing
  } else if (section.content.constructor.name == "Object") { // This is a dictionary
    if (Object.keys(section.content) == "references") {
      content = section.content.references.map(
        (reference, referenceIndex) =>
        <div 
          className={`section-${index}-reference-${referenceIndex}`}
          key={`section-${index}-reference-${referenceIndex}`}
        >
          <Typography.Text>{reference.title}</Typography.Text>
          <Typography.Text>{reference.author}</Typography.Text>
          <Typography.Text>{reference.container}</Typography.Text>
        </div>
      )
    } else if (section.content.$$typeof == Symbol.for('react.element')){
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
        key={index+1}
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