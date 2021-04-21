import './playerselect.css';
import alexPhoto from './alexsunglasses.jpg';
import davidPhoto from './david.jpg';
import jessPhoto from './jess.jpg';
import background from './background.jpg';
import computerPhoto from './computer.jpg';
import { useEffect } from 'react';

export const PlayerSelect = ({
    player1, setPlayer1, 
    player2, setPlayer2, 
    setPlayerMessage,
    playerSelectDisplay, setPlayerSelectDisplay,
    boardDisplay, setBoardDisplay,
    turnOrder, setTurnOrder,
    turnCount
    }) => {
    const alex = 
        {name: 'Alex',
        photo: alexPhoto,
        wins: 0,
        losses: 0
        };
    const david = 
        {name: 'David',
        photo: davidPhoto,
        wins: 0,
        losses: 0
    };
    const jess = 
        {name: 'Jess',
        photo: jessPhoto,
        wins: 0,
        losses: 0
    };
    const computer = 
        {name: 'Computer',
        photo: computerPhoto,
        wins: 0,
        losses: 0
    };
    
    useEffect(() => {
        if (player1 !== null && player2 !== null) {
            let list = [];
            let shuffledVal;
            for (let i = 5; i>0; i--) {
                list.push(player1);
                list.push(player2);
            }
            let randoCalcission = Math.floor(Math.random()*2)
            if (randoCalcission === 0) {
                shuffledVal = list.shift();
                list.push(shuffledVal)
            }
            setTurnOrder(list)
        }
    },[player1, player2,setTurnOrder])

    const handlePlayer1Change = event => {
        if (event.target.id === 'Alex1') {
            setPlayer1(alex);
        } else if (event.target.id === 'Jess1') {
            setPlayer1(jess);
        } else if (event.target.id === 'David1') {
            setPlayer1(david);
        }
    }

    const handlePlayer2Change = event => {
        if (event.target.id === 'Alex2') {
            setPlayer2(alex);
        } else if (event.target.id === 'Jess2') {
            setPlayer2(jess);
        } else if (event.target.id === 'David2') {
            setPlayer2(david);
        } else if (event.target.id === 'Computer2') {
            setPlayer2(computer);
        }}

    const handleClick = () => {
        if (player1 === null || player2 === null) {
            setPlayerMessage('Select Both Players')
        } else if (player1.name === player2.name) {
            setPlayerMessage(`Pick Two Different Players`);
        } else {
            setPlayerMessage(`${player1.name} vs. ${player2.name} `);
            setBoardDisplay(true);
            setPlayerSelectDisplay(false)
            setTimeout(() => {
                setPlayerMessage('Flipping a coin...')
                setTimeout(() => {
                    setPlayerMessage(`${turnOrder[turnCount].name} wins the coin toss!`)
                },1000)
            }, 1000)
        }
    }


        
    return (
            <div id="playerselect">
                {/* <p>{turnOrder[turnCount] ? turnOrder : 'null'}</p> */}
                <div className="flexspacer"></div>
                <div className="playerchoicecontainer" id="playerchoice1">
                    <h3>{player1 ? player1.name : 'Select Player 1'}</h3>
                    <img id="photo1" class="playerPhoto" src={player1 ? player1.photo: background} alt="player1"/>
                    <div className="formcontainer">
                        <div className="spacer"></div>
                        <form className="playerRadio">
                            <input id="Alex1" name="player1" type="radio"  className="radiobutton" onClick={handlePlayer1Change}  />
                            <label>Alex</label><br/>
                            <input id="David1" name="player1" type="radio"  className="radiobutton" onClick={handlePlayer1Change} />
                            <label>David</label><br/>
                            <input id="Jess1" name="player1" type="radio" className="radiobutton" onClick={handlePlayer1Change} />
                            <label>Jess</label><br/>
                        </form>
                        <div className="spacer"></div>
                    </div>
                </div>
                <button className="submit" onClick={handleClick} >Play!</button>
                <div className="playerchoicecontainer" id="playerchoice2">
                    <h3>{player2 ? player2.name : 'Select Player 2'}</h3>
                    <img id="photo2" class="playerPhoto" src={player2 ? player2.photo: background} alt="player2"/>
                    <div className="formcontainer">
                        <div className="spacer"></div>
                        <form className="playerRadio">
                            <input id="Alex2" name="player2" type="radio" className="radiobutton" onClick={handlePlayer2Change} />
                            <label>Alex</label><br/>
                            <input id="David2" name="player2" type="radio" className="radiobutton" onClick={handlePlayer2Change} />
                            <label>David</label><br/>
                            <input id="Jess2" name="player2" type="radio" className="radiobutton" onClick={handlePlayer2Change} />
                            <label>Jess</label><br/>
                            <input id="Computer2" name="player2" type="radio" className="radiobutton" onClick={handlePlayer2Change} />
                            <label>Computer</label><br/>
                        </form>
                        <div className="spacer"></div>
                    </div>
                </div>
                <div className="flexspacer"></div>              
            </div>
        )
    }