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
  container1: {
    display: "flex",
    float: "right",
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
    const w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName("body")[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
      height =
        w.innerHeight || documentElement.clientHeight || body.clientHeight;

    // console.log("bod", body.clientHeight);
    const position = ReactDOM.findDOMNode(
      this.refs["toolTipRef"]
    ).getBoundingClientRect();

    const { bottom, top, right, left, x, y } = position;
    const deltaRight = width - right;
    const deltaBottom = top - height;
    const deltaLeft = height - y;
    const deltaTop = bottom - y;
    const isLeft = deltaLeft > 10;
    console.log("height", height, "y", y);

    console.log("more than", isLeft, y > height - 40);
    if (deltaRight > 40) {
      this.setState({ x: 60, y: 5 });
    } else if (deltaBottom < 20) {
      this.setState({ x: 0, y: 50 });
    } else {
      this.setState({ x: -15, y: -25 });
    }

    if (y > 600) {
      if (y === height || y > height - 40) {
        console.log("here in left");
        this.setState({ x: -90, y: 10 });
      }
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
    <Tooltip {...props}>
      <Button {...props} />
    </Tooltip>
  </div>
);

class App extends Component {
  render() {
    const { container, container1 } = styles;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <span>ToolTip Interview Question</span>
          <div style={{ float: "left" }}>
            <ButtonWithToolTip label={"button one"} />
          </div>
          <div style={{ float: "right" }}>
            <ButtonWithToolTip label={"button two"} />
          </div>
          <div style={container}>
            <ButtonWithToolTip label={"button three"} />
          </div>

          <div style={{ right: 0, bottom: 0, position: "fixed" }}>
            <ButtonWithToolTip label={"button four"} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
