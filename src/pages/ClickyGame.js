import React, {Component} from 'react';
import Tile from "../component/Tile/Tile";
import TileLoader from "../util/TileLoader";
import Nav from "../component/Nav/Nav";
import Jumbo from "../component/Jumbotron/Jumbotron";

class ClickyGame extends Component {
    constructor(props){
        super(props);
        this.state = {
            tileArray: [],
            highScore:0,
            currentScore:0,
            userMessage: "Click any tile to begin playing. The goal is click a different tile each time!"
        };

    }

    componentDidMount(){
        // setTimeout(this.createGameTiles, 5000);
        this.createGameTiles();
        console.log("[DEBUG] Component did mount");
    }

    createGameTiles = () =>{
        console.log("[DEBUG] Component did mount 2");

        let tiles = TileLoader.createTiles();
        this.setState({
            tileArray: tiles
        });

    };

    createTileComponent = imageObject => {
        return  <Tile
        src ={imageObject.image}
        clickHandler = {this.clickEvent}
        alt = {imageObject.name}
        key = {imageObject.id}
        />;

    }

    createTileComponents = imageObjectArray => {
        return imageObjectArray.map(this.createTileComponent);

    }

    randomizeArray = array => {
        
            var j, x, i;
            for (i = array.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = array[i];
                array[i] = array[j];
                array[j] = x;
            }
            return array;
        
    }

    clickEvent = () =>{
        console.log("[DEBUG] This is array BEFORE shuffle");
        console.log(this.state.tileArray);
        this.setState({
            tileArray: this.randomizeArray(this.state.tileArray)
        });
        console.log("[DEBUG] This is array AFTER shuffle");
        console.log(this.state.tileArray);
    };

    render(){
        // console.log("[DEBUG] Tile Array "+ this.state.tileArray[0].image);
        const { tileArray } = this.state;
        return tileArray.length ? (
            <div>
            
            <Nav/>
            <Jumbo
            message = {this.state.userMessage}
            highScore = {this.state.highScore}
            currentScore = {this.state.currentScore}
            />

            {this.createTileComponents(tileArray)}
            </div>
            
        ) : (
        
        <h1>Loading...</h1>);
      


    }
    
} 
export default ClickyGame;