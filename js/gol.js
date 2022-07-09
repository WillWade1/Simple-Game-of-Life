
class GameOfLife{
    constructor(width, height) {
        this.width = width
        this.height = height
        this.cellsIndex = [];
        this.cellsIndexCopy = [];
        this.cellsObjects = []

        for (let i=0; i<this.width; i++){
            this.cellsIndex[i] = []
            this.cellsIndexCopy[i] = []
            this.cellsObjects[i] = [];
            for(let j=0; j<this.height; j++) {
                this.cellsIndex[i][j] = 0
                this.cellsIndexCopy[i][j] = 0
                this.cellsObjects[i][j] = null;
            }
        }
    }

    randomise() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (Math.random() < 0.5) {
                    if (this.cellsIndex[i][j] === 0) {
                        showCell(i, j)
                        this.setCellsIndex(i, j, 1)
                    }
                } else {
                    if (this.cellsIndex[i][j] === 1) {
                        removeCell(i, j)
                        this.setCellsIndex(i, j, 0)
                    }

                }
            }
        }
    }

    clear(){
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.cellsIndex[i][j] === 1) {
                    removeCell(i, j)
                    this.setCellsIndex(i, j, 0)
                }
            }
        }
    }



    addPattern(x,y,cells){
        for(let i =0; i<cells.length;i++){
             if(this.cellsIndex[x+cells[i][0]][y+cells[i][1]] === 0){
                showCell(x+cells[i][0], y+cells[i][1])
                this.setCellsIndex(x+cells[i][0], y+cells[i][1], 1)
            }
        }

    }

    getCellsIndex(){
        return this.cellsIndex
    }

    setCellsIndex(i,j,c){
        this.cellsIndex[i][j] = c
    }

    setCellObject(i,j,c){
        this.cellsObjects[i][j] = c
    }

    getCellObject(i,j){
        return this.cellsObjects[i][j]
    }


    lifeCycle(){
        for (let i = 0; i<this.width; i++){
            for (let j = 0; j<this.height; j++){
                this.updateCell(i, j)
            }
        }
        for (let i = 0; i<this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.cellsIndex[i][j] = this.cellsIndexCopy[i][j]
            }
        }
    }
    updateCell(i, j){
        const count = this.countNeighbors(i, j)

        if (count > 3 || count < 2){
            this.cellsIndexCopy[i][j] = 0
            if (this.cellsIndex[i][j]===1){
                console.log("removeCell")
                removeCell(i,j)
            }
        } else if (this.cellsIndex[i][j]===0 && count ===3) {
            this.cellsIndexCopy[i][j] = 1
            console.log("Create Cell:", i, j, count)
            showCell(i,j)
        }
        else
            this.cellsIndexCopy[i][j] = this.cellsIndex[i][j]
    }

    countNeighbors(i,j) {
        let count = 0;
        count += this.countHelper(i-1, j-1)
        count += this.countHelper(i-1, j)
        count += this.countHelper(i-1, j+1)
        count += this.countHelper(i,j-1)
        count += this.countHelper(i, j+1)
        count += this.countHelper(i+1, j-1)
        count += this.countHelper(i+1, j)
        count += this.countHelper(i+1, j+1)
        return count
    }
    countHelper(i,j){
        if(i<0 || j<0 || i>=this.width || j>=this.height){
            return 0
        }
        //console.log(i, width, j)
        return this.cellsIndex[i][j]
    }
}

