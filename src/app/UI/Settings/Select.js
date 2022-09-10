import React from "react";
import style from "./Settings.module.css";

import pawn from "../../../backend/objects/pawn.enum";
import { FilterColors } from "./ColorsFilter/ColorsFilter";

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
    return (<select id={"Setting" + props.index} key={"Setting" + props.index} className={style.select}
        style={{ backgroundColor: props.element.color, color: "white" }} value={props.index} onChange={props.selectRef}>
        {
            colors.map((element, index) => {
                return (<option value={element} style={{ backgroundColor: element, color: "white" }}
                    key={"Setting" + props.index + "option" + index} onChange={props.selectRef}>
                    {element}
                </option>);
            })
        }
    </select >);
}

export default Select