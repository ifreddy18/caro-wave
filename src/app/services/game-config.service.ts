import { Injectable } from '@angular/core';
import { Player } from '../classes/player';
import { GameConfig } from './game-config';


@Injectable({
  providedIn: 'root'
})
export class GameConfigService {

  // Players
  public player_1: Player;
  public player_2: Player;
  // Board
  private boardRows: number;
  private boardCols: number;
  // Win Condition
  private winCondition: number;
  
  constructor() { 
    this.player_1 = GameConfig.players.player_1;
    this.player_2 = GameConfig.players.player_2;
    this.boardRows = GameConfig.board.rows;
    this.boardCols = GameConfig.board.columns;
    this.winCondition = GameConfig.winCondition;
  }

  // Setter and Getter
  setWinCondition(winCondition): void{
    this.winCondition = winCondition;
  }

  getWinCondition(): number{
    return this.winCondition;
  }

  /**
   * Return row count or columns count
   * @param side : 'row' or 'col'
   */
  getBoard(side): number{
    if (side == "row"){
      return this.boardRows;
    } else if (side == "col"){
      return this.boardCols;
    } else {
      console.log("Parametro no valido");
      return 0;
    }
  }

  getPlayer(id): Player{
    if (id == 1){
      return this.player_1;
    } else if (id == 2){
      return this.player_2;
    } else {
      console.log("Invalid player id");
    }
  }

  /**
   * Reset to default configuration
   */
  resetGameConfig(): void{
    this.player_1 = GameConfig.players.player_1;
    this.player_2 = GameConfig.players.player_2;
    this.boardRows = GameConfig.board.rows;
    this.boardCols = GameConfig.board.columns;
    this.winCondition = GameConfig.winCondition;
  }

  

}
