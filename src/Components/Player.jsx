
import { useState } from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    const handleEditClick = () => {
        setIsEditing((isEditing) => !isEditing); //This is the best of scheduling update instead of updating state instead of setIsEditing(!isEditing )
        if(isEditing){
            onChangeName(symbol, playerName) // Call the parent component's function to update the player's name
        }
    }

    const handleInputChange = (e) => {
        setPlayerName(e.target.value)
    }

    return(
        <li className={isActive? "active": undefined}>
            <span className="player">
                {isEditing? <input onChange={handleInputChange} value={playerName}/> :<span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span> 
            <button onClick={handleEditClick}>{isEditing? "Save": "Edit"}</button>
        </li>
    )
}


