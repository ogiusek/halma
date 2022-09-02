import pawn from "./objects/pawn.enum";

let order = [pawn.yellow, pawn.green];
let colorTurn = 0;

const ChangeColor = () => {
    colorTurn++;
    if (colorTurn >= order.length) {
        colorTurn = 0;
    }
}

const GetColor = () => {
    return order[colorTurn];
}

export { order, ChangeColor, colorTurn as colorTurnIndex };
export default GetColor;