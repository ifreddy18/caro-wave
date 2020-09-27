import { Injectable } from '@angular/core';

import { GameConfig } from './game-config';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // Board
  boardRows: number;
  boardColumns: number;
  boardInputs = [];
  
  constructor() {
    // Board
    this.boardRows = GameConfig.board.rows;
    this.boardColumns = GameConfig.board.columns;
  }

  createBoard(): void {

  }

  cleanBoard(): void {
    // Reglas para limpiar tablero
  }
}
