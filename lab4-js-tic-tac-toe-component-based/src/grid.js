import Component from './component.js';
import Cell from './cell.js';

import './grid.css';

export default class Grid extends Component {
    static getRootClass() {
        return '.grid';
    }

    constructor(root) {
        super(root);

        this.winSituation = []
        this.whichTurn = "";
        this.cells = [];

        const els = root.querySelectorAll(Cell.getRootClass());
        for (let el of els) {
            const cell = new Cell(el);
            cell.on('cellClick', this.handleCellClick.bind(this));
            this.cells.push(cell);
        }
        this.getSituation();
    }

    handleCellClick(firer) {
        // TODO:
        // In this function, you should handle event of the cell click.
        
        if (firer.isOccupied()){
            return;
        }
        else{
            /*If the cell hasn't occupied.*/
            firer.occupyCell(this.whichTurn);
        }

        if (!this.checkFinish(firer)){
            /*If the game haven't finish, fire a event.*/
            this.fire('click');
        }
        
    }

    setTurn(x) {
        this.whichTurn = x;
    }

    reset(x) {
        this.whichTurn = x;
        for (let cell of this.cells)
            cell.reset();
    }

    checkFinish(firer) {
        let target = this.cells.indexOf(firer);
        for (let s of this.winSituation) {
            if (s.indexOf(target) !== -1) {
                let count = 0;
                for (let i of s) {
                    if (!this.cells[i].isOccupied())
                        break;
                    if(!this.cells[i].isMatch(this.whichTurn))
                        break;
                    if(this.cells[i].isMatch(this.whichTurn))
                        count++;
                }

                if(count === 3) {
                    // TODO:
                    // In this scope, you should fire event with args and return value.
                    this.fire('finish', "win");
                    return true;
                }
            }
        }

        if(this.checkAllOccupied()){
            // TODO:
            // In this scope, you should fire event with args and return value.
            this.fire('finish', "");
            return true;
        }
        
        return false;
    }

    checkAllOccupied() {
        // TODO:
        // In this function, you should judge whether all cells have been occupied and return value.
        for(let el of this.cells){
            if(!el.isOccupied())
                return false;
        }
        return true;
    }

    getSituation() {
        this.winSituation = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    }
}
