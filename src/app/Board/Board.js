import React, { useContext, useState } from "react";
import style from "./Board.module.css";
import Tile from "./tile/Tile";

import AuthContext from "../../backend/AuthContext";
import GetMoves from "../../backend/getMoves";
import move from "../../backend/move";
import { SaveMove } from "../../backend/movesHistory";
import pawn from "../../backend/objects/pawn.enum";

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
        if (ctx.board[x][y].missing === ctx.board[x][y].content) {
            if (checkWin(ctx.color)) {
                ctx.win();
            }
        }
        ctx.setColor(color);
        setSelected({ x: -1, y: -1 });

    }
    const checkWin = (color) => {
        for (let x = 0; x < ctx.board.length; x++) {
            for (let y = 0; y < ctx.board[x].length; y++) {
                if (ctx.board[x][y].missing === pawn.empty) {
                    continue;
                }
                if (ctx.board[x][y].missing === color) {
                    if (ctx.board[x][y].missing !== ctx.board[x][y].content) {
                        return false;
                    }
                }
            }
        }
        return true;
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