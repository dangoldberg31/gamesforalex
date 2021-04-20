// import { useEffect } from 'react';
// import { useEffect } from 'react';
import './boardBoxes.css';
import {Box} from './box';

export const BoardBoxes = ({
    turnCount, setTurnCount, 
    turnOrder, 
    boardState, setBoardState, 
    player1, player2,
    currentPlayer, 
    setPlayerMessage,
    endState
    }) => {

    const boxNums = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
        


    return (
            <div id="boardcontainer" className="section" >
                <div className="gameboardplayercontainer">
                    <img id="photo1" className="playerphoto" src={player1.photo} alt="player 1" />
                    <span className="name">{player1.name}</span>
                </div>
                <div id="exterior">
                    <div id="board" >
                        {boxNums.map(i => {
                            return( 
                                <Box className="box" id={i}  
                                    turnCount={turnCount} setTurnCount={setTurnCount} 
                                    turnOrder={turnOrder}
                                    boardState={boardState} setBoardState={setBoardState} 
                                    player1={player1} player2={player2}
                                    endState={endState}   
                                    currentPlayer={currentPlayer}
                                    />  
                            )
                        })}
                    </div>
                </div>
                <div className="gameboardplayercontainer">
                    <img id="photo2" className="playerphoto" src={player2.photo} alt="player 2"/>
                    <span className="name">{player2.name}</span>
                </div>
            </div>
        )
}