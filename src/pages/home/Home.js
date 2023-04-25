import React from "react";

import FullPager from "../../components/full-pager/FullPager";
import SiderLayout from "../../components/sider-layout/SiderLayout";

import texts from "../../texts/texts";

export default function Home(props) {
  const problem = texts.home.content.problem;
  const mission = texts.home.content.mission;
  return (
    <>
      <FullPager />
      <SiderLayout 
        title={problem.title}
        description={problem.description}
      />
    </>
  );
}