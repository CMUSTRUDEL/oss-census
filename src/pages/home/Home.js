import React from "react";

import { Space, Typography } from "antd";

import FullPager from "../../components/full-pager/FullPager";
import SiderLayout from "../../components/sider-layout/SiderLayout";

import "./Home.css";

import texts from "../../texts/texts";
const problem = texts.home.content.problem;
const missions = texts.home.content.mission;

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
  return (
    <>
      <FullPager />
      <SiderLayout 
        title={problem.title}
        description={problem.description}
      />
      <SiderLayout 
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