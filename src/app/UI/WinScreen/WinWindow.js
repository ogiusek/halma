import React, { useContext } from "react";
import style from "./Win.module.css";

import AuthContext from "../../../backend/AuthContext";
import { CreateNewBoard } from "../../../backend/objects/board";
import { Reset } from "../../../backend/movesHistory";
import pawn from "../../../backend/objects/pawn.enum";

function WinScreen(props) {
    const ctx = useContext(AuthContext);
    const hide = () => {
        Reset('board');
        ctx.setBoard(CreateNewBoard(ctx.order));
        ctx.setColor(0);
        ctx.win(false);
        props.setShowSettings(true);
    }
    return (<div className={style.main}>
        <h1 className={style.h1}>{Object.entries(pawn)[ctx.order[props.color]][0]} won</h1>
        <button onClick={hide} className={style.button}>reset</button>
    </div>);
}

export default WinScreen;