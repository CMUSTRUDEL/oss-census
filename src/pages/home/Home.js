import React from "react";

import { Space, Typography } from "antd";

import FullPager from "../../components/full-pager/FullPager";
import SiderLayout from "../../components/sider-layout/SiderLayout";

import "./Home.css";

import texts from "../../texts/texts";

function getMissionContainer(
  mission,
  index
) {
  return (
    <Space 
      direction="vertical" 
      align="center" 
      key={`mission-${index}`}
    >
      {mission.logo}
      <Typography.Text className="mission-title">
        {mission.title}
      </Typography.Text>
    </Space>
  )
}

export default function Home(props) {
  const intro = texts.home.content.intro;
  const problem = texts.home.content.problem;
  const missions = texts.home.content.mission;
  return (
    <>
      <FullPager 
        title={intro.title}
        subtitle={intro.subtitle}
        description={intro.description}
        button={intro.button}
      />
      <SiderLayout 
        size="sm"
        title={problem.title}
        description={problem.description}
      />
      <SiderLayout 
        size="sm"
        title={missions.title}
        description={
          <Space 
            className="missions-container" 
            size={[10,50]}
            wrap
          >
            {missions.description.map(getMissionContainer)}
          </Space>
        }
      />
    </>
  );
}