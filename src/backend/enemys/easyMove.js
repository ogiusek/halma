import { SaveMove, Back, GetLastMove } from "../movesHistory";
import GetMoves from "../getMoves";
import CountScore from "./countScore";
import move from "../move";
import pawn from "../objects/pawn.enum";

function Easy(board, order, color) {
    // console.log(order[color]);
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
    // console.log(moves);
    let bestScore = -500;
    let movePos = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };
    for (let index = 0; index < moves.length; index++) {
        let newBoard = [...board.map((element) => { return [...element.map((element) => { return { ...element }; })]; })];
        // console.log(moves[index]);
        newBoard = move(newBoard, moves[index].from, moves[index].to);
        let foundScore = CountScore(newBoard, order, order[color]);
        // console.log(foundScore);
        if (foundScore >= bestScore) {
            if (foundScore === bestScore) {
                if (Math.random() >= 0.5) {
                    bestScore = foundScore;
                    movePos = moves[index];
                }
            } else {
                bestScore = foundScore;
                movePos = moves[index];
            }
        }
    }
    // console.log(movePos);
    return movePos;
}

export default Easy;