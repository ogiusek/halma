import React from "react";
import style from "./Pawn.module.css";

function Pawn(props) {
    let color = props.content;
    return (
        <div style={{ backgroundColor: color }} className={style.pawn} />
    );
}

export default Pawn;