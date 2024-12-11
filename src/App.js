import './App.css';
import Player from "./Components/Player"
import Gameboard from './Components/Gameboard';
import Log from './Components/Logs';
import { useState } from 'react';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './Components/GameOver';

const deriveActivePlayer = (gameTurns) => {
  let currentTurn = "X"

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentTurn = "O"
  }
  return currentTurn;
}


const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]


function App() {
  //const [currentPlayer, setCurrentPlayer] = useState
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayersName] = useState({
    "X": "Player 1",
    "O": "Player 2"
  })


  const activePlayer = deriveActivePlayer(gameTurns);
  
  var gameboard = [...initialGameboard.map((array) => [...array])]; //making a deep copy of the gameboard array for addition of brand new array

  for (const turn of gameTurns) {
      //Destructuring the object of turn in the turns array.
      const {square, player} = turn;
      const {row, col} = square

      //Updating the gameboard with the player's symbol at the clicked square.
      gameboard[row][col] = player;
  }


  let winner = null;
  let hasDraw = gameTurns.length === 9 && !winner;

  //Looping through the winning combinations to check if player moves matches any of the combinations.
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameboard[combination[2].row][combination[2].column]
    

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol]; 
    }

  }


  const handleRestart = ()=> {
    setGameTurns([])
  }

  const handleSelectSquare = (rowIndex, colIndex) => {
    //setCurrentPlayer((activePlayer) => activePlayer === "X"? "O": "X")
    setGameTurns((prevGameTurns) => {
      const currentTurn = deriveActivePlayer(prevGameTurns)
      // Create a new object with the current square and player information, and add it to the beginning of the array
      // Add the current turn to the beginning of the array, effectively shifting all previous turns down one position
      const updatedGameTurn = [
        {square: {row: rowIndex, col: colIndex}, player: currentTurn},
        ...prevGameTurns
      ]

      return updatedGameTurn;
    })

  }


  const handlePlayerNameChange= (symbol, newName) => {
    setPlayersName((prevPlayerName) => {
      return{
        ...prevPlayerName,
      [symbol]: newName
      }
    })
  }
  

  return (
    <div className="App">
      <main>
        <div id="game-container">
          <ol id="players" className='highlight-player'>
            <Player initialName="Player 1" symbol="X" isActive={activePlayer=== "X"} onChangeName={handlePlayerNameChange}/>
            <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerNameChange}/>
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} draw={hasDraw} handleRestart={handleRestart}/>}
          <Gameboard  onSelectSquare={handleSelectSquare}  turns={gameTurns} board={gameboard}/>  {/* This component will handle the game logic and render the board */}
        </div>

        <Log gameLog={gameTurns}/>
      </main>
    </div>
  );
}

export default App;

