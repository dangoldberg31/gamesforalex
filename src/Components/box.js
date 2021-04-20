import background from './background.jpg';
import './boxComponent.css';
import {useState} from 'react';

export const Box = ({
    id, 
    turnCount, setTurnCount, 
    turnOrder,
    boardState, setBoardState, 
    // player1, player2,
}) => {
        
    const [boxAssign, setBoxAssign] = useState('free');
    const [boxValue, setBoxValue] = useState(0);
    const [boxPhoto, setBoxPhoto] = useState(background);

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
        }
        // setBoxAssign(turnOrder[turnCount].name);
        setBoxAssign(turnOrder[turnCount].name);
        setBoxValue(boxVal())
        setBoxPhoto(turnOrder[turnCount].photo)
        let boardArray = boardState;
        // boardArray[id] = turnOrder[turnCount];
        boardArray[id] = boxVal();
        setBoardState(boardArray)
        setTurnCount((prev) => prev+1)
    }
  
    return (
            <div>
                {/* <p>{turnOrder[turnCount].name}</p> */}
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

