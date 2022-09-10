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



export { FilterColors };