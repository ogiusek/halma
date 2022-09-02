import React, { useState } from 'react';
import style from './App.module.css';
import AuthContext from './backend/colorApi';

import UI from './app/UI/UI';
import Board from './app/Board/Board';
import pawn from './backend/objects/pawn.enum';
import colorTurn from './backend/colorTurn';

function App() {
  const [refresher, setRefresh] = useState(0);
  const refresh = () => {
    setRefresh(refresher + 1);
  }
  return (
    <div className={style.background} style={{ backgroundColor: GetColor() }}>
      <AuthContext.Provider value={{
        refresh: refresh
      }}>
        <div className={style.box}>
          <Board />
          <UI />
        </div>
      </AuthContext.Provider>
    </div >
  );
}

function GetColor() {
  let color = Object.entries(pawn);
  for (let index = 0; index < color.length; index++) {
    if (color[index][1] == colorTurn()) {
      color = color[index][0];
    }
  }
  return color
}

export default App;
