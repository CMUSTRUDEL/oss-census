import React from "react";

import SiderLayout from "../../components/sider-layout/SiderLayout";
import CollapseContainer from "../../components/collapse-container/CollapseContainer";

export default function Resources(props) {
  return (
    <SiderLayout 
      title="Resources"
      description="Before us, numerous of scholars have worked on the problem of gender diversity in OSS, and broadly, STEM (Science, Technology, Engineering, and Math) fields. Along with our analysis, we compiled a list of prior works that reported gender representation across the years. We grouped prior studies by their data collection methods, such as survey or data mining, and their samples, such as the entire OSS population or sub-population of specific ecosystems or projects.      "
      sections={<CollapseContainer />}
    />
  );
}