import React from "react";

const AuthContext = React.createContext({
    board: undefined,
    color: undefined,
    setBoard: undefined,
    setColor: undefined,
    order: undefined,
    setOrder: undefined
});

export default AuthContext;