import { Component, OnInit } from '@angular/core';
import { fromEventPattern } from 'rxjs';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-winner-modal',
  templateUrl: './winner-modal.component.html',
  styleUrls: ['./winner-modal.component.scss']
})
export class WinnerModalComponent implements OnInit{

  constructor(
    public _gameService: GameService
  ) { }

  ngOnInit(): void {
  }

  newGame(): void{
    this._gameService.newGame();
    this._gameService.setModal(false);
  }

  closeModal(): void{
    this._gameService.setModal(false);
  }

}
