// import {useState} from 'react';
import './playerselect.css';
import {PlayerSelect} from './playerselect'

export const PlayerSelectContainer = ({
    boardDisplay, setBoardDisplay,
    player1, setPlayer1, 
    player2, setPlayer2, 
    currentPlayer,
    turnOrder, setTurnOrder,
    turnCount,
    setPlayerMessage,
    playerSelectDisplay, setPlayerSelectDisplay
    }) => {

    if (playerSelectDisplay === true) {
        return (
            <PlayerSelect 
                boardDisplay={boardDisplay} setBoardDisplay={setBoardDisplay}    
                player1={player1} setPlayer1={setPlayer1} 
                player2={player2} setPlayer2={setPlayer2} 
                setPlayerSelectDisplay={setPlayerSelectDisplay}
                setPlayerMessage={setPlayerMessage} 
                currentPlayer={currentPlayer}
                turnCount={turnCount}
                turnOrder={turnOrder} setTurnOrder={setTurnOrder}/>
        )   
    } else {
        return null;
    }
}