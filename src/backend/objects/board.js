import pawn from "./pawn.enum";

let board = [];
function CreateNewBoard(colors) {
    colors = colors.map((element) => {
        return Object.entries(pawn)[Number(element)][0];
    });
    let newBoard = [];
    for (let x = 0; x < 16; x++) {
        newBoard.push([]);
        for (let y = 0; y < 16; y++) {
            newBoard[x].push({ content: pawn.empty, missing: pawn.empty, x: x, y: y })
        }
    }
    for (let x = 0; x < newBoard.length; x++) {
        for (let y = 0; y < newBoard[x].length; y++) {
            if (x + y <= 4 && x !== 4 && y !== 4) {
                newBoard[x][y].content = colors[0];
                newBoard[x][y].missing = colors[1];
            } else if (x + y >= 26 && x !== 11 && y !== 11) {
                newBoard[x][y].content = colors[1];
                newBoard[x][y].missing = colors[0];
            } else if (colors.length >= 2) {
                if (x > 11 && y < 4) {
                    if (!((x === 12 || x === 13) && (y === 3 || y === 2) && !(x !== 12 && y !== 3))) {
                        newBoard[x][y].content = colors[2];
                        newBoard[x][y].missing = colors[3];
                    }
                } else if (y > 11 && x < 4) {
                    if (!((y === 12 || y === 13) && (x === 3 || x === 2) && !(y !== 12 && x !== 3))) {
                        newBoard[x][y].content = colors[3];
                        newBoard[x][y].missing = colors[2];
                    }
                }
            }
        }
    }
    return newBoard;
}

function SetBoard(newBoard) {
    board = newBoard;
}

board = CreateNewBoard([1, 2]);

export { CreateNewBoard, SetBoard };
export default board;