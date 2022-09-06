import React from "react";
import style from "./Pawn.module.css";

import pawn from "../../../../backend/objects/pawn.enum";

function Pawn(props) {
    let color = Object.entries(pawn);
    for (let index = 0; index < color.length; index++) {
        if (color[index][1] == props.content) {
            color = color[index][0];
            break;
        }
    }

    return (
        <div style={{ backgroundColor: color }} className={style.pawn} />
    );
}

export default Pawn;