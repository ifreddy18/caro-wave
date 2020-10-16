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
  winCondition: number;
  winnerPlayer: Player;
  showModal: boolean;
  winner = false;
  
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
    this.winCondition = _gameConfigService.getWinCondition();
    this.setWinnerPlayer(null);
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
    this.setWinnerPlayer(null);
    this.winner = false
    this.cleanBoard();
  }

  // 
  gameOver(winner: Player): void{
    this.setWinnerPlayer(winner);
    this.setModal(true);
    this.disabledBoard();
  }
  
  // Get and Set
  getWinnerPlayer(): Player {
    return this.winnerPlayer;
  }
  
  setWinnerPlayer(winner: Player): void{
    this.winnerPlayer = winner;
  } 

  getModal(): boolean {
    return this.showModal;
  }
  
  setModal(showModal: boolean): void{
    this.showModal = showModal;
  } 


  // Evaluate Win Condition methods
  /**
   * Evaluate if there a winner
   * @param condition 1, 2, 3 or 4 (directions)
   * @param row_index 
   * @param col_index 
   * @param playerFigure 
   * return winner: boolean
   */
  evaluateWinCondition(row_index, col_index, playerFigure): boolean {
    // Evaluar condiciones
    // cond = 4 => vertical, horizontal, diagonal 1 y diagonal 2
    for (let condition = 1; condition <= 4; condition++) {
      try {
        switch(this.winCondition){
          case 3:
            this.winCondition_3(condition, row_index, col_index, playerFigure);
            break;
          case 4: 
            this.winCondition_4(condition, row_index, col_index, playerFigure);
            break;
          case 5:
            this.winCondition_5(condition, row_index, col_index, playerFigure);
            break;
        }
         
      } catch (e) {
        // Ignore TypeError: Board border
      }

    }

    return this.winner;
  }

  // If winCondtion == 3
  winCondition_3(condition, row_index, col_index, playerFigure){
    switch (condition) {
          case 1: // Diagonal \
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 2)][col_index + (x - 2)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index + (x - 1)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + x][col_index + x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 2)][
                    col_index + (x - 2)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index + (x - 1)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index + x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 2: // Diagonal /
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 2)][col_index + (2 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index + (1 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + x][col_index - x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 2)][
                    col_index + (2 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index + (1 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index - x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 3: // Horizontal
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index][col_index + (x - 2)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + (x - 1)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index][
                    col_index + (x - 2)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][
                    col_index + (x - 1)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][col_index + x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 4: // Vertical
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 2)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + x][col_index].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 2)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          default:
            break;
        }
  }

  // If winCondtion == 4
  winCondition_4(condition, row_index, col_index, playerFigure){
    switch (condition) {
          case 1: // Diagonal \
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 3)][col_index + (x - 3)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 2)][col_index + (x - 2)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index + (x - 1)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + x][col_index + x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 3)][
                    col_index + (x - 3)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 2)][
                    col_index + (x - 2)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index + (x - 1)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index + x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 2: // Diagonal /
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 3)][col_index + (3 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 2)][col_index + (2 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index + (1 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + x][col_index - x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 3)][
                    col_index + (3 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 2)][
                    col_index + (2 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index + (1 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index - x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 3: // Horizontal
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index][col_index + (x - 3)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + (x - 2)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + (x - 1)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index][
                    col_index + (x - 3)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][
                    col_index + (x - 2)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][
                    col_index + (x - 1)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][col_index + x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 4: // Vertical
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 3)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + (x - 2)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + x][col_index].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 3)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 2)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          default:
            break;
        }
  }

  // If winCondtion == 5
  winCondition_5(condition, row_index, col_index, playerFigure){
    switch (condition) {
          case 1: // Diagonal \
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 4)][col_index + (x - 4)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 3)][col_index + (x - 3)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 2)][col_index + (x - 2)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index + (x - 1)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + x][col_index + x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 4)][
                    col_index + (x - 4)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 3)][
                    col_index + (x - 3)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 2)][
                    col_index + (x - 2)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index + (x - 1)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index + x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 2: // Diagonal /
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 4)][col_index + (4 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 3)][col_index + (3 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 2)][col_index + (2 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index + (1 - x)]
                    .value == playerFigure &&
                  this.boardInputs[row_index + x][col_index - x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 4)][
                    col_index + (4 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 3)][
                    col_index + (3 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 2)][
                    col_index + (2 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index + (1 - x)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index - x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 3: // Horizontal
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index][col_index + (x - 4)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + (x - 3)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + (x - 2)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + (x - 1)].value ==
                  playerFigure &&
                  this.boardInputs[row_index][col_index + x].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index][
                    col_index + (x - 4)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][
                    col_index + (x - 3)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][
                    col_index + (x - 2)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][
                    col_index + (x - 1)
                  ].classList.add("winSquare");
                  this.boardInputs[row_index][col_index + x].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                  // No se cierra con break para evaluar si el jugador gano por más de un lado
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          case 4: // Vertical
            for (let x = 0; x <= this.winCondition; x++) {
              try {
                if (
                  this.boardInputs[row_index + (x - 4)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + (x - 3)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + (x - 2)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + (x - 1)][col_index].value ==
                  playerFigure &&
                  this.boardInputs[row_index + x][col_index].value ==
                  playerFigure
                ) {
                  this.boardInputs[row_index + (x - 4)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 3)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 2)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + (x - 1)][
                    col_index
                  ].classList.add("winSquare");
                  this.boardInputs[row_index + x][col_index].classList.add(
                    "winSquare"
                  );
                  this.winner = true;
                }
              } catch (e) {
                // Ignore TypeError: Board border
              }
            }
            break;

          default:
            break;
        }
  }


}
