import { CreateNewBoard, SetBoard } from "./objects/board";

let history = {};
function SaveMove(id, move) {
    if (history[id] == undefined) {
        history[id] = [];
    }
    history[id].push({ ...move });
    // console.log(history[id]);
}

function GetLastMove(id) {
    if (history[id] != undefined && history[id].length > 0) {
        return history[id].pop();
    } else {
        return null;
    }
}

function Reset(id) {
    history[id] = [];
}

export { SaveMove, GetLastMove, Reset };