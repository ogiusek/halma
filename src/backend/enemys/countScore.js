import pawn from "../objects/pawn.enum";

function CountScore(board, order, colorText) {
    let color = typeof colorText === typeof "" ? ColorToInt(order, colorText) : colorText;
    let score = 0;
    let enemyScore = 0;
    let usedContent = [];
    let usedMissed = [];
    for (let index = 0; index < order.length; index++) {
        let blocks = [];
        let missing = [];
        for (let x = 0; x < board.length; x++) {
            for (let y = 0; y < board[x].length; y++) {
                const cont = board[x][y].content === Object.entries(pawn)[order[index]][0] && !Found(usedContent, { x: x, y: y });
                const miss = board[x][y].missing === Object.entries(pawn)[order[index]][0] && !Found(usedMissed, { x: x, y: y });
                if ((cont && miss) || (!cont && !miss)) {
                    continue;
                }
                if (cont) {
                    blocks.push({ x: x, y: y });
                    usedContent.push({ x: x, y: y });
                    continue;
                }
                if (miss) {
                    missing.push({ x: x, y: y });
                    usedMissed.push({ x: x, y: y });
                    continue;
                }
            }
        }
        let colorScore = 0;
        for (let index = 0; index < blocks.length; index++) {
            const x = blocks[index].x - missing[index].x < 0 ? -(blocks[index].x - missing[index].x) : (blocks[index].x - missing[index].x);
            const y = blocks[index].y - missing[index].y < 0 ? -(blocks[index].y - missing[index].y) : (blocks[index].y - missing[index].y);
            const baba = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
            colorScore -= baba;
        }
        if (index === color) {
            score -= colorScore;
        } else {
            enemyScore -= colorScore / 3;
        }
    }
    return -(score - enemyScore);
}

function Found(list, element) {
    for (let index = 0; index < list.length; index++) {
        if (list[index].x === element.x && list[index].y === element.y) {
            return true;
        }
    }
    return false;
}

function ColorToInt(order, color) {
    let enteries = Object.entries(pawn);
    for (let index = 0; index < order.length; index++) {
        if (enteries[order[index]][1] == color) {
            return index;
        }
    }
    return -1;
}

export default CountScore;