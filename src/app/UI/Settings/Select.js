import React from "react";
import style from "./Settings.module.css";

import pawn from "../../../backend/objects/pawn.enum";
import { FilterColors } from "./ColorsFilter/ColorsFilter";
import enemys from "../../../backend/objects/enemy.enum";

const Select = (props) => {
    let colors = Object.entries(pawn).filter((element) => {
        if (element[0] === "empty") {
            return false;
        }
        return true;
    }).map((element) => {
        return element[0];
    });
    colors = FilterColors(colors, props.players, props.aboutPlayers, props.index);
    return (<div style={{ display: 'flex', flexDirection: 'column', width: '35%' }}>
        <select id={"Setting" + props.index} key={"Setting" + props.index} className={style.select}
            style={{ backgroundColor: props.element.color, color: "white" }} value={props.index} onChange={props.selectColorRef}>
            {
                colors.map((element, index) => {
                    return (<option value={element} style={{ backgroundColor: element }}
                        key={"Setting" + props.index + "option" + index}>
                        {element}
                    </option>);
                })
            }
        </select >
        <select className={style.select} style={{ backgroundColor: 'black', color: "white" }} onChange={props.selectEnemyRef}>
            {Object.entries(enemys).map((element, index) => {
                return (<option key={'enemys' + element[1]} value={[props.index, element[1]]}>{element[0]}</option>);
            })}
        </select>
    </div >);
}

export default Select