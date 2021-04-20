import { useState } from 'react';
import { useEffect } from 'react';
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

    const activeStyle = {border: "hsl(206, 50%, 50%) 6px solid", padding: "0"}
    const inactiveStyle = {border: "6px", opacity: ".5"}
    
    const boxNums = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    const [style1, setStyle1] = useState(inactiveStyle)
    const [style2, setStyle2] = useState(inactiveStyle)   
    const [boardStyle, setBoardStyle] = useState({visibility: "hidden"})   
    
    
    useEffect(() => {
        setTimeout(() => {
            if (turnOrder[turnCount] === player1) {
                setStyle1(activeStyle);
                setStyle2(inactiveStyle);
            } else {
                setStyle1(inactiveStyle);
                setStyle2(activeStyle);
            }
    },2000)},[])

    useEffect(() => {
        if (turnCount === 0) {
            return;
        }
        if (turnOrder[turnCount] === player1) {
            setStyle1(activeStyle);
            setStyle2(inactiveStyle);
        } else {
            setStyle1(inactiveStyle);
            setStyle2(activeStyle);
        }
    })

    useEffect(() => {
        setTimeout(() => {
            setBoardStyle({visiblity: "visible"})
        }, 2000)
    },[])

    return (
            <div id="boardcontainer" className="section" >
                <div className="gameboardplayercontainer">
                    <img id="photo1" className="playerphoto" src={player1.photo} alt="player 1" style={style1}/>
                    <span className="name">{player1.name}</span>
                </div>
                <div id="exterior">
                    <div id="board" style={boardStyle}>
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
                    <img id="photo2" className="playerphoto" src={player2.photo} alt="player 2" style={style2}/>
                    <span className="name">{player2.name}</span>
                </div>
            </div>
        )
}