import pawn from "./objects/pawn.enum";

let order = [pawn.yellow, pawn.green];
let colorTurn = 0;

const ChangeColor = () => {
    colorTurn++;
    if (colorTurn >= order.length) {
        colorTurn = 0;
    }
}

const ReverseColor = () => {
    colorTurn--;
    if (colorTurn < 0) {
        colorTurn += order.length;
    }
}

const SetColor = (value) => {
    colorTurn = value
}

const ResetColor = () => {
    colorTurn = 0;
}

const GetColor = () => {
    return order[colorTurn];
}

export { order, ChangeColor, SetColor, ReverseColor, ResetColor, colorTurn };
export default GetColor;