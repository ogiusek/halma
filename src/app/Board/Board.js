import React, { useContext, useEffect } from "react";
import style from "./Board.module.css";
import Tile from "./tile/Tile";

import AuthContext from "../../backend/AuthContext";
import GetMoves from "../../backend/getMoves";
import move from "../../backend/move";
import pawn from "../../backend/objects/pawn.enum";
import { SaveMove } from "../../backend/movesHistory";
import enemys from "../../backend/objects/enemy.enum";
import { Easy, Normal, Hard } from "../../backend/enemys/enemysList";

function Board(props) {
    const ctx = useContext(AuthContext);
    const aiCheck = (color) => {
        let move;
        switch (ctx.enemyOrder[color]) {
            case enemys.easy:
                move = Easy(props.board, ctx.order, color);
                break;
            case enemys.normal:
                move = Normal(props.board, ctx.order, color);
                break;
            case enemys.hard:
                move = Hard(props.board, ctx.order, color);
                break;
            default:
                return;
        }
        moveFront(move.to.x, move.to.y, move.from);
    }
    const moveFront = (x, y, from) => {
        let nFrom = from === undefined ? props.selected : from;
        ctx.setBoard(move(props.board, nFrom, { x: x, y: y }));
        setTimeout(() => {
            SaveMove('board', { from: nFrom, to: { x: x, y: y } });
        }, 5);
        let color = ctx.color + 1;
        if (color >= ctx.order.length) {
            color = 0;
        }
        ctx.setColor(color);
        if (props.board[x][y].missing === props.board[x][y].content) {
            if (checkWin(ctx.color)) {
                ctx.win(ctx.color);
            }
        }
    }
    const checkWin = (color) => {
        for (let x = 0; x < props.board.length; x++) {
            for (let y = 0; y < props.board[x].length; y++) {
                if (props.board[x][y].missing === pawn.empty) {
                    continue;
                }
                if (props.board[x][y].missing === Object.entries(pawn)[ctx.order[color]][0]) {
                    if (props.board[x][y].missing !== props.board[x][y].content) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    const shadowBlocks = GetMoves(props.board, props.selected.x, props.selected.y);
    useEffect(() => {
        props.setSelected({ x: -1, y: -1 });
    }, [props.board]);
    useEffect(() => {
        aiCheck(ctx.color);
    }, [ctx.color]);
    return (
        <div className={style.board}>
            {
                props.board.map((elements, index) => {
                    return (<div className={style.column} key={index}>
                        {elements.map((element, indey) => {
                            let selectedToTile;
                            for (let index = 0; index < shadowBlocks.length; index++) {
                                if (shadowBlocks[index].x === element.x && shadowBlocks[index].y === element.y) {
                                    selectedToTile = 2;
                                    break;
                                }
                            }
                            if (selectedToTile === undefined) {
                                selectedToTile = props.selected.x === element.x && props.selected.y === element.y ? 1 : 0;
                            }
                            return (
                                <Tile xPos={element.x} yPos={element.y}
                                    selected={selectedToTile} select={props.setSelected}
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