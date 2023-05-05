import React from "react";

import SiderLayout from "../../components/sider-layout/SiderLayout";

import texts from "../../js/texts";

import "./QuickFacts.css";

export default function QuickFacts(props) {
  const text = texts.overview.content.siderLayout;
  return (
    <SiderLayout 
      title={text.title}
      description={text.description}
      sections={text.sections}
    />
  );
}