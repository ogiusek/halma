import Easy from "./easyMove";
import Normal from "./normalMove";
import Hard from "./hardMove";

import pawn from "../objects/pawn.enum";
import GetMoves from "../getMoves";

function GetInfo(board, order, color) {
    let moves = [];
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (board[x][y].content === pawn.empty) {
                continue;
            }
            if (pawn[board[x][y].content] === order[color]) {
                GetMoves(board, x, y).map((element) => {
                    moves.push({ from: { x: x, y: y }, to: element });
                });
            }
        }
    }
    return moves;
}
export { GetInfo };
export { Easy, Normal, Hard };