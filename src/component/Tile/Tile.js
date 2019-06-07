import React from 'react';
import './style.css';


function Tile (props) {
    return (
            <img className ="tileImage mr-2 mt-1 zoom"src = {props.src} onClick = {props.clickHandler} alt={props.alt} key ={props.id}></img>
        
    );  
}

export default Tile;