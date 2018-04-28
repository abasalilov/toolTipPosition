import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import { Button } from "./Button";
import "./App.css";

const styles = {
  container: {
    display: "flex",
    textAlign: "center",
    justifyContent: "space-between",
    alignItems: "center",
    width: "50rem",
    margin: "2rem auto"
  },
  buttonWToolTip: {
    position: "relative"
  }
};

class Tooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      position: "right",
      x: 0,
      y: 0
    };
    this.hoverEngage = this.hoverEngage.bind(this);
  }

  hoverEngage() {
    this.setState({ hover: !this.state.hover });
  }

  componentDidMount() {
    const position = ReactDOM.findDOMNode(
      this.refs["toolTipRef"]
    ).getBoundingClientRect();

    const { bottom, top, right, left, x, y } = position;
    const deltaRight = right - x;
    const deltaBottom = bottom - y;
    const deltaLeft = left - x;
    const deltaTop = top - y;

    if (deltaRight > 60) {
      this.setState({ x: 60, y: 5 });
    } else if (deltaBottom > 50) {
      this.setState({ x: 0, y: 50 });
    } else if (deltaLeft > 60) {
      this.setState({ x: -60, y: 25 });
    } else if (deltaTop > 60) {
      this.setState({ x: 0, y: -5 });
    }
  }

  render() {
    let message = "hello";
    const { toolTipStyle, hide } = styles;
    const { x, y } = this.state;
    const positionCSS = {
      transform: "translate(" + x + "px," + y + "px)",
      position: "absolute",
      zIndex: "10"
    };

    const hideToolTip = {
      transform: "translate(" + x + "px," + y + "px)",
      visibility: "hidden",
      position: "absolute"
    };

    return (
      <div style={styles.buttonWToolTip}>
        <div
          onMouseLeave={this.hoverEngage}
          onMouseEnter={this.hoverEngage}
          ref="toolTipRef"
        >
          <span style={this.state.hover ? positionCSS : hideToolTip}>
            {message}
          </span>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const ButtonWithToolTip = props => (
  <div>
    <Tooltip>
      <Button {...props} />
    </Tooltip>
  </div>
);

class App extends Component {
  render() {
    const { container } = styles;
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
