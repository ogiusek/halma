import React, { useContext } from "react";
import style from "./UI.module.css";

import AuthContext from "../../backend/AuthContext";
import { GetLastMove, Reset } from "../../backend/movesHistory";
import move from "../../backend/move";
import { CreateNewBoard } from "../../backend/objects/board";

function UI(props) {
    const ctx = useContext(AuthContext);
    const back = () => {
        const lastBoard = GetLastMove('board');
        if (lastBoard != null) {
            ctx.setBoard(move(ctx.board, lastBoard.to, lastBoard.from));
            ctx.setColor(ctx.color - 1 < 0 ? ctx.order.length - 1 : ctx.color - 1);
        }
    }
    const reset = () => {
        Reset('board');
        ctx.setBoard(CreateNewBoard(ctx.order));
        ctx.setColor(0);
        props.setShowSettings(true);
    }
    return (<div className={style.wraper}>
        <button onClick={back}>back</button>
        <button onClick={reset}>reset</button>
    </div>);
}

export default UI;