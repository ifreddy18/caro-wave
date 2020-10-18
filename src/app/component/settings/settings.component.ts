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

  constructor(
    private _location: Location,
    public _gameConfigService: GameConfigService,
    public _gameService: GameService
  ) {
    this.winCondition = _gameConfigService.getWinCondition();
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.winCondition = this._gameConfigService.getWinCondition();
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

}
