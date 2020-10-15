import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'

import { GameConfigService } from '../../services/game-config.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private _location: Location,
    public _gameConfigService: GameConfigService
  ) { }

  ngOnInit(): void {
  }

  previousPage(){
    this._location.back();
  }

  resetSettings(){

  }

  saveAndStart(){
    
  }

}
