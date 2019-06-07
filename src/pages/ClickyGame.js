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
    }

    createGameTiles = () =>{

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
        id = {imageObject.id}
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

   
    clickEvent = (event) =>{
        const array = this.state.tileArray;
        const tileId = event.target.id;
        
       const currentIndexOfClickedTile =  array.findIndex(x => x.id === tileId);
//START OF INCORRECT BLOCK
       if(array[currentIndexOfClickedTile].wasClicked){ //User was incorrect
           if(this.state.currentScore >0){ //they have a point to lose, remove a point
                this.setState({currentScore:this.state.currentScore -1,
                userMessage : "Sorry that was incorrect, you lost a point"
                });
           }else{ //Score is zero, they don't have any more points to lose, they lost the game
               //User lost the game
               this.setState({
                userMessage : "You lost the game, the game has been reset",
                currentScore : 0
                });
               this.createGameTiles(); //Reset Data 
           }

// END OF INCORRECT BLOCK
 
//START OF USER CORRECT BLOCK
       }else{ //User was correct
        array[currentIndexOfClickedTile].wasClicked = true;
        //Check if they got some of the characters left
        if(array.some((x) => x.wasClicked === false)){ //Checks if there are some tiles remaining
            //They just won the round
            this.setState({
                tileArray:array,
                currentScore: this.state.currentScore + 1 ,
                userMessage : "Congrats you won that round!"

        });        
        }else{ //They won the game
            const newScore = this.state.currentScore +1;
            if(this.state.highScore < newScore){ //Check if they have a new high score
                this.setState({
                    highScore : newScore, //Set a new high score
                    userMessage : "A new high score, the game has been reset",
                    currentScore : 0
                });
             }else{ // No new high score
                this.setState({
                    userMessage : "You Won, try to beat your high score, the game has been reset",
                    currentScore : 0
                });

             }
             this.createGameTiles(); //Reset Data  
        }       
    }
//END OF USER CORRECT BLOCK
            

        
        this.setState({
            tileArray: this.randomizeArray(this.state.tileArray)
        });
       
    };

    render(){
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