import './newGame.css';

export const NewGame = ({
    setWinner,
    setNewGameDisplay,
    setBoardState,
    turnCount, setTurnCount,
    turnOrder, setTurnOrder,
    setPlayerMessage,
    setPlayer1, 
    setPlayer2, 
    setPlayerSelectDisplay,
    setBoardDisplay
}) => {
    
    const reRando = () => {
        let order = turnOrder;
        let shuffledVal;
        let calc = Math.floor(Math.random()*2);
        if (calc === 0) {
            shuffledVal = order.shift();
            order.push(shuffledVal);
        }
        return order;
    }

    const handlePlayAgain = () => {
        let newOrder = reRando()
        setTurnOrder(newOrder)
        setWinner(false);
        setBoardState(Array(9).fill(0));
        setTurnCount(0);
        setPlayerMessage(`${turnOrder[0].name} wins the coin toss!`)
        setNewGameDisplay(false);
    }

    const handleNewPlayers = () => {
        setPlayer1(null);
        setPlayer2(null);
        setTurnOrder([]);
        setTurnCount(0);
        setPlayerMessage('Select Players');
        setPlayerSelectDisplay(true);
        setBoardDisplay(false);
        setBoardState(Array(9).fill(0));
        setWinner(false); 
        setNewGameDisplay(false);
    }

    return (
        <div id="newgame">
            <div className="buttoncontainers">
                <div className="spacer"></div>
                <button className="playagain" onClick={handlePlayAgain}>Play Again?</button>
            </div>
            <div className="buttoncontainers">
                <button className="playagain" onClick={handleNewPlayers}>Pick New Players?</button>
                <div className="spacer"></div>
            </div>
        </div>
    )
}