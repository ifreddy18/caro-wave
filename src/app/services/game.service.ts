import { Injectable } from '@angular/core';

import { GameConfigService } from './game-config.service';
import { Square } from '../classes/square';
import { Player } from '../classes/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  // Board
  boardRows: number;
  boardColumns: number;
  boardInputs = [];
  cont = 0;

  // Winner
  winner: Player;
  showModal: boolean;
  
  constructor(
    private _gameConfigService: GameConfigService
  ) {
    // Board
    this.boardRows = _gameConfigService.getBoard('row');
    this.boardColumns = _gameConfigService.getBoard('col');

    for (let i = 0; i < this.boardRows; i++) {
      this.boardInputs[i] = [];
    }

    // Winner
    this.setWinner(null);
    this.setModal(false)
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

  // Disabled board when a player wins
  disabledBoard(): void {
    for (let i = 0; i < this.boardRows; i++) {
      for(let j = 0; j < this.boardColumns; j++) {
        this.boardInputs[i][j].disabled = 'disabled';
      }
    }
  }

  // Create a new game
  newGame(): void {
    console.log("new game!!!");
    this.setWinner(null);
    this.cleanBoard();
  }

  // 
  gameOver(winner: Player): void{
    this.setWinner(winner);
    this.setModal(true);
    this.disabledBoard();
  }
  
  // Get and Set
  getWinner(): Player {
    return this.winner;
  }
  
  setWinner(winner: Player): void{
    this.winner = winner;
  } 

  getModal(): boolean {
    return this.showModal;
  }
  
  setModal(showModal: boolean): void{
    this.showModal = showModal;
  } 
}
