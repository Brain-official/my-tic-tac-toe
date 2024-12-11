export default function GameOver ({winner, draw, handleRestart}) {

    return(
        <div id="game-over">
            <h2>Game over</h2>
            {draw ? <p>It's a draw</p> : <p>{winner} won!</p>}
            <p><button onClick={handleRestart}>Rematch</button></p>
        </div>
    )
}

