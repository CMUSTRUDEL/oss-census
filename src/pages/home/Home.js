import React from "react";

import { Space, Typography, Divider } from "antd";

import FullPager from "../../components/full-pager/FullPager";
import SiderLayout from "../../components/sider-layout/SiderLayout";

import "./Home.css";

import texts from "../../js/texts";

function getMissionContainer(
  mission,
  index
) {
  return (
    <Space 
      direction="vertical" 
      key={`mission-${index}`}
    >
      {mission.logo}
      <Typography.Text className="mission-title">
        {mission.title}
      </Typography.Text>
      <Typography.Text className="mission-description">
        <hr></hr>
        {mission.description}
      </Typography.Text>
    </Space>
  )
}

function getAnalysisContainer(
  analysis,
  index
) {
  return (
    <Space 
      direction="horizontal" 
      align="baseline"
      key={`analysis-${index}`}
    >
      <div className="analysis-logo">{analysis.logo}</div>
      <div className="analysis-title">
        {analysis.title}
      </div>
      <Typography.Paragraph className="analysis-description">
        {analysis.description}
        <hr></hr>
      </Typography.Paragraph>
      <Divider className="divider" />

    </Space>
  )
}

export default function Home(props) {
  const intro = texts.home.content.intro;
  const problem = texts.home.content.problem;
  const missions = texts.home.content.mission;
  const data = texts.home.content.data;
  const gender = texts.home.content.gender;
  const analysis = texts.home.content.analysis;


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
            id="missions-container" 
            size={[10,50]}
            wrap
          >
            {missions.description.map(getMissionContainer)}
          </Space>
        }
      />
      <SiderLayout 
        size="sm"
        title={data.title}
        description={data.description}
      />
      <SiderLayout 
        size="sm"
        title={gender.title}
        description={gender.description}
      />
      <SiderLayout 
        size="sm"
        title={analysis.title}
        description={
          <Space 
            id="analysis-container" 
            size={[10,50]}
            wrap
          >
            {analysis.description.map(getAnalysisContainer)}
          </Space>
        }
      />
    </>
  );
}