import React from "react";
import './style.css';

// Depending on the current path, this component sets the "active" class on the appropriate navigation link item
function Jumbotron(props) {
  return (
    <div class="jumbotron mario">
        <h1 class="display-4">Welcome!</h1>
        <p class="lead">{props.message}</p>
        <p>High Score: {props.highScore} </p> 
        <p>Score: {props.currentScore} </p>     
  </div>
  );
}




export default Jumbotron;
