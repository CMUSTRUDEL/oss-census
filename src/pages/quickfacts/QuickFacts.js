import React from "react";

import SiderLayout from "../../components/sider-layout/SiderLayout";

export default function QuickFacts(props) {
  return (
    <SiderLayout 
      title="Census Overview"
      description=""
      sections={<div>Quick Facts</div>}
    />
  );
}