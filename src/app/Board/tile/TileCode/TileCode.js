import pawn from "../../../../backend/objects/pawn.enum";

const GetColor = (props, ctx) => {
    let color = props.element.missing;
    if (color === 0) {
        return {};
    }
    for (let index = 0; index < ctx.order.length; index++) {
        if (color === ctx.order[index]) {
            color = Object.entries(pawn)[ctx.order[index]][0];
            break;
        }
    }
    return color;
}

const GetShadow = (color) => {
    return {
        WebkitBoxShadow: "inset 0px 0px 15px 0px " + color,
        MozBoxShadow: "inset 0px 0px 15px 0px " + color,
        BoxShadow: "inset 0px 0px 15px 0px " + color
    };
}

export { GetColor, GetShadow };