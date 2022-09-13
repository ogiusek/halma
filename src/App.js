import React, { useState } from 'react';
import style from './App.module.css';
import UI from './app/UI/UI';
import Board from './app/Board/Board';

import AuthContext from './backend/AuthContext';
import pawn from './backend/objects/pawn.enum';
import { order as orginalOrder } from './backend/colorTurn';
import firstBoard from './backend/objects/board';
import Settings from './app/UI/Settings/Settings';
import WinScreen from './app/UI/WinScreen/WinWindow';

function App() {
  const [order, setOrder] = useState(orginalOrder);
  const [enemyOrder, setEnemyOrder] = useState(enemyOrder);
  const [board, setBoard] = useState(firstBoard);
  const [color, setColor] = useState(0);
  const [showSettings, setShowSettings] = useState(true);
  const [selected, setSelected] = useState({ x: -1, y: -1 });
  const [won, win] = useState(false);

  const GetColor = (colorTurn) => {
    let color = Object.entries(pawn);
    for (let index = 0; index < order.length; index++) {
      if (index === colorTurn) {
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
        setOrder: setOrder,
        enemyOrder: enemyOrder,
        setEnemyOrder: setEnemyOrder,
        win: win,
      }}>
        {showSettings && <Settings setShowSettings={setShowSettings} setBoard={setBoard} setOrder={setOrder} setEnemyOrder={setEnemyOrder} />}
        {won !== false && <WinScreen setShowSettings={setShowSettings} color={won} />}
        <div className={style.box}>
          <Board board={board} setBoard={setBoard} selected={selected} setSelected={setSelected} />
          <UI board={board} setboard={setBoard} setShowSettings={setShowSettings} setSelected={setSelected} />
        </div>
      </AuthContext.Provider>
    </div >
  );
}

export default App;