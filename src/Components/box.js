import background from './background.jpg';
import './boxComponent.css';
import {useEffect, useState} from 'react';

export const Box = ({
    id, 
    turnCount, setTurnCount, 
    turnOrder,
    boardState, setBoardState, 
    winner,
    newGameDisplay, setNewGameDisplay,
    cpuMove,
    player1, player2
}) => {
        
    const [boxAssign, setBoxAssign] = useState('free');
    const [boxValue, setBoxValue] = useState(0);
    const [boxPhoto, setBoxPhoto] = useState(background);

    //SETS PLAYERS BOXES TO 1 OR -1 TO MAKE IT EASIER TO CHECK WIN CONDITION
    const boxVal = () => {
        let num = turnCount % 2;
        if (num === 0) {
            num = -1
        }
        return num;
    }

    const handleClick = (event) => {
        if (boxAssign !== 'free') {
            return;
        } else if (winner !== false) {
            return;
        } else {
            setBoxAssign(turnOrder[turnCount].name);
            setBoxValue(boxVal())
            setBoxPhoto(turnOrder[turnCount].photo)
            let boardArray = boardState;
            boardArray[id] = boxVal();
            setBoardState(boardArray)
            setTurnCount((prev) => prev+1)
        }
    }

    //CAUSES CPUMOVE SELECTION TO ACT LIKE A CLICK
    useEffect(() => {
        if (player2.name === 'Computer' && cpuMove === id) {
            setTimeout(() => {
                handleClick()
            },1000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cpuMove])

    //SETS ALL BOXES TO DISPLAY WINNER
    useEffect(() => {
        if (winner === turnOrder[1]) {
            setBoxPhoto(turnOrder[1].photo)
        } else if (winner === turnOrder[0]) {
            setBoxPhoto(turnOrder[0].photo)
        }
    },[winner,turnOrder])

    //RESETS BOXES FOR NEW GAMES
    useEffect(() => {
        if (newGameDisplay === true) {
            setTimeout(() => {
                setBoxAssign('free');
                setBoxValue(0);
                setBoxPhoto(background)
            },1000)
            
        }
    },[newGameDisplay])
  
    return (
            <div>
                {/* <p>{winner ? winner.name : null}</p> */}
                <img className="box" 
                    id={id}  
                    name = {boxAssign} 
                    value = {boxValue}
                    onClick={handleClick}  
                    src = {boxPhoto}
                     alt="box" />
            </div>
    )
}

