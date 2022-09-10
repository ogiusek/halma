import React, { useState } from "react";
import style from "./Settings.module.css";

import enemys from "../../../backend/objects/enemy.enum";
import Select from "./Select";
import { GetAboutPlayers, ToOrder } from "./ColorsFilter/ColorsFilter";

function Settings(props) {
    const [players, setPlayers] = useState(2);
    const [aboutPlayers, setAboutPlayers] = useState(GetAboutPlayers(players));
    const setPlayersRef = (event) => {
        setAboutPlayers(GetAboutPlayers(event.target.value));
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
        // console.log(aboutPlayers);
        props.setOrder(ToOrder(aboutPlayers));
        props.setShowSettings(false);
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

export default Settings;