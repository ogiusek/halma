import React, { useContext, useState } from "react";
import style from "./Board.module.css";
import Tile from "./tile/Tile";

import AuthContext from "../../backend/AuthContext";
import GetMoves from "../../backend/getMoves";
import move from "../../backend/move";
import { SaveMove } from "../../backend/movesHistory";

function Board(props) {
    const ctx = useContext(AuthContext);
    const [selected, setSelected] = useState({ x: -1, y: -1 });
    const select = (value) => {
        setSelected(value);
    }
    const moveFront = (x, y) => {
        ctx.setBoard(move(props.board, selected, { x: x, y: y }));
        SaveMove('board', { from: selected, to: { x: x, y: y } });
        let color = ctx.color + 1;
        if (color >= ctx.order.length) {
            color = 0;
        }
        ctx.setColor(color);
        setSelected({ x: -1, y: -1 });
    }
    const shadowBlocks = GetMoves(props.board, selected.x, selected.y);
    return (
        <div className={style.board}>
            {
                props.board.map((elements, index) => {
                    return (<div className={style.column} key={index}>
                        {elements.map((element, indey) => {
                            let selectedToTile;
                            for (let index = 0; index < shadowBlocks.length; index++) {
                                if (shadowBlocks[index].x == element.x && shadowBlocks[index].y == element.y) {
                                    selectedToTile = 2;
                                    break;
                                }
                            }
                            if (selectedToTile == undefined) {
                                selectedToTile = selected.x == element.x && selected.y == element.y ? 1 : 0;
                            }
                            return (
                                <Tile xPos={element.x} yPos={element.y}
                                    selected={selectedToTile} select={select}
                                    move={moveFront}
                                    element={element}
                                    key={indey + ''} />
                            )
                        })}
                    </div>)
                })
            }
        </div>
    );
}

export default Board;