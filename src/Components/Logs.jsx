

export default function Log({gameLog}) {

    // var logString = "";
    // for (const log of gameLog) {
    //     const {square, player} = log;
    //     const {row, col} = square;
    //     logString += `${player} played at position [${row}, ${col}]\n`;
    // }
    return(
        <ol id='log'>
            {gameLog.map(turn => 
            <li key={`${turn.square.row}${turn.square.col}`}>
                {turn.player} selected {turn.square.row}, {turn.square.col}
            </li>)}
        </ol>
    )
}
