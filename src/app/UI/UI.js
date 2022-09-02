import React, { useContext } from "react";
import style from "./UI.module.css";

import AuthContext from "../../backend/colorApi";
import { GetLastMove } from "../../backend/movesHistory";

function UI(props) {
    const ctx = useContext(AuthContext);
    const back = () => {

        ctx.refresh();
    }
    const reset = () => {

        ctx.refresh();
    }
    return (<div className={style.wraper}>
        <button onClick={reset}>reset</button>
        <button onClick={back}>back</button>
    </div>);
}

export default UI;