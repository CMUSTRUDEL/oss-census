import React from "react";

import SiderLayout from "../../components/sider-layout/SiderLayout";

import texts from "../../js/texts";

export default function Resources(props) {
  const text = texts.resources.content.siderLayout;
  return (
    <SiderLayout 
      title={text.title}
      description={text.description}
      sections={text.sections}
    />
  );
}