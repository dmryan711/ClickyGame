import React from "react";

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Jumbotron(props) {
  return (
    <div className="jumbotron mario">
        <h1 className="display-4">Welcome!</h1>
        <p className="lead">{props.message}</p>
        <p>High Score: {props.highScore} </p> 
        <p>Score: {props.currentScore} </p>     
  </div>
  );
}




export default Jumbotron;
