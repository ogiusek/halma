import React, { useContext, useState } from "react";
import style from "./Board.module.css";
import Tile from "./tile/Tile";

import AuthContext from "../../backend/colorApi";
import GetMoves from "../../backend/getMoves";
import move from "../../backend/move";
import board from "../../backend/objects/board";

function Board() {
    const ctx = useContext(AuthContext);
    const [selected, setSelected] = useState({ x: -1, y: -1 });

    const select = (value) => {
        setSelected(value);
    }

    const moveFront = (x, y) => {
        move(selected, { x: x, y: y });
        setTimeout(() => {
            setSelected({ x: -1, y: -1 });
        }, 1);
        ctx.refresh();
    }

    const shadowBlocks = GetMoves(board, selected.x, selected.y);
    return (
        <div className={style.board}>
            {
                board.map((elements, index) => {
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
                                    content={element.content}
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