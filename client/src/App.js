import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route  } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Matches from "./components/Matches/Matches";
import UpateMatch from "./components/UpdateMatch/UpdateMatch";
import AddMatch from "./components/AddMatch/AddMatch";

function App() {
  return (
    <Router>
    <div className="App">
    <Navbar />
    <div className="container">
      <Route exact path="/" component={Matches} />
      <Route  path="/update-match/:matchId" component={UpateMatch} />
      <Route  path="/add-match" component={AddMatch} />
    </div>
    <Footer/>

    </div>
    </Router>
  );
}

export default App;
 