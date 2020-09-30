import { Injectable } from '@angular/core';

import { GameConfig } from './game-config';
import { Square } from '../classes/square';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  // Board
  boardRows: number;
  boardColumns: number;
  //boardIndexSquares: Array<Square>;
  boardInputs = [];
  cont = 0;
  
  constructor() {
    // Board
    this.boardRows = GameConfig.board.rows;
    this.boardColumns = GameConfig.board.columns;

    //this.boardIndexSquares = this.createBoard();

    for (let i = 0; i < this.boardRows; i++) {
      this.boardInputs[i] = [];
    }
  }

  // Crea el array para usarse en la plantilla del BoardComponent
  createBoard(): Array<Square>{
    let boardIndexSquares: Array<Square> = [];

    for (let i = 0; i < this.boardRows; i++){
      for (let j = 0; j < this.boardColumns; j++){
        boardIndexSquares.push(new Square(i,j));
      }
    }

    return boardIndexSquares;
  }


  // Asigna el board desde la plantilla de BoardComponent
  assignBoard(squares: Array<HTMLObjectElement>): void {
    for (let i = 0; i < this.boardRows; i++) {
      for (let j = 0; j < this.boardColumns; j++) {
        this.boardInputs[i][j] = squares[this.cont];
        this.cont++;
        if (i == this.boardRows - 1 && j == this.boardColumns - 1) {
          this.cont = 0;
        }
      }
    }
  }

  // Limpia el tablero para una nueva partida
  cleanBoard(): void {
    for (let i = 0; i < this.boardRows; i++) {
      for(let j = 0; j < this.boardColumns; j++) {
        this.boardInputs[i][j].value = "";
        this.boardInputs[i][j].disabled = false;
        this.boardInputs[i][j].classList.remove("winSquare");
        this.boardInputs[i][j].classList.remove("figure-player-one");
        this.boardInputs[i][j].classList.remove("figure-player-two");
      }
    }
  }
}
