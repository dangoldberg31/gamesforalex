import {useEffect, useState} from 'react';
import './gameboard.css';
import {PlayerSelectContainer} from './playerSelectContainer';
import {BoardBoxesContainer} from './boardBoxesContainer';

export const GameBoard = () => {
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [turnOrder, setTurnOrder] = useState([]);
    const [turnCount, setTurnCount] = useState(0);
    const [playerMessage, setPlayerMessage] = useState('Select Players');
    const [playerSelectDisplay, setPlayerSelectDisplay] = useState(true);
    const [boardDisplay, setBoardDisplay] = useState(false);
    const [boardState, setBoardState] = useState(Array(9).fill(0));
    const [winner, setWinner] = useState(false);  

    useEffect(() => {
        checkForWinner()
    })

    useEffect(() => {
        if (turnCount !== 0 && winner === false) {
            setPlayerMessage(`It's ${turnOrder[turnCount].name}'s turn.`)
        }
    },[turnCount, winner, turnOrder])


    const checkForWinner = () => {       
        const reduceFunc = (total, num) => {
            return total + num;
        }
        let row1 = [ boardState[0], boardState[1], boardState[2] ].reduce(reduceFunc);
        let row2 = [ boardState[3], boardState[4], boardState[5] ].reduce(reduceFunc);
        let row3 = [ boardState[6], boardState[7], boardState[8] ].reduce(reduceFunc);
        let col1 = [ boardState[0], boardState[3], boardState[6] ].reduce(reduceFunc);
        let col2 = [ boardState[1], boardState[4], boardState[7] ].reduce(reduceFunc);
        let col3 = [ boardState[2], boardState[5], boardState[8] ].reduce(reduceFunc);
        let dia1 = [ boardState[0], boardState[4], boardState[8] ].reduce(reduceFunc);
        let dia2 = [ boardState[2], boardState[4], boardState[6] ].reduce(reduceFunc);
        if (row1 === 3 || row2 === 3 || row3 === 3 || col1 === 3 || col2 === 3 || col3 === 3 || dia1 === 3 || dia2 === 3) {
            setWinner(true);
            setPlayerMessage(`${turnOrder[1].name} wins!`);
            return player1;
        } else if (row1 === -3 || row2 === -3 || row3 === -3 || col1 === -3 || col2 === -3 || col3 === -3 || dia1 === -3 || dia2 === -3) {
            setWinner(true);
            setPlayerMessage(`${turnOrder[0].name} wins!`);
            return player2;
        } else {
            return false;
        }
    }
//     const endGame = () => {
//         setTimeout(() => setBoardState[0]image(photo),1000);
//         setTimeout(() => setBoardState[0]image(photo),1500);
//         setTimeout(() => setBoardState[0]image(photo),2000);
//         setTimeout(() => setBoardState[3]image(photo),2500);
//         setTimeout(() => setBoardState[4]image(photo),3000);
//         setTimeout(() => setBoardState[5]image(photo),3500);
//         setTimeout(() => setBoardState[6]image(photo),4000);
//         setTimeout(() => setBoardState[7]image(photo),4500);
//         setTimeout(() => setBoardState[8]image(photo),5000)
// }

    return (
        <div>
            <h2 id="playerMessage">{playerMessage}</h2>
            {/* <h4>{player1 ? player1.name : null}</h4> */}
            <h4>{!playerSelectDisplay ? turnOrder[0].name+turnOrder[1].name: null}</h4>
            <PlayerSelectContainer 
                boardDisplay={boardDisplay} setBoardDisplay={setBoardDisplay}
                player1 = {player1} setPlayer1={setPlayer1} 
                player2 = {player2} setPlayer2={setPlayer2} 
                setPlayerMessage={setPlayerMessage}
                turnOrder={turnOrder} setTurnOrder={setTurnOrder}
                turnCount={turnCount}
                playerSelectDisplay={playerSelectDisplay} setPlayerSelectDisplay={setPlayerSelectDisplay} />
            <BoardBoxesContainer 
                boardDisplay={boardDisplay} setBoardDisplay={setBoardDisplay}
                player1={player1}
                player2={player2}
                setPlayerMessage={setPlayerMessage}
                boardState={boardState} setBoardState={setBoardState} 
                turnOrder={turnOrder} 
                turnCount={turnCount} setTurnCount={setTurnCount}          
                />
        </div>
    )
}