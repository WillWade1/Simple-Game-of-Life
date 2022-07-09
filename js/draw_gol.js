const width = 1201
const height = 601


const gol = new GameOfLife(width/10, height/10)

let app = new PIXI.Application({
    width: width,
    height: height,
    view: document.getElementById('gol_canvas'),
    backgroundColor :0xAAAAA
});


let background = new PIXI.Graphics();
background.beginFill(0x4b5263);
background.drawRect(0,0, width, height)
background.interactive = true;
app.stage.addChild(background)

let cellCont = new PIXI.Container();
app.stage.addChild(cellCont)
let gridCont = new PIXI.Container();
app.stage.addChild(gridCont)



let grid = new PIXI.Graphics();
grid.beginFill(0x5c6370);
for (let i =0; i<width/10; i++){
    grid.drawRect(i*10, 0, 1, height)
}

for (let j =0; j<height/10; j++){
    grid.drawRect(0, j*10, width, 1)
}

grid.endFill()
gridCont.addChild(grid)



background.on('mousedown', function (e){
    clickCell(e.data.global.x, e.data.global.y )
});

window.onload=function (){
    document.getElementById('next').onclick = function () {timeStep()};
    document.getElementById('start').onclick = function () {startButtonHandler()};
    document.getElementById('random').onclick = function () {gol.randomise()}
    document.getElementById('clear').onclick = function () {gol.clear()}
}
let running = false
let timer = 0

function startButtonHandler(){
    timer = 0
    if(running===false){
        document.getElementById('start').innerHTML= "Stop"
    } else {
        document.getElementById('start').innerHTML= "Start"
    }

    running = !running
}




app.animationUpdate = function (delta){
    timer+=delta
    while(timer>30 && running){
        gol.lifeCycle()
        timer-=30
    }
}
app.ticker.add(app.animationUpdate)

function timeStep(){
    gol.lifeCycle()
}
bee_hive3 = [[1,1],[1,-1],[0,1], [0,-1], [-1,1],[-1,-1],[-2,0],[2,0]]
gol.addPattern(20, 20, bee_hive3)

function clickCell(x,y){
    let grid_x = Math.round((x-5) / 10);
    let grid_y = Math.round((y-5) / 10);
    if (!gol.getCellsIndex()[grid_x][grid_y]){
        showCell(grid_x, grid_y)
        gol.setCellsIndex(grid_x, grid_y, 1)
    } else{
        removeCell(grid_x, grid_y)
        gol.setCellsIndex(grid_x, grid_y, 0)
    }
}

function showCell(i,j){
    let cell = new PIXI.Graphics();
    cell.beginFill(0x63e11a)
    cell.drawRect(i*10,j*10,10, 10)
    cell.endFill();
    //cell.interactive = true
    cellCont.addChild(cell)
    gol.setCellObject(i,j,cell)
}

function removeCell(i,j){
    let cell = gol.getCellObject(i,j)
    cellCont.removeChild(cell)
    cell.destroy()
    gol.setCellObject(i,j,null)
}





