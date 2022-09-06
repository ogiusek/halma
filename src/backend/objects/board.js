import pawn from "./pawn.enum";

let board = [];
function CreateNewBoard(colors) {
    let newBoard = [];
    for (let x = 0; x < 16; x++) {
        newBoard.push([]);
        for (let y = 0; y < 16; y++) {
            newBoard[x].push({ content: pawn.empty, missing: pawn.empty, x: x, y: y })
        }
    }
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (x + y <= 4 && x != 4 && y != 4) {
                newBoard[x][y].content = pawn.yellow;
                newBoard[x][y].missing = pawn.green;
            } else if (x + y >= 26 && x != 11 && y != 11) {
                newBoard[x][y].content = pawn.green;
                newBoard[x][y].missing = pawn.yellow;
            }
        }
    }
    return newBoard;
}

function SetBoard(newBoard) {
    board = newBoard;
}

board = CreateNewBoard();

export { CreateNewBoard, SetBoard };
export default board;