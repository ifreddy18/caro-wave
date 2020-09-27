import { Injectable } from '@angular/core';

import { BoardService } from './board.service';

@Injectable({
  providedIn: 'root'
})
export class NewGameService {

 
  
  constructor(
    private _boardService: BoardService
  ) { }

  newGame(): void {

  }
}
