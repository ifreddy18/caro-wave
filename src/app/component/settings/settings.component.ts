import { Component, OnInit, OnChanges } from '@angular/core';
import { Location } from '@angular/common'

import { GameConfigService } from '../../services/game-config.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnChanges {

  winCondition: number;
  validSettings: boolean;

  constructor(
    private _location: Location,
    public _gameConfigService: GameConfigService,
    public _gameService: GameService
  ) {
    this.winCondition = _gameConfigService.getWinCondition();
    this.validSettings = true;
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.winCondition = this._gameConfigService.getWinCondition();
    this.winConditionValidation();
  }

  previousPage(){
    this._location.back();
    this._gameService.newGame();
  }

  resetSettings(){
    this._gameConfigService.resetGameConfig();
    this.winCondition = this._gameConfigService.getWinCondition();
  }

  saveAndStart(){
    this._gameConfigService.setWinCondition(this.winCondition);
    this._gameService.newGame();
  }

  // Validation
  winConditionValidation(): void {
    if (this.winCondition < 3 || this.winCondition >5){
      this.validSettings = false;
    } else {
      this.validSettings = true;
    }
  }

  // Arrow
  winConditionIncrement(): void {
    this.winCondition++;
    this.winConditionValidation();
  }

  winConditionDecrement(): void {
    this.winCondition--;
    this.winConditionValidation();
  }

}
