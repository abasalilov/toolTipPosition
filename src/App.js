import React, { Component } from "react";
import logo from "./logo.svg";
import { Button } from "./Button";
import "./App.css";

const styles = {
  container: {
    border: "solid green",
    justifyContent: "center",
    alignItems: "center"
  },
  toolTipStyle: {
    color: "red",
    opacity: "1",
    zIndex: "6",
    position: "absolute",
    border: "solid red",
    minWidth: "120px",
    maxWidth: "210px"
  },
  buttonContainer: {
    position: "relative",
    border: "solid blue",
    margin: "2rem"
  }
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.hoverEngage = this.hoverEngage.bind(this);
  }

  hoverEngage() {
    this.setState({ hover: !this.state.hover });
  }

  componentDidMount() {
    const w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName("body")[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height =
        w.innerHeight || documentElement.clientHeight || body.clientHeight;
  }

  render() {
    let message = "hello";
    const { toolTipStyle } = styles;
    return (
      <div style={styles.buttonContainer}>
        {this.state.hover && <div style={toolTipStyle}>{message}</div>}
        <span onMouseLeave={this.hoverEngage} onMouseEnter={this.hoverEngage}>
          {this.props.children}
        </span>
      </div>
    );
  }
}

const ButtonWithToolTip = props => (
  <div>
    <Tooltip style={styles.toolTipStyle}>
      <Button {...props} />
    </Tooltip>
  </div>
);

class App extends Component {
  render() {
    const { container, toolTipStyle } = styles;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          <span>ToolTip Interview Question</span>
          <div style={container}>
            <ButtonWithToolTip label={"button one"} />
            <ButtonWithToolTip label={"button two"} />
            <ButtonWithToolTip label={"button three"} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
