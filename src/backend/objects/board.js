import pawn from "./pawn.enum";

let board = [];
for (let x = 0; x < 16; x++) {
    board.push([]);
    for (let y = 0; y < 16; y++) {
        board[x].push({ content: pawn.empty, missing: pawn.empty, x: x, y: y })
    }
}
for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[x].length; y++) {
        if (x + y <= 4 && x != 4 && y != 4) {
            board[x][y].content = pawn.yellow;
            board[x][y].missing = pawn.green;
        } else if (x + y >= 26 && x != 11 && y != 11) {
            board[x][y].content = pawn.green;
            board[x][y].missing = pawn.yellow;
        }
    }
}

function CreateNewBoard() {

}

export { CreateNewBoard };
export default board;