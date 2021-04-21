import {NewGame} from './newGame';

export const NewGameContainer = ({
    winner, setWinner,
    newGameDisplay, setNewGameDisplay,
    boardState, setBoardState,
    turnCount, setTurnCount,
    turnOrder, setTurnOrder,
    setPlayerMessage,
    player1, setPlayer1, 
    player2, setPlayer2, 
    playerSelectDisplay, setPlayerSelectDisplay,
    setBoardDisplay,
    }) => {

    if (newGameDisplay === true) {
        return (
            <div> 
                <NewGame
                    winner={winner} setWinner={setWinner}
                    newGameDisplay={newGameDisplay} setNewGameDisplay={setNewGameDisplay}
                    boardState={boardState} setBoardState={setBoardState} 
                    turnCount={turnCount} setTurnCount={setTurnCount}
                    turnOrder={turnOrder} setTurnOrder={setTurnOrder}   
                    setPlayerMessage={setPlayerMessage}
                    player1={player1} setPlayer1={setPlayer1} player2={player2} setPlayer2={setPlayer2}
                    setBoardDisplay={setBoardDisplay}
                    setPlayerSelectDisplay={setPlayerSelectDisplay}
                    />
            </div>
        )
    } else {
        return null;
    }
}