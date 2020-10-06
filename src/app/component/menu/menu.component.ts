import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private _gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  newGame(): void{
    this._gameService.newGame();
  }

}
