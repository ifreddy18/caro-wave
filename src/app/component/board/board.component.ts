import { Component, OnInit, AfterViewInit } from '@angular/core';

// Classes
import { Player } from '../../classes/player';
import { Square } from '../../classes/square';
// Services
import { GameConfigService } from '../../services/game-config.service';
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

  // Board
  boardIndexSquares: Array<Square>;

  constructor(
    private _gameConfigService: GameConfigService,
    public _gameService: GameService
  ) {
    // Players
    this.player_1 = _gameConfigService.getPlayer(1);
    this.player_2 = _gameConfigService.getPlayer(2);
    this.players = [
      this.player_1,
      this.player_2,
    ];

    // Win Condition
    this.winConditionArrow = _gameConfigService.getWinCondition();

    // Board generate
    this.boardIndexSquares = _gameService.createBoard();
  }

  ngOnInit(): void {
    this.player_1.turn = true;
  }

  ngAfterViewInit(): void {
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

  setBoardInputs(i: number, j: number): void {
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
    
    this._gameService.evaluateWinCondition(row_index, col_index, playerFigure);

    // Si hay ganador
    if (this._gameService.winner) {
      console.log("Ha ganado el jugador: " + playerFigure);
      let playerWinner;
      if (playerFigure == this.player_1.figure) {
        this._gameService.gameOver(this.player_1);
      } else if (playerFigure == this.player_2.figure) {
        this._gameService.gameOver(this.player_2);
      }
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
