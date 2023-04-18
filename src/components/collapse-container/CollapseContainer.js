import React from "react";
import { Collapse, Typography } from "antd";

import "./CollapseContainer.css"

export default function CollapseContainer(props) {
  return (
    <Collapse className="sections-container" defaultActiveKey={['1']} ghost>
      <Collapse.Panel header={<Typography.Title level={3}>OVERVIEW OF GENDER DIVERSITY IN OSS</Typography.Title>} key="1">
        <p>potato</p>
      </Collapse.Panel>
    </Collapse>
  );
}