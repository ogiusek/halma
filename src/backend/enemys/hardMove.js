import GetMoves from "../getMoves";
import { SaveMove, Back, GetLastMove } from "../movesHistory";
import CountScore from "./countScore";

function Hard(board, order, color) {
    console.log(color);
    console.log(CountScore(board, order, color));
}

export default Hard;