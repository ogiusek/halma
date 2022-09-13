let history = {};
function SaveMove(id, move) {
    if (history[id] === undefined) {
        history[id] = [];
    }
    history[id].push({ ...move });
}

function Back(id) {
    if (history[id] !== undefined && history[id].length > 0) {
        return history[id].pop();
    } else {
        return null;
    }
}

function GetLastMove(id) {
    if (history[id] !== undefined && history[id].length > 0) {
        return history[id][history[id].length - 1];
    } else {
        return null;
    }
}

function Reset(id) {
    history[id] = [];
}

export { SaveMove, GetLastMove, Back, Reset };