let history = {};
function SaveMove(id, move) {
    if (history[id] == undefined) {
        history[id] = [];
    }
    history[id].push([]);
    move.map((x, xIndex) => {
        history[id][history[id].length - 1].push([]);
        move[xIndex].map((y) => {
            history[id][history[id].length - 1][xIndex].push(y);
        });
    });
    console.log(history);
}

function GetLastMove(id) {
    return history[id]
}

function Reset(id) {

}

function Back(id) {

}

export { SaveMove, GetLastMove };