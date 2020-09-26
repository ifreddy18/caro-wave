import { Component, OnInit } from '@angular/core';

import { Player } from '../../classes/player';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  // Create Players
  player_1 = new Player(1, "X", "red");
  player_2 = new Player(2, "O", "blue");
  player_3 = new Player(3, "A", "green");
  player_4 = new Player(4, "T", "orange");

  players: Player[] = [
    this.player_1,
    this.player_2,
    this.player_3,
    this.player_4
  ]

  // Board
  boardRows = 12;
  boardColumns = 16;
  boardInputs = [[], [], [], [], [], [], [], [], [], [], [], []]; // boardRows 12

  // Win Condition
  winConditionArrow = 5;
  cont = 0;
  winner = false;

  constructor() { }

  ngOnInit(): void {
    this.initSquares();
    this.player_1.turn = true;
  }

  // Init Squares and add Event Listeners
  initSquares(): void {
    // Squares
    for (let i = 0; i < this.boardRows; i++) {
      for (let j = 0; j < this.boardColumns; j++) {
        this.boardInputs[i][j] = document.getElementsByClassName("square")[this.cont];
        this.cont++;
        if (i == this.boardRows - 1 && j == this.boardColumns - 1) {
          this.cont = 0;
        }
      }
    }

    // EventListeners
    for (let i = 0; i < this.boardRows; i++) {
      for (let j = 0; j < this.boardColumns; j++) {
        this.boardInputs[i][j].addEventListener("click", () => {
          this.selectSquare(this.boardInputs[i][j]);
        });
      }
    }
  }

  // Listener al dar click en un cuadro
  selectSquare(square): void {
    // Square status
    var playerFigure;

    if (this.player_1.turn) {
      square.value = this.player_1.figure;
      playerFigure = this.player_1.figure;
    } else if (this.player_2.turn) {
      square.value = this.player_2.figure;
      playerFigure = this.player_2.figure;
    } else {
      console.log("Error: No player selected");
    }

    this.customSquare(square, playerFigure);
    this.nextTurn();
    square.disabled = "disabled";

    // Win Condition
    let row_index = parseInt(square.getAttribute("data-row-index"));
    let col_index = parseInt(square.getAttribute("data-col-index"));
    this.evaluateBoard(row_index, col_index, playerFigure);

  }

  // Evalua el tablero y realiza los cambios CSS en caso de que haya un ganador
  evaluateBoard(row_index, col_index, playerFigure) {
    console.log(`[row][col]:[${row_index}][${col_index}]`);
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
        playerWinner = this.player_1.name;
      } else if (playerFigure == this.player_2.figure) {
        playerWinner = this.player_2.name;
      }

      /*
      this.player_win.innerText = `${playerWinner} WON!!!`;
      this.end_game_modal.style.display = "block";
      */
    } else {
      return console.log("Next player's turn");
    }
  }

  // Evalua que se cumplan las condiciones de victoia
  evaluateWinCondition(condition, row_index, col_index, playerFigure) {
    switch (condition) {
      case 1: // Diagonal \
        for (let x = 0; x <= this.winConditionArrow; x++) {
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
        for (let x = 0; x <= this.winConditionArrow; x++) {
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
        for (let x = 0; x <= this.winConditionArrow; x++) {
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
        for (let x = 0; x <= this.winConditionArrow; x++) {
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
      /*
      this.label_player_1.classList.remove("active_turn");
      this.label_player_2.classList.add("active_turn");
      */
    } else if (this.player_2.turn) {
      this.player_1.turn = true;
      this.player_2.turn = false;
      /*
      this.label_player_1.classList.add("active_turn");
      this.label_player_2.classList.remove("active_turn");
      */
    } else {
        console.log("Error: No player selected");
    }
}


}
