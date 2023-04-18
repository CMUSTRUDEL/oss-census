import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

import './App.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Home from "./pages/home/Home";
import QuickFacts from "./pages/quickfacts/QuickFacts";
import Gallery from "./pages/gallery/Gallery";
import Comparisons from "./pages/comparisons/Comparisons";
import Resources from "./pages/resources/Resources";

import { ConfigProvider } from "antd";

function App() {
  return (
    <Router>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2A2A2A",
            colorSplit: "black",
            fontFamily: "Everett Regular",
            fontSize: 20,
            fontSizeHeading1: 40,
            fontSizeHeading2: 36,
            fontSizeHeading3: 30,
          }
        }}
      >
        <div className="App">
          <Header />
          <div className="main-content">
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route exact path='/overview' element={<QuickFacts />}></Route>
              <Route exact path='/gallery' element={<Gallery />}></Route>
              <Route exact path='/comparisons' element={<Comparisons />}></Route>
              <Route exact path='/resources' element={<Resources />}></Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </ConfigProvider>
    </Router>
  );
}

export default App;
