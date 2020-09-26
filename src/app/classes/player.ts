export class Player {
    id: number;
    name: string;
    figure: string;
    color: string;
    turn: boolean;
    constructor(id, figure, color){
        this.id = id;
        this.figure = figure;
        this.color = color;
    }
}