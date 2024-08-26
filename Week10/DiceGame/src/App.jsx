import { Component } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  //State update
  const [inputValue, setInputValue] = useState("Player 1");
  //input update
  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <>
      <div>
        <div>
          <PlayerInput
            onInputChange={handleInputChange}
            playerName={inputValue}
          />
          <RoolDice inputValue={inputValue} />
        </div>
      </div>
    </>
  );
}
export default App;

//show dice picture
export class Dice extends Component {
  render() {
    let cls = `./images/${this.props.img}`;
    return (
      <div>
        <img src={cls} />
      </div>
    );
  }
}

//rolls the dice and calculates the results
export class RoolDice extends Component {
  static defaultProps = {
    sides: [
      "dice1.png",
      "dice2.png",
      "dice3.png",
      "dice4.png",
      "dice5.png",
      "dice6.png",
    ],
  };
  state = {
    dice1: "dice1.png",
    dice2: "dice2.png",
    rolling: false,
    winner: "",
  };

  // Roll the dice and start animation
  roll = () => {
    this.setState({ rolling: true, winner: "" });

    // Zarları her 100ms'de bir değiştir
    const rollingInterval = setInterval(() => {
      const newDice1 =
        this.props.sides[Math.floor(Math.random() * this.props.sides.length)];
      const newDice2 =
        this.props.sides[Math.floor(Math.random() * this.props.sides.length)];
      this.setState({ dice1: newDice1, dice2: newDice2 });
    }, 100);
    setTimeout(() => {
      clearInterval(rollingInterval);
      this.setState({ rolling: false }, this.determineWinner);
    }, 3000);
  };

  //Determines the winner and assigns it to the state
  determineWinner = () => {
    const { dice1, dice2 } = this.state;
    const dice1Value = parseInt(dice1.replace("dice", "").replace(".png", ""));
    const dice2Value = parseInt(dice2.replace("dice", "").replace(".png", ""));

    let winner;
    if (dice1Value > dice2Value) {
      winner = (
        <>
          <h2>{this.props.inputValue} Wins!</h2>
          <p>Player 2 Loses</p>
        </>
      );
    } else if (dice1Value < dice2Value) {
      winner = (
        <>
          <h2>Player 2 Wins!</h2>
          <p>{this.props.inputValue} Loses </p>
        </>
      );
    } else {
      winner = (
        <h1>
          Draw! <i className="fas fa-handshake"></i>
        </h1>
      );
    }

    this.setState({ winner });
  };
  render() {
    return (
      <div>
        <div className="dice">
          <Dice img={this.state.dice1} rolling={this.state.rolling} />
          <Dice img={this.state.dice2} rolling={this.state.rolling} />
        </div>
        <button
          className="btn"
          onClick={this.roll}
          disabled={this.state.rolling}
        >
          {this.state.rolling ? (
            "Rolling..."
          ) : (
            <i className="fa-solid fa-shuffle"></i>
          )}{" "}
        </button>

        {this.state.winner && <div className="winner">{this.state.winner}</div>}
      </div>
    );
  }
}

//Used to get name from user
export class PlayerInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.playerName || "Player 1",
    };
  }

  handleChange = (event) => {
    const newValue = event.target.value;
    this.setState({ inputValue: newValue });
    this.props.onInputChange(newValue);
  };
  render() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          placeholder="İsminizi giriniz..."
        />
        <div className="player matemasie-regular">
          <p> {this.state.inputValue}</p>
          <p>Player 2</p>
        </div>
      </div>
    );
  }
}
