import React, { useEffect, useState } from "react";
import style from "./Settings.module.css";

import pawn from "../../../backend/objects/pawn.enum";
import enemys from "../../../backend/objects/enemy.enum";
import Select from "./Select";

function Settings(props) {
    // props.order
    // props.setOrder
    const [players, setPlayers] = useState(2);
    const [aboutPlayers, setAboutPlayers] = useState(getAboutPlayers(players));
    const setPlayersRef = (event) => {
        setAboutPlayers(getAboutPlayers(event.target.value));
        setPlayers(event.target.value);
    }
    const selectRef = (event) => {
        const lastColor = event.target.innerText.split('\n')[0];
        const newColor = event.target.value;
        let newAboutPlayers = [...aboutPlayers.map(element => { return { ...element } })];
        for (let index = 0; index < newAboutPlayers.length; index++) {
            if (newAboutPlayers[index].color == lastColor) {
                newAboutPlayers[index].color = newColor;
                break;
            }
        }
        setAboutPlayers([...newAboutPlayers.map(element => { return { ...element } })]);
    }

    const confirmSettingsHandler = (event) => {
        event.preventDefault();

    }

    return (<form onSubmit={confirmSettingsHandler} className={style.main}>
        <div className={style.inputs}>
            <input type="radio" name="players" value={2} onChange={setPlayersRef} className={style.input} checked={players == 2} />
            <label htmlFor={2} className={style.label}>2 players</label><br />
            <input type="radio" name="players" value={4} onChange={setPlayersRef} className={style.input} checked={players == 4} />
            <label htmlFor={4} className={style.label}>4 players</label><br />
        </div>
        <div className={style.selects}>
            {aboutPlayers.map((element, index) => {
                return <Select element={element} index={index} players={players} aboutPlayers={aboutPlayers} selectRef={selectRef} key={"selelect" + index} />
            })}
        </div>
        <button type="submit" className={style.button}>Play</button>
    </form >);
}

const getAboutPlayers = (players) => {
    let aboutPlayers = [];
    for (let index = 0; index < players; index++) {
        aboutPlayers.push({ color: Object.entries(pawn)[index + 1][0], enemy: enemys.player });
    }
    // console.log(aboutPlayers);
    return aboutPlayers;
}

export default Settings;