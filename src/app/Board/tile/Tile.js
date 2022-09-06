import React, { useContext } from "react";
import style from "./Tile.module.css";
import Pawn from "./Pawn/Pawn";

import pawn from "../../../backend/objects/pawn.enum";
import AuthContext from "../../../backend/AuthContext";

function Tile(props) {
    const ctx = useContext(AuthContext);
    const select = () => {
        if (props.element.content == ctx.order[ctx.color]) {
            props.select({ x: props.xPos, y: props.yPos });
        }
    }
    const move = () => {
        props.move(props.xPos, props.yPos);
    }
    const GetShadow = () => {
        let color = props.element.missing;
        for (let index = 0; index < ctx.order.length; index++) {
            if (color == ctx.order[index]) {
                color = Object.entries(pawn)[ctx.order[index]][0];
                break;
            }
        }
        return {
            WebkitBoxShadow: "inset 0px 0px 15px 0px " + color,
            MozBoxShadow: "inset 0px 0px 15px 0px " + color,
            BoxShadow: "inset 0px 0px 15px 0px " + color
        };
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
    } else if (props.selected == 2) {
        pawnElement = (<div className={style.shadow} onClick={move} />);
    }
    return (
        <div className={style.wraper + ' ' + ((props.xPos + props.yPos) % 2 == 1 && style.liteWraper) + ' ' + (props.selected && style.selected)} style={GetShadow()}>
            {/* <Shadow color={"red"} ></Shadow> */}
            {pawnElement}
        </ div >
    );
}

export default Tile;