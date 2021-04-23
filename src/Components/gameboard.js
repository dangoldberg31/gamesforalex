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
    const [cpuMove, setCpuMove] = useState(null);
    const [sliderValue, setSliderValue] = useState(10);
    // eslint-disable-next-line no-unused-vars
    const [cpuBackupToggle, setCPUBackupToggle] = useState(0);

    const row1 = [ boardState[0], boardState[1], boardState[2] ];
    const row2 = [ boardState[3], boardState[4], boardState[5] ];
    const row3 = [ boardState[6], boardState[7], boardState[8] ];
    const col1 = [ boardState[0], boardState[3], boardState[6] ];
    const col2 = [ boardState[1], boardState[4], boardState[7] ];
    const col3 = [ boardState[2], boardState[5], boardState[8] ];
    const dia1 = [ boardState[0], boardState[4], boardState[8] ];
    const dia2 = [ boardState[2], boardState[4], boardState[6] ];
    

    const reduceFunc = (total, num) => {
        return total + num;
    }

    const determineCpuVal = () => {
        if (turnOrder[0].name === 'Computer') {
            return -1;
        } else if (turnOrder[1].name === 'Computer') {
        return 1;
        }
    }

    const checkForWinner = () => {       
        if (row1.reduce(reduceFunc) === 3 || row2.reduce(reduceFunc) === 3 || row3.reduce(reduceFunc) === 3 || col1.reduce(reduceFunc) === 3 || col2.reduce(reduceFunc) === 3 || col3.reduce(reduceFunc) === 3 || dia1.reduce(reduceFunc) === 3 || dia2.reduce(reduceFunc) === 3) {
            
            return turnOrder[1];
        } else if (row1.reduce(reduceFunc) === -3 || row2.reduce(reduceFunc) === -3 || row3.reduce(reduceFunc) === -3 || col1.reduce(reduceFunc) === -3 || col2.reduce(reduceFunc) === -3 || col3.reduce(reduceFunc) === -3 || dia1.reduce(reduceFunc) === -3 || dia2.reduce(reduceFunc) === -3) {
            setWinner(turnOrder[0]);
            setPlayerMessage(`${turnOrder[0].name} wins!`);
            return turnOrder[2];
        } else if (boardState.includes(0) === false) {
            return 'tie'
        } else {
            return false;
        }
    }

    const cpuWinChecker = () => {
        let cpuVal = determineCpuVal();
        if (Math.abs(row1.reduce(reduceFunc) + cpuVal) === 3) {
            if (boardState[0] === 0) {
                return 0;
            } else if (boardState[1] === 0) {
                return 1;
            } else if (boardState[2] === 0) {
                return 2;
            }
        } else if (Math.abs(row2.reduce(reduceFunc) + cpuVal) === 3) {
            if (boardState[3] === 0) {
                return 3;
            } else if (boardState[4] === 0) {
                return 4;
            } else if (boardState[5] === 0);
                return 5;
        } else if (Math.abs(row3.reduce(reduceFunc) + cpuVal) === 3) {
            if (boardState[6] === 0) {
                return 6;
            } else if (boardState[7] === 0) {
                return 7;
            } else if (boardState[8] === 0);
                return 8;
        } else if (Math.abs(col1.reduce(reduceFunc) + cpuVal) === 3) {
            if (boardState[0] === 0) {
                return 0;
            } else if (boardState[3] === 0) {
                return 3;
            } else if (boardState[6] === 0);
                return 6;
        } else if (Math.abs(col2.reduce(reduceFunc) + cpuVal) === 3) {
            if (boardState[1] === 0) {
                return 1;
            } else if (boardState[4] === 0) {
                return 4;
            } else if (boardState[7] === 0);
                return 7;
        } else if (Math.abs(col3.reduce(reduceFunc) + cpuVal) === 3) {
            if (boardState[2] === 0) {
                return 2;
            } else if (boardState[5] === 0) {
                return 5;
            } else if (boardState[8] === 0);
                return 8;
        } else if (Math.abs(dia1.reduce(reduceFunc) + cpuVal) === 3) {
            if (boardState[0] === 0) {
                return 0;
            } else if (boardState[4] === 0) {
                return 4;
            } else if (boardState[8] === 0);
                return 8;
        } else if (Math.abs(dia2.reduce(reduceFunc) + cpuVal) === 3) {
                if (boardState[2] === 0) {
                    return 2;
                } else if (boardState[4] === 0) {
                    return 4;
                } else if (boardState[6] === 0);
                    return 6;
        } else {
            return false;
        }
    }

    const cpuLoseChecker = () => {
        let cpuVal = determineCpuVal();
        let defenseMoves = [];
        if (Math.abs(row1.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[0] === 0) {
                defenseMoves.push(0);
            } else if (boardState[1] === 0) {
                defenseMoves.push(1);
            } else if (boardState[2] === 0);
                defenseMoves.push(2)
        } 
        if (Math.abs(row2.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[3] === 0) {
                defenseMoves.push(3);
            } else if (boardState[4] === 0) {
                defenseMoves.push(4);
            } else if (boardState[5] === 0) {
                defenseMoves.push(5);
            }
        }
        if (Math.abs(row3.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[6] === 0) {
                defenseMoves.push(6);
            } else if (boardState[7] === 0) {
                defenseMoves.push(7);
            } else if (boardState[8] === 0) {
                defenseMoves.push(8);
            }
        } 
        if (Math.abs(col1.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[0] === 0) {
                defenseMoves.push(0);
            } else if (boardState[3] === 0) {
                defenseMoves.push(3);
            } else if (boardState[6] === 0);
                defenseMoves.push(6);
        } 
        if (Math.abs(col2.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[1] === 0) {
                defenseMoves.push(1);
            } else if (boardState[4] === 0) {
                defenseMoves.push(4);
            } else if (boardState[7] === 0) {
                defenseMoves.push(7);
            }
        } 
        if (Math.abs(col3.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[2] === 0) {
                defenseMoves.push(2);
            } else if (boardState[5] === 0) {
                defenseMoves.push(5);
            } else if (boardState[8] === 0) {
                defenseMoves.push(8);
            }
        } 
        if (Math.abs(dia1.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[0] === 0) {
                defenseMoves.push(0);
            } else if (boardState[4] === 0) {
                defenseMoves.push(4);
            } else if (boardState[8] === 0) {
                defenseMoves.push(8);
            }
        } 
        if (Math.abs(dia2.reduce(reduceFunc) - cpuVal) === 3) {
            if (boardState[2] === 0) {
                defenseMoves.push(2);
            } else if (boardState[4] === 0) {
                defenseMoves.push(4);
            } else if (boardState[6] === 0) {
                defenseMoves.push(6);
            }
        } 
        if (defenseMoves.length === 0) {
            return false;
        } else {
            return defenseMoves[0];
        }
    }

    const cpuSimpleMove = () => {
        let options = [];
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === 0) {
                options.push(i);
            }  
        }
        let chooseIndex = Math.floor(Math.random()*options.length);
        return options[chooseIndex];
        }

    //UPDATES PLAYER MESSAGE, CHECKS FOR END GAME STATES, SETS ENDGAME BEHAVIOR
    useEffect(() => {
        // DOES NOT RUN ON FIRST TURN
        if (turnCount > 0) {
            // CHECKS FOR A WINNER 
            let check = checkForWinner();
            //CODE FOR IF NO WINNER
            if (check === false) {
                setTimeout(() => {
                    setPlayerMessage(`It's ${turnOrder[turnCount].name}'s turn.`)
                },200)
                return;
            //CODE FOR IF THERE IS A TIE
            } else if (check === 'tie') {
                setPlayerMessage('Tie game!');
            //CODE FOR IF THERE IS A WINNER
            } else {
                setWinner(check);
                setPlayerMessage(`${check.name} wins!`);
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
            }
            //SUMMONS NEW GAME COMPONENT
            setTimeout(() => {
                setNewGameDisplay(true)
            },1500)
        } else {
            return
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[turnCount])

    //SET CPU BEHAVIOR
    useEffect(() => {
        if (boardDisplay === true && turnOrder[turnCount].name === 'Computer') {
            let winCheck = cpuWinChecker();
            let loseCheck = cpuLoseChecker();
            let simpleMove = cpuSimpleMove();
            let IQ = Math.floor(Math.random()*10)
            setTimeout(() => {
                if (winCheck === false && loseCheck === false) {
                    setCpuMove(simpleMove);
                } else if (IQ >= sliderValue) {
                    setCpuMove(simpleMove);
                } else if (winCheck === false) {
                    setCpuMove(loseCheck);
                } else if (typeof winCheck === 'number')
                    setCpuMove(winCheck);
            },1000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
        },[turnCount, boardDisplay])
    
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
                sliderValue={sliderValue} setSliderValue={setSliderValue}
                setCPUBackupToggle={setCPUBackupToggle}
                />

        </div>
    )
}