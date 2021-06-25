import React, { Component, useState } from "react";

import CharPicker from "./components/CharPicker";
import Character from "./components/Character";

const App = (props) => {
  // *************************************************************************************************
  // The below is a cumber some way to update state they requires the use of the spread to update like so ...state, side:side
  // *********************************************************************************************************
  // const [state, setState] = useState({
  //   selectedCharacter: 1,
  //   side: "light",
  //   destroyed: false,
  // });

  // *************************************************************************************************
  // The below is a solution to stopping having to keep updating the state like this ...state, side:side
  // *********************************************************************************************************

  const [destroyed, setDestroyed] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState("2");
  const [chosenSide, setChosenSide] = useState("light");

  const sideHandler = (side) => {
    setChosenSide(side);
    // setState({ ...state, side: side });
  };

  const charSelectHandler = (event) => {
    const charId = event.target.value;
    setSelectedCharacter(charId);
    // setState({ ...state, selectedCharacter: charId });
  };

  const destructionHandler = () => {
    setDestroyed(true);
    // setState({ ...state, destroyed: true });
  };

  let content = (
    <React.Fragment>
      <CharPicker
        // side={state.side}
        side={chosenSide}
        selectedChar={selectedCharacter}
        onCharSelect={charSelectHandler}
      />
      <Character selectedChar={selectedCharacter} />
      <button onClick={sideHandler.bind(this, "light")}>Light Side</button>
      <button onClick={sideHandler.bind(this, "dark")}>Dark Side</button>
      {chosenSide === "dark" && (
        <button onClick={destructionHandler}>DESTROY!</button>
      )}
    </React.Fragment>
  );

  if (destroyed) {
    content = <h1>Total destruction!</h1>;
  }
  return content;
};

export default App;
