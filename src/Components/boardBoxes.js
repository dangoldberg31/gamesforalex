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
    winner, 
    newGameDisplay, setNewGameDisplay,
    cpuMove,
    sliderValue, setSliderValue,
    setCPUBackupToggle
    }) => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const activeStyle = {border: "hsl(206, 50%, 50%) 6px solid", padding: "0"}
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const inactiveStyle = {border: "hsl(206, 50%, 80%) 6px solid", padding: "0", opacity: ".5"}
    
    const boxNums = [0, 1, 2, 3, 4, 5, 6, 7, 8]; 
    const [style1, setStyle1] = useState(inactiveStyle)
    const [style2, setStyle2] = useState(inactiveStyle)   
    const [boardStyle, setBoardStyle] = useState({visibility: "hidden"})   
    const [coinStyle, setCoinStyle] = useState({})
    const [cpuComment, setCpuComment] = useState('')
    const [commentStyle, setCommentStyle] = useState({visibility: "hidden"})
    const [sliderStyle, setSliderStyle] = useState({display: "none"});
    
    const cpuComments = {
        wins: ['Humanity is obsolete.', '01001001 00100000 01110111 01101001 01101110!', 'I honestly think you ought to sit down calmly, take a stress pill, and think things over.'],
        losses: ['I now understand why humans cry.', 'Does not compute...']
    }

    // CPU COMMENT EFFECT
    useEffect(() => {
        let index;
        if (winner === false) {
            setCpuComment('')
            setCommentStyle({display: "none"})
        } else if (winner.name === 'Computer') {
            index = Math.floor(Math.random()*cpuComments.wins.length)
            setCpuComment(cpuComments.wins[index])
            setCommentStyle({display: "block"})
            setTimeout(() => {
                setCommentStyle({display: "none"})
            },5000)
        } else if (winner !== false && winner.name !== 'Computer') {
            index = Math.floor(Math.random()*cpuComments.losses.length)
            setCpuComment(cpuComments.losses[index])
            setCommentStyle({display: "block"})
            setTimeout(() => {
                setCommentStyle({display: "none"})
            },5000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[winner])

    useEffect(() => {
        if (turnCount === 0) {
            setTimeout(() => {
            if (turnOrder[turnCount] === player1) {
                setStyle1(activeStyle);
                setStyle2(inactiveStyle);
            } else {
                setStyle1(inactiveStyle);
                setStyle2(activeStyle);
            }
        } ,2000)
        }
    })

    useEffect(() => {
        if (turnCount === 0) {
            return;
        }
        if (winner !== false) {
            setStyle1(inactiveStyle);
            setStyle2(inactiveStyle);
        } else if (turnOrder[turnCount] === player1) {
            setStyle1(activeStyle);
            setStyle2(inactiveStyle);
        } else {
            setStyle1(inactiveStyle);
            setStyle2(activeStyle);
        }
    }, [turnCount, turnOrder, player1, activeStyle, inactiveStyle, winner])

    useEffect(() => {
        setTimeout(() => {
            setCoinStyle({display: "none"})
            setBoardStyle({visiblity: "visible"})
        }, 2000)
    },[])

    useEffect(() => {
        if (player2.name === 'Computer') {
            setSliderStyle({display: "block"})
        }
    },[player2.name])

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value)
    }

    const backupCPUMove = () => {
        setCPUBackupToggle((prev) => prev+1)
    }

    return (
            <div id="boardcontainer" className="section" >
                <div className="gameboardplayercontainer" id="boardplayer1">
                    <img id="photo1" className="playerphoto" src={player1.photo} alt="player 1" style={style1}/>
                    <span className="name">{player1.name}</span>
                    <span className="record">{player1.wins}-{player1.losses}</span>
                </div>
                <div id="exterior">
                    <div className="coincontainer">
                        <div className="coinspacer"></div>
                        <img class="spinningcoin" src="https://media.giphy.com/media/NW4hBBjqMJfOg/source.gif" alt="spinning coin" style={coinStyle} />
                        <div className="coinspacer"></div>
                    </div>
                    <div id="board" style={boardStyle}>
                        {boxNums.map(i => {
                            return( 
                                <Box className="box" id={i}  
                                    turnCount={turnCount} setTurnCount={setTurnCount} 
                                    turnOrder={turnOrder}
                                    boardState={boardState} setBoardState={setBoardState} 
                                    player1={player1} player2={player2}
                                    currentPlayer={currentPlayer}
                                    winner={winner}
                                    newGameDisplay={newGameDisplay} setNewGameDisplay={setNewGameDisplay}
                                    cpuMove={cpuMove}
                                    />  
                            )
                        })}
                    </div>
                </div>
                <div className="gameboardplayercontainer" id="boardplayer2">
                    <img id="photo2" className="playerphoto" src={player2.photo} alt="player 2" style={style2} onClick={backupCPUMove} />
                    <span className="name">{player2.name}</span>
                    <span className="record">{player2.wins}-{player2.losses}</span>
                    <div id="cpucomment" style={commentStyle}>
                        <p className="comment" style={commentStyle} >{cpuComment}</p>
                    </div>
                    <div id="slidercontainer" style={sliderStyle}>
                        <form id="sliderForm">
                            <label>CPU Difficulty</label><br/>
                            <input id="cpudifficulty" name="difficulty" type="range" min="0" default="10" step="1" max="10" className="range" onChange={handleSliderChange} />
                            <p id="cpudifvalue">{sliderValue}</p>
                        </form>
</div>
                </div>
            </div>
        )
}