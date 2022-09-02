// import board from "./objects/board";
import pawn from "./objects/pawn.enum";

function GetMoves(board, firstX, firstY) {
    if (firstX == -1 || firstY == -1) {
        return [];
    }
    if (board[firstX][firstY].content == pawn.empty) {
        return [];
    }
    let blocks = [];
    let directions = [
        { x: 1, y: 0 },
        { x: -1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: -1 }
    ];
    const Check = (x, y, rDir = undefined) => {
        for (let index = 0; index < directions.length; index++) {
            if (index == rDir) {
                continue;
            }
            let nextX = x + directions[index].x;
            let nextY = y + directions[index].y;
            if (nextX < 0 || nextY < 0 || nextX >= 16 || nextY >= 16) {
                continue;
            }
            if (board[nextX][nextY].content == pawn.empty) {
                if (rDir == undefined) {
                    blocks.push({ x: nextX, y: nextY });
                }
                continue;
            }

            nextX = nextX + directions[index].x;
            nextY = nextY + directions[index].y;
            if (nextX < 0 || nextY < 0 || nextX >= 16 || nextY >= 16) {
                continue;
            }
            if (board[nextX][nextY].content == pawn.empty) {
                if (blocks.filter((element) => {
                    return (element.x === nextX && element.y === nextY);
                }).length > 0) {
                    continue;
                }
                blocks.push({ x: nextX, y: nextY });
                Check(nextX, nextY, index % 2 == 0 ? index + 1 : index - 1);
                continue;
            }
        }
    }
    Check(firstX, firstY);
    return blocks;
}

export default GetMoves;