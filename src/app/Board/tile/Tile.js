import React, { useContext } from "react";
import style from "./Tile.module.css";

import Pawn from "./Pawn/Pawn";
import pawn from "../../../backend/objects/pawn.enum";
import AuthContext from "../../../backend/AuthContext";
import { GetColor, GetShadow } from "./TileCode/TileCode";
import { GetLastMove } from "../../../backend/movesHistory";

function Tile(props) {
    const ctx = useContext(AuthContext);
    const select = () => {
        if (props.element.content === Object.entries(pawn)[ctx.order[ctx.color]][0]) {
            props.select({ x: props.xPos, y: props.yPos });
        }
    }
    const move = () => {
        props.move(props.xPos, props.yPos);
    }
    let pawnElement = <React.Fragment />;
    if (props.element.content != pawn.empty) {
        switch (props.selected) {
            case 1:
                pawnElement = (<div className={style.selected}>
                    <Pawn content={props.element.content} />
                </div>);
                break;
            case 0:
                pawnElement = (<div onClick={select}>
                    <Pawn content={props.element.content} />
                </div>);
                break;
        }
    } else if (props.selected === 2) {
        pawnElement = (<div className={style.shadow} onClick={move} />);
    }
    let lastMoveFrom = GetLastMove('board');
    const lastMoveTo = lastMoveFrom !== null ? (lastMoveFrom.to.x === props.xPos && lastMoveFrom.to.y === props.yPos) : false;
    lastMoveFrom !== null && (lastMoveFrom = (lastMoveFrom.from.x === props.xPos && lastMoveFrom.from.y === props.yPos));
    console.log(lastMoveTo);
    return (
        <div className={style.wraper + ' ' +
            ((props.xPos + props.yPos) % 2 === 1 && style.liteWraper) + ' ' +
            ((props.selected || lastMoveFrom) && style.selected) + ' ' +
            (lastMoveTo === true ? style.shadow : '')}
            style={GetShadow(GetColor(props, ctx))}>
            {pawnElement}
        </ div >
    );
}

export default Tile;