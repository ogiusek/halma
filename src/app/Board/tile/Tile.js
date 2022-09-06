import React, { useContext } from "react";
import style from "./Tile.module.css";
import Pawn from "./Pawn/Pawn";

import pawn from "../../../backend/objects/pawn.enum";
import AuthContext from "../../../backend/AuthContext";

function Tile(props) {
    const ctx = useContext(AuthContext);
    const select = () => {
        if (props.content == ctx.order[ctx.color]) {
            props.select({ x: props.xPos, y: props.yPos });
        }
    }
    const move = () => {
        props.move(props.xPos, props.yPos);
    }
    let pawnElement = <React.Fragment />;
    if (props.content != pawn.empty) {
        switch (props.selected) {
            case 1:
                pawnElement = (<div className={style.selected}>
                    <Pawn content={props.content} />
                </div>);
                break;
            case 0:
                pawnElement = (<div onClick={select}>
                    <Pawn content={props.content} />
                </div>);
                break;
        }
    } else if (props.selected == 2) {
        pawnElement = (<div className={style.shadow} onClick={move} />);
    }
    return (
        <div className={style.wraper + ' ' + ((props.xPos + props.yPos) % 2 == 1 && style.liteWraper) + ' ' + (props.selected && style.selected)}>
            {pawnElement}
        </ div >
    );
}

export default Tile;