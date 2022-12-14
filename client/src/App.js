import React, { Component } from "react";

import "./App.css";
import Formulaire from "./pages/formulaire";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/")
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  render() {
    return <Formulaire></Formulaire>;
  }
}

export default App;
