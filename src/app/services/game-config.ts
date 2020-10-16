import { Player } from '../classes/player';

export var GameConfig = {
    players: {
        player_1: new Player(1, "Player 1", "X"),
        player_2: new Player(2, "Player 2", "O")
    },
    board: {
        rows: 12,
        columns: 16
    },
    winCondition: 3

}