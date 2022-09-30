import React from "react";

const AuthContext = React.createContext({
    board: undefined,
    color: undefined,
    setBoard: undefined,
    setColor: undefined,
    order: undefined,
    enemyOrder: undefined,
    setEnemyOrder: undefined,
    setOrder: undefined,
    win: undefined,
    won: undefined
});

export default AuthContext;