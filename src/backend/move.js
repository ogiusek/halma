import board from "./objects/board";
import pawn from "./objects/pawn.enum";
import { ChangeColor } from "./colorTurn";

function move(from, to) {
    ChangeColor();
    board[to.x][to.y].content = board[from.x][from.y].content;
    board[from.x][from.y].content = pawn.empty;
}

export default move;