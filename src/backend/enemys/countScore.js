import pawn from "../objects/pawn.enum";

function CountScore(board, order, colorText) {
    let color = typeof colorText === typeof "" ? ColorToInt(order, colorText) : colorText;
    let score = 0;
    let blocks = [];
    let missing = [];
    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            const cont = board[x][y].content === Object.entries(pawn)[color][0];
            const miss = board[x][y].missing === Object.entries(pawn)[color][0];
            if ((cont && miss) || (!cont && !miss)) {
                if (cont && miss) {
                    score += 50;
                    for (let xB = 0; xB < 2; xB++) {
                        for (let yB = 0; yB < 2; yB++) {
                            if (board[xB * 15][yB * 15].missing == Object.entries(pawn)[colorText][0]) {
                                score -= Math.sqrt(
                                    Math.pow(CalcDist(x, xB * board.length), 2) +
                                    Math.pow(CalcDist(y, yB * board.length), 2))
                            }
                        }
                    }
                }
                continue;
            }
            if (cont) {
                blocks.push({ x: x, y: y });
                continue;
            }
            if (miss) {
                missing.push({ x: x, y: y });
                continue;
            }
        }
    }
    for (let index = 0; index < blocks.length; index++) {
        const distX = CalcDist(blocks[index].x, missing[index].x);
        const distY = CalcDist(blocks[index].y, missing[index].y);
        let goalDist = 0;
        for (let x = 0; x < 2; x++) {
            for (let y = 0; y < 2; y++) {
                if (board[x * 15][y * 15].missing == Object.entries(pawn)[colorText][0]) {
                    goalDist = Math.sqrt(
                        Math.pow(CalcDist(blocks[index].x, x * board.length), 2) +
                        Math.pow(CalcDist(blocks[index].y, y * board.length), 2))
                }
            }
        }
        const distances = Math.sqrt(Math.pow(distX, 2) + Math.pow(distY, 2)) + NearestBlock(blocks, index) + goalDist;
        score -= distances;
    }
    return score;
}

function CalcDist(x, y) {
    return (x - y) < 0 ? -(x - y) : (x - y);
}

function NearestBlock(blocks, index) {
    const nearBlocks = (range) => {
        let amount = 0;
        for (let otherIndex = 0; otherIndex < blocks.length; otherIndex++) {
            if (Math.pow(Math.sqrt(CalcDist(blocks[index].x, blocks[otherIndex].x)) + Math.sqrt(CalcDist(blocks[index].y, blocks[otherIndex].y)) < range)) {
                amount += 1;
            }
        }
        return amount * 3;
    }

    let dist = 30;
    for (let blocksIndex = 0; blocksIndex < blocks.length; blocksIndex++) {
        if (blocksIndex === index) {
            continue;
        }
        const x = CalcDist(blocks[blocksIndex].x, blocks[index].x);
        const y = CalcDist(blocks[blocksIndex].y, blocks[index].y);
        const nDist = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        if (nDist < dist) {
            dist = nDist;
        }
    }
    if (dist < 3) {
        return -nearBlocks(3);
    }
    return Math.sqrt(dist, 2);
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