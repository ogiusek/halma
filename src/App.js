import React, { useState } from 'react';
import style from './App.module.css';
import UI from './app/UI/UI';
import Board from './app/Board/Board';

import AuthContext from './backend/AuthContext';
import pawn from './backend/objects/pawn.enum';
import { order as orginalOrder } from './backend/colorTurn';
import firstBoard from './backend/objects/board';
import Settings from './app/UI/Settings/Settings';

function App() {
  const [order, setOrder] = useState(orginalOrder);
  const [board, setBoard] = useState(firstBoard);
  const [color, setColor] = useState(0);
  const [showSettings, setShowSettings] = useState(true);

  const GetColor = (colorTurn) => {
    let color = Object.entries(pawn);
    for (let index = 0; index < order.length; index++) {
      if (index == colorTurn) {
        return color[order[index]][0];
      }
    }
    return 'black';
  }

  return (
    <div className={style.background} style={{ backgroundColor: GetColor(color) }}>
      <AuthContext.Provider value={{
        board: board,
        setBoard: setBoard,
        color: color,
        setColor: setColor,
        order: order,
        setOrder: setOrder
      }}>
        {showSettings && <Settings setShowSettings={setShowSettings} setOrder={setOrder} setEnemys />}
        <div className={style.box}>
          <Board board={board} />
          <UI board={board} setboard={setBoard} setShowSettings={setShowSettings} />
        </div>
      </AuthContext.Provider>
    </div >
  );
}

export default App;
