import pawn from "./objects/pawn.enum";

function move(board, from, to) {
    board[to.x][to.y].content = board[from.x][from.y].content;
    board[from.x][from.y].content = pawn.empty;
    return board;
}

export default move;