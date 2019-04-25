import React, { Component } from "react";
import "./App.css";
import Card from "./Card";

const isMobileDevice =
  typeof window.orientation !== "undefined" ||
  navigator.userAgent.indexOf("IEMobile") !== -1;

class App extends Component {
  render() {
    if (isMobileDevice === false) {
      return (
        <div className="App">
          <h1>Pokemon Stat Calculator</h1>
          <div className="row">
            <Card />
            <Card />
            <Card />
          </div>
          {/* <div>
            <Card />
            <Card />
            <Card />
          </div> */}
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>Pokemon Stat Calculator</h1>
          <div className="solo">
            <Card device="mobile" />
          </div>
        </div>
      );
    }
  }
}

export default App;
