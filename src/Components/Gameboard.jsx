// import { useState } from "react"


export default function Gameboard({onSelectSquare, board}) {
    // const [gameboard, setGameboard] = useState(initialGameboard);

    // const handleSquareClick = (rowIndex, colIndex) => {
    //     setGameboard((prevGameboard) => {
    //         const updatedGameboard = [...prevGameboard.map((innerArray) => [...innerArray])]
    //         updatedGameboard[rowIndex][colIndex]= activePlayerSymbol
    //         return updatedGameboard
    //     })  

    //     onSelectSquare();
    // }

    

    return(
        <ol id="game-board">
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((colSymbol, colIndex)=> <li key={colIndex}>
                        <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled={colSymbol !== null}>
                            {colSymbol}
                        </button>
                    </li>)}
                </ol>
            </li>)}
        </ol>
    )
}

