import CountScore from "./countScore";
import move from "../move";
import { Easy, GetInfo } from "./enemysList";

function Normal(board, order, color, deep) {
    // const orginal = deep === undefined;
    // let deepVal = deep === undefined ? 2 : deep;
    // console.log(deepVal);
    // let moves = GetInfo(board, order, color);

    // let bestScore = -5000;
    // let movePos = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };
    // for (let index = 0; index < moves.length; index++) {
    //     let newBoard = [...board.map((element) => { return [...element.map((element) => { return { ...element }; })]; })];
    //     newBoard = move(newBoard, moves[index].from, moves[index].to);
    //     if (deepVal > 0) {
    //         const nMove = Normal(newBoard, order, color, deepVal - 1);
    //         newBoard = move(board, nMove.from, nMove.to);
    //     }
    //     let foundScore = CountScore(newBoard, order, order[color]);
    //     if (foundScore > bestScore) {
    //         movePos = moves[index];
    //         bestScore = foundScore;
    //     }
    // }
    let moves = GetInfo(board, order, color);

    let bestScore = -5000;
    let movePos = { from: { x: 0, y: 0 }, to: { x: 0, y: 0 } };
    for (let index = 0; index < moves.length; index++) {
        let newBoard = [...board.map((element) => { return [...element.map((element) => { return { ...element }; })]; })];
        newBoard = move(newBoard, moves[index].from, moves[index].to);
        let foundScore = CountScore(newBoard, order, order[color]);
        if (foundScore >= bestScore) {
            movePos = moves[index];
            bestScore = foundScore;
        }
    }
    return movePos;
}

export default Normal;