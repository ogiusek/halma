import pawn from "./objects/pawn.enum";
import { SaveMove } from "./movesHistory";


function move(board, from, to) {
    board[to.x][to.y].content = board[from.x][from.y].content;
    board[from.x][from.y].content = pawn.empty;
    return board;
}

export default move;