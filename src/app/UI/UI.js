import React, { useContext } from "react";
import style from "./UI.module.css";

import AuthContext from "../../backend/AuthContext";
import { Back, Reset } from "../../backend/movesHistory";
import move from "../../backend/move";
import { CreateNewBoard } from "../../backend/objects/board";
import enemys from "../../backend/objects/enemy.enum";

function UI(props) {
    const ctx = useContext(AuthContext);
    const back = (color, board) => {
        let nBoard = board === undefined ? ctx.board : board;
        let nColor = ((typeof color !== typeof ctx.color) ?
            (ctx.color - 1 < 0 ? ctx.order.length - 1 : ctx.color - 1) :
            (color - 1 < 0 ? ctx.order.length - 1 : color - 1));
        const lastBoard = Back('board');
        if (lastBoard !== null) {
            nBoard = move(nBoard, lastBoard.to, lastBoard.from);
            props.setSelected({ x: -1, y: -1 });
            if (ctx.enemyOrder[nColor] !== enemys.player) {
                back(nColor, nBoard);
            } else {
                ctx.setBoard(nBoard);
                ctx.setColor(nColor);
            }
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