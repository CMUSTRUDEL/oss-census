import React from "react";
import { Divider, Space  } from "antd";
import StudelLogo from '../../assets/strudel_logo.png';
import CoexLogo from "../../assets/coexlab_logo.png";

import "./Footer.css";

export default function Header(props) {
  return (
    <div className="footer">
      <Divider style={{margin: "4px 0"}}/>
      <Space className="logo-container" size="large" align="center">
        <img id="strudel-logo" src={StudelLogo} alt="CMU Strudel (Socio-technical Research Using Data Excavation Lab)"/>
        <img id="coex-logo" src={CoexLogo} alt="CMU Coex (Connected Experience) Lab"/>
      </Space>
    </div>
  );
}
