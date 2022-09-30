import CountScore from "./countScore";
import move from "../move";
import { GetInfo } from "./enemysList";

function Hard(board, order, color) {
    // let moves = [];
    // for (let x = 0; x < board.length; x++) {
    //     for (let y = 0; y < board[x].length; y++) {
    //         if (board[x][y].content === pawn.empty) {
    //             continue;
    //         }
    //         if (pawn[board[x][y].content] === order[color]) {
    //             GetMoves(board, x, y).map((element) => {
    //                 moves.push({ from: { x: x, y: y }, to: element });
    //             });
    //         }
    //     }
    // }
    // let bestScore = -5000;
    // let movePos = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };
    // for (let index = 0; index < moves.length; index++) {
    //     let newBoard = [...board.map((element) => { return [...element.map((element) => { return { ...element }; })]; })];
    //     newBoard = move(newBoard, moves[index].from, moves[index].to);
    //     let foundScore = CountScore(newBoard, order, order[color]);
    //     if (foundScore > bestScore) {
    //         movePos = moves[index];
    //         bestScore = foundScore;
    //     }
    // }
    // return movePos;
    let moves = GetInfo(board, order, color);

    let bestScore = -5000;
    let movePos = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };
    for (let index = 0; index < moves.length; index++) {
        let newBoard = [...board.map((element) => { return [...element.map((element) => { return { ...element }; })]; })];
        newBoard = move(newBoard, moves[index].from, moves[index].to);
        let foundScore = CountScore(newBoard, order, order[color]);
        if (foundScore > bestScore || (foundScore == bestScore && Math.random() >= 0.5)) {
            movePos = moves[index];
            bestScore = foundScore;
        }
    }

    return movePos;
}

export default Hard;