import React, { Component } from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import { Button } from "./Button";
import "./App.css";

const styles = {
  container: {
    display: "flex",
    border: "solid green",
    justifyContent: "center",
    alignItems: "center"
  },
  toolTipStyle: {
    color: "red",
    opacity: "1",
    zIndex: "6",
    position: "absolute",
    border: "solid red"
  },
  middle: {
    color: "red",
    opacity: "1",
    zIndex: "6",
    position: "absolute",
    border: "solid red",
    minWidth: "120px",
    maxWidth: "210px"
  },
  top: {
    position: "absolute"
  },
  hide: {
    visibility: "hidden",
    zIndex: "6",
    position: "absolute"
  },
  buttonContainer: {
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
    console.log("position", position);
    if (deltaRight > 75) {
      this.setState({ x: 75, y: 25 });
    } else if (deltaBottom > 50) {
      this.setState({ x: 0, y: 50 });
    } else if (deltaLeft > 75) {
      this.setState({ x: -75, y: 25 });
    } else if (deltaTop > 75) {
      this.setState({ x: 0, y: -5 });
    }
  }

  render() {
    let message = "hello";
    const { toolTipStyle, hide } = styles;
    const { x, y } = this.state;
    const positionCSS = {
      transform: "translate(" + x + "px," + y + "px)",
      zIndex: "10"
    };

    const hidePosition = {
      transform: "translate(" + x + "px," + y + "px)",
      visibility: "hidden"
    };
    return (
      <div style={styles.buttonContainer}>
        <div style={this.state.hover ? positionCSS : hidePosition}>
          {message}
        </div>
        <div
          onMouseEnter={this.hoverEngage}
          onMouseLeave={this.hoverEngage}
          ref="toolTipRef"
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

const ButtonWithToolTip = props => {
  console.log("props", props);
  const { label } = props;
  return (
    <Tooltip>
      <Button label={label} />
    </Tooltip>
  );
};

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
