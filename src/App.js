import React from "react";

import './App.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import { ConfigProvider, Divider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2A2A2A",
          fontSize: 20,
          fontSizeHeading1: 40,
          fontSizeHeading2: 30,
        }
      }}
    >
      <div className="App">
        <Header />
        <Divider style={{margin: "4px 0"}}/>
        <Footer />
      </div>
    </ConfigProvider>
  );
}

export default App;
