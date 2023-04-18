import React from "react";

import SiderLayout from "../../components/sider-layout/SiderLayout";

export default function Comparisons(props) {
  return (
    <SiderLayout
      title={"Graph Comparisons"}
      description={"Choose which of the two graph type you would want to display.\n\nContributors will show the number of active contributors working on the chosen project in a given year. Commits will show how many commits are made to the chosen project in a given year."}
      sections={<div>Comparisons</div>}
    />
  );
}