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
import References from "./pages/references/References";

import { ConfigProvider } from "antd";

function App() {
  return (
    <Router>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#2A2A2A",
            colorSplit: "black",
            fontSize: 20,
            fontSizeHeading1: 40,
            fontSizeHeading2: 30,
          }
        }}
      >
        <div className="App">
          <Header />
          <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route exact path='/quick-facts' element={<QuickFacts />}></Route>
            <Route exact path='/gallery' element={<Gallery />}></Route>
            <Route exact path='/comparisons' element={<Comparisons />}></Route>
            <Route exact path='/references' element={<References />}></Route>
          </Routes>
          <Footer />
        </div>
      </ConfigProvider>
    </Router>
  );
}

export default App;
