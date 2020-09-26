import { Player } from '../classes/player';

export var Config = {
    players: {
        player_1: new Player(1, "X", "red"),
        player_2: new Player(2, "O", "blue")
    },
    board: {
        rows: 12,
        columns: 26
    },
    winCondition: 5

}