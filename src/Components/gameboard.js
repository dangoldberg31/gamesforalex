import {useEffect, useState} from 'react';
import './gameboard.css';
import {PlayerSelectContainer} from './playerSelectContainer';
import {BoardBoxesContainer} from './boardBoxesContainer';
import {NewGameContainer} from './newGameContainer';

export const GameBoard = () => {
    const [player1, setPlayer1] = useState(null);
    const [player2, setPlayer2] = useState(null);
    const [turnOrder, setTurnOrder] = useState([]);
    const [turnCount, setTurnCount] = useState(0);
    const [playerMessage, setPlayerMessage] = useState('Select Players');
    const [playerSelectDisplay, setPlayerSelectDisplay] = useState(true);
    const [boardDisplay, setBoardDisplay] = useState(false);
    const [newGameDisplay, setNewGameDisplay] = useState(false);
    const [boardState, setBoardState] = useState(Array(9).fill(0));
    const [winner, setWinner] = useState(false);  
    const [cpuMove, setCpuMove] = useState(null)

    useEffect(() => {
        if (turnCount === 0) {
            return;
        }
        let check = checkForWinner();
        if (check === false && turnCount !== 0) {
            setTimeout(() => {
                setPlayerMessage(`It's ${turnOrder[turnCount].name}'s turn.`)
            },200)
            return;
        } else if (check !== false) {
            let player1data = player1;
            let player2data = player2; 
            if (check === turnOrder[1]) {
                turnOrder[1].wins += 1;
                turnOrder[0].losses += 1;
                setPlayer1(player1data);
                setPlayer2(player2data);
            } else if (check === turnOrder[0]) {
                turnOrder[0].wins += 1;
                turnOrder[1].losses += 1;
                setPlayer1(player1data);
                setPlayer2(player2data);
            }
                setTimeout(() => {
                    setNewGameDisplay(true)
                },1500)
            }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[turnCount])


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
            setWinner(turnOrder[1]);
            setPlayerMessage(`${turnOrder[1].name} wins!`);
            return turnOrder[1];
        } else if (row1 === -3 || row2 === -3 || row3 === -3 || col1 === -3 || col2 === -3 || col3 === -3 || dia1 === -3 || dia2 === -3) {
            setWinner(turnOrder[0]);
            setPlayerMessage(`${turnOrder[0].name} wins!`);
            return turnOrder[2];
        } else {
            return false;
        }
    }

    useEffect(() => {
        if (BoardBoxesContainer === false) {
            return;
        } else if (!turnOrder[turnCount]) {
            return;
        } else if (turnOrder[turnCount].name === 'Computer') {
            let options = [];
            for (let i = 0; i < boardState.length; i++) {
                if (boardState[i] === 0) {
                    options.push(i);
                }  
            }
            let chooseIndex = Math.floor(Math.random()*options.length);
            setTimeout(() => {
                setCpuMove(options[chooseIndex])
            },1000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[turnOrder, turnCount])

    return (
        <div>
            <NewGameContainer 
                winner={winner} setWinner={setWinner}
                newGameDisplay={newGameDisplay} setNewGameDisplay={setNewGameDisplay}
                boardState={boardState} setBoardState={setBoardState} 
                turnCount={turnCount} setTurnCount={setTurnCount}
                turnOrder={turnOrder} setTurnOrder={setTurnOrder}   
                setPlayerMessage={setPlayerMessage}
                setPlayer1={setPlayer1} setPlayer2={setPlayer2}
                setPlayerSelectDisplay={setPlayerSelectDisplay}
                setBoardDisplay={setBoardDisplay}
                />
            <h2 id="playerMessage">{playerMessage}</h2>
            {/* <h4>{player1 ? player1.name : null}</h4> */}
            {/* <h4>{!playerSelectDisplay ? turnOrder[0].name+turnOrder[1].name: null}</h4> */}
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
                winner={winner}    
                newGameDisplay={newGameDisplay} setNewGameDisplay={setNewGameDisplay}
                cpuMove={cpuMove}
                />

        </div>
    )
}