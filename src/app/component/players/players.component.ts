import { Component, OnInit } from '@angular/core';

import { GameConfig } from '../../services/game-config';
import { Player } from '../../classes/player';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  player_1: Player;
  player_2: Player;


  constructor() { 
    this.player_1 = GameConfig.players.player_1;
    this.player_2 = GameConfig.players.player_2;
  }

  ngOnInit(): void {
  }

}
