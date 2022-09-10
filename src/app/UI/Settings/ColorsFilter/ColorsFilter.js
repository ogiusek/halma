import pawn from "../../../../backend/objects/pawn.enum";
import enemys from "../../../../backend/objects/enemy.enum";

function FilterColors(colors, players, aboutPlayers, colorIndex) {
    let blockedColor;
    for (let index = 0; index < players; index++) {
        if (index === colorIndex) {
            continue;
        }
        colors = colors.filter((element) => {
            if (aboutPlayers[index].color !== element) {
                return true;
            }
            return false;
        });
    }
    colors.map((element, colorsIndex) => {
        if (aboutPlayers[colorIndex].color === element) {
            blockedColor = colorsIndex;
        }
    });
    if (blockedColor !== 0) {
        colors.unshift(colors[blockedColor]);
        colors = colors.filter((element, index) => {
            return blockedColor + 1 !== index;
        });
    }
    return colors;
}

const GetAboutPlayers = (players) => {
    let aboutPlayers = [];
    for (let index = 0; index < players; index++) {
        aboutPlayers.push({ color: Object.entries(pawn)[index + 1][0], enemy: enemys.player });
    }
    return aboutPlayers;
}

const ToOrder = (aboutPlayers) => {
    let newOrder = [];

    aboutPlayers.map((color) => {
        newOrder.push(pawn[color.color]);
    });
    console.log(newOrder);
    return newOrder;
}

export { FilterColors, GetAboutPlayers, ToOrder };