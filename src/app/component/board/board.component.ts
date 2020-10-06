import { Component, OnInit, AfterViewInit } from '@angular/core';

// Classes
import { Player } from '../../classes/player';
import { Square } from '../../classes/square';
// Services
import { GameConfig } from '../../services/game-config';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {

  // Create Players
  player_1: Player;
  player_2: Player;
  players: Player[];

  // Win Condition
  winConditionArrow: number;
  winner = false;

  // Board
  boardIndexSquares: Array<Square>;

  constructor(
    public _gameService: GameService
  ) {
    // Players
    this.player_1 = GameConfig.players.player_1;
    this.player_2 = GameConfig.players.player_2;
    this.players = [
      this.player_1,
      this.player_2,
    ];

    // Win Condition
    this.winConditionArrow = GameConfig.winCondition;

    // Board generate
    this.boardIndexSquares = _gameService.createBoard();
  }

  ngOnInit(): void {
    this.player_1.turn = true;
  }

  ngAfterViewInit(): void{
    this.initSquares();
  }

  // Init Squares and add Event Listeners
  initSquares(): void {
    // Squares
    var squares = [];
    for (let i = 0; i < (this._gameService.boardRows * this._gameService.boardColumns); i++) {
      squares[i] = document.getElementsByClassName("square")[i];
    }

    this._gameService.assignBoard(squares);
    console.log("initSquares:");
    console.log(squares); 
    
  }

  setBoardInputs(i: number, j: number): void{
    this.selectSquare(this._gameService.boardInputs[i][j], i, j);
  }


  // Listener al dar click en un cuadro
  selectSquare(inputSquare, row_index, col_index): void {
    // Square status
    var playerFigure;

    if (this.player_1.turn) {
      inputSquare.value = this.player_1.figure;
      playerFigure = this.player_1.figure;
    } else if (this.player_2.turn) {
      inputSquare.value = this.player_2.figure;
      playerFigure = this.player_2.figure;
    } else {
      console.log("Error: No player selected");
    }

    this.customSquare(inputSquare, playerFigure);
    this.nextTurn();
    inputSquare.disabled = "disabled";

    // Win Condition
    this.evaluateBoard(row_index, col_index, playerFigure);

  }

  // Evalua el tablero y realiza los cambios CSS en caso de que haya un ganador
  evaluateBoard(row_index, col_index, playerFigure) {
    // Evaluar condiciones
    // cond = 4 => vertical, horizontal, diagonal 1 y diagonal 2
    for (let condition = 1; condition <= 4; condition++) {
      try {
        this.evaluateWinCondition(condition, row_index, col_index, playerFigure);
      } catch (e) {
        // Ignore TypeError: Board border
      }
    }

    // Si hay ganador
    if (this.winner) {
      console.log("Ha ganado el jugador: " + playerFigure);
      let playerWinner;

      if (playerFigure == this.player_1.figure) {
        this._gameService.gameOver(this.player_1);
      } else if (playerFigure == this.player_2.figure) {
        this._gameService.gameOver(this.player_2);
      }

      this.winner = false;
    } 
  }

  // Evalua que se cumplan las condiciones de victoia
  evaluateWinCondition(condition, row_index, col_index, playerFigure) {
    switch (condition) {
      case 1: // Diagonal \
        for (let x = 0; x <= this.winConditionArrow; x++) {
          try {
            if (
              this._gameService.boardInputs[row_index + (x - 4)][col_index + (x - 4)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + (x - 3)][col_index + (x - 3)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + (x - 2)][col_index + (x - 2)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + (x - 1)][col_index + (x - 1)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + x][col_index + x].value ==
              playerFigure
            ) {
              this._gameService.boardInputs[row_index + (x - 4)][
                col_index + (x - 4)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 3)][
                col_index + (x - 3)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 2)][
                col_index + (x - 2)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 1)][
                col_index + (x - 1)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + x][col_index + x].classList.add(
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
        for (let x = 0; x <= this.winConditionArrow; x++) {
          try {
            if (
              this._gameService.boardInputs[row_index + (x - 4)][col_index + (4 - x)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + (x - 3)][col_index + (3 - x)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + (x - 2)][col_index + (2 - x)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + (x - 1)][col_index + (1 - x)]
                .value == playerFigure &&
              this._gameService.boardInputs[row_index + x][col_index - x].value ==
              playerFigure
            ) {
              this._gameService.boardInputs[row_index + (x - 4)][
                col_index + (4 - x)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 3)][
                col_index + (3 - x)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 2)][
                col_index + (2 - x)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 1)][
                col_index + (1 - x)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + x][col_index - x].classList.add(
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
        for (let x = 0; x <= this.winConditionArrow; x++) {
          try {
            if (
              this._gameService.boardInputs[row_index][col_index + (x - 4)].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index][col_index + (x - 3)].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index][col_index + (x - 2)].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index][col_index + (x - 1)].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index][col_index + x].value ==
              playerFigure
            ) {
              this._gameService.boardInputs[row_index][
                col_index + (x - 4)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index][
                col_index + (x - 3)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index][
                col_index + (x - 2)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index][
                col_index + (x - 1)
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index][col_index + x].classList.add(
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
        for (let x = 0; x <= this.winConditionArrow; x++) {
          try {
            if (
              this._gameService.boardInputs[row_index + (x - 4)][col_index].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index + (x - 3)][col_index].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index + (x - 2)][col_index].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index + (x - 1)][col_index].value ==
              playerFigure &&
              this._gameService.boardInputs[row_index + x][col_index].value ==
              playerFigure
            ) {
              this._gameService.boardInputs[row_index + (x - 4)][
                col_index
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 3)][
                col_index
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 2)][
                col_index
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + (x - 1)][
                col_index
              ].classList.add("winSquare");
              this._gameService.boardInputs[row_index + x][col_index].classList.add(
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

  // Styles for square
  customSquare(square, figure) {
    if (figure == this.player_1.figure) {
      square.classList.add("figure-player-one");
    } else if (figure == this.player_2.figure) {
      square.classList.add("figure-player-two");
    }
  }

  // Set turn (boolean) to players
  nextTurn() {
    if (this.player_1.turn) {
      this.player_1.turn = false;
      this.player_2.turn = true;
    } else if (this.player_2.turn) {
      this.player_1.turn = true;
      this.player_2.turn = false;
    } else {
      console.log("Error: No player selected");
    }
  }


}
