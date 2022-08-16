class Cell {
    constructor(x, y, active, baseColor, color, cellRadius, gridPartition, xOffset, yOffset, draw) {
        this.x = x 
        this.y = y 

        this.active = active 

        this.baseColor = baseColor 
        this.color = color     

        this.cellRadius  = cellRadius 

        this.gridPartition = gridPartition 

        this.xOffset = xOffset 
        this.yOffset = yOffset 

        this.draw = draw 
        
        this.circle = this.draw
            .rect()
            .size(15, 15)
            .fill('transparent')
            .move(this.x * this.gridPartition + this.xOffset, this.y * this.gridPartition + this.yOffset) 
    }

    activate() {
        this.active = true 
        this.circle.fill(this.color) 
    }

    deactivate() {
        this.active = false 
        this.circle.fill(this.baseColor) 
    }
}

class CellPlane {
    constructor(cellRadius, gridPartition, baseColor, color) {
        this.width = window.innerWidth 
        this.height = window.innerHeight 

        this.cellRadius = cellRadius 
        this.gridPartition = gridPartition 

        this.baseColor = baseColor 
        this.color = color 

        this.draw = SVG().addTo('.animation').size('100%', '100%') 

        this.cols = Math.floor(this.width / gridPartition) - 1 
        this.rows = Math.floor(this.height / gridPartition) - 1 

        this.xOffset = this.computeXOffset() 
        this.yOffset = this.computeYOffset() 

        this.cells = this.initCells() 
    }

    computeXOffset() {
        return (this.width - (this.cols * this.gridPartition + this.cellRadius)) / 2 
    }

    computeYOffset() {
        return (this.height - (this.rows * this.gridPartition + this.cellRadius)) / 2 
    }

    initCells() {
        var cells = []

        for (var i = 0;  i <= this.cols;  i++) {
            var cellRow = []
            
            for (var j = 0;  j <= this.rows;  j++) {
                var cell = new Cell(i, j, false, this.baseColor, this.color, this.cellRadius, this.gridPartition, this.xOffset, this.yOffset, this.draw) 

                cellRow.push(cell) 
            }

            cells.push(cellRow) 
        }

        return cells 
    }

    randomizeCells(count) {
        var xIndexes = new Array() 
        var yIndexes = new Array() 

        var indexesFound = 0 

        for (var i = 0;  i < count;  i++) {
            var x = Math.floor(this.cols * Math.random()) 
            var y = Math.floor(this.rows * Math.random()) 

            this.cells[x][y].activate() 
            
        }
    }

    checkRules(x, y, liveCount) {
        var live 

        if (!this.cells[x][y].active && liveCount == 3) {
            live = true 
        }

        if (this.cells[x][y].active && liveCount > 3) {
            live = false 
        }

        if (this.cells[x][y].active && (liveCount == 2 || liveCount == 3)) {
            live = true 
        }

        if (this.cells[x][y].active && liveCount < 2) {
            live = false 
        }

        return live 

    }

    updateCell(x, y) {
        var cell = this.cells[x][y] 
        
        

        // left edge
        if (x == 0 && y != 0 && y!= this.rows) {
            var liveCount = 0 

            if (this.cells[x][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y + 1].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // right edge
        if (x == this.cols && y != 0 && y!= this.rows) {
            var liveCount = 0 

            if (this.cells[x][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y + 1].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // top edge
        if (y == 0 && x != 0 && x!= this.cols) {
            var liveCount = 0 

            if (this.cells[x - 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // bottom edge
        if (y == this.rows && x != 0 && x!= this.cols) {
            var liveCount = 0 

            if (this.cells[x - 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // top left corner
        if (x == 0 && y == 0) {
            var liveCount = 0 

            if (this.cells[x + 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y + 1].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // top right corner
        if (x == this.cols && y == 0) {
            var liveCount = 0 

            if (this.cells[x - 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y + 1].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // bottom left corner
        if (x == 0 && y == this.rows) {
            var liveCount = 0 

            if (this.cells[x + 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y - 1].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // bottom right corner
        if (x == this.cols && y == this.rows) {
            var liveCount = 0 

            if (this.cells[x - 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y - 1].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 
        }

        // center
        if (x != this.cols && y != this.rows && x != 0 && y != 0) {
            var liveCount = 0 

            if (this.cells[x - 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y - 1].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y].active) {
                liveCount++ 
            }
            if (this.cells[x + 1][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y + 1].active) {
                liveCount++ 
            }
            if (this.cells[x - 1][y].active) {
                liveCount++ 
            }

            return this.checkRules(x, y, liveCount) 

        }
        

    }

    updateCells() {
        var liveArr = [] 
        var endUpdate = false 
        

        for(var i = 0;  i < this.cells.length - 1;  i++) {
            var liveRow = [] 

            for (var j = 0;  j < this.cells[0].length - 1;  j++) {
                var live = false 

                if (this.updateCell(i, j)) {
                    live = true 
                }

                liveRow.push(live) 
                
            }

            liveArr.push(liveRow) 
            
        }                    
        
        for (var i = 0; i < liveArr.length;  i++) {
            
            for (var j = 0;  j < liveArr[0].length;  j++) {

                if (liveArr[i][j]) {
                    endUpdate = true 
                    this.cells[i][j].activate() 
                } else {
                    this.cells[i][j].deactivate() 
                }
            }
        }

        return endUpdate 
    }

    activateAll() {
        for(var i = 0;  i < this.cells.length;  i++) {
            for (var j = 0;  j < this.cells[0].length;  j++) {
                this.cells[i][j].activate() 
            }
        } 
    }

    activateLine() {
        for(var i = 0;  i < this.cells.length;  i++) {
            this.cells[i][15].activate() 
        } 
    }

}

var r1 = Math.floor(Math.random() * 255) 
var r2 = Math.floor(Math.random() * 255) 
var g1 = Math.floor(Math.random() * 255) 
var g2 = Math.floor(Math.random() * 255) 
var b1 = Math.floor(Math.random() * 255) 
var b2 = Math.floor(Math.random() * 255) 

var col1 = '#' + r1.toString(16) + g1.toString(16) + b1.toString(16) 
var col2 = '#' + r2.toString(16) + g2.toString(16) + b2.toString(16) 

var a = new CellPlane(15, 15, 'transparent', '#21FA90') 
const sleep = ms => new Promise(r => setTimeout(r, ms)) 

a.randomizeCells(4000) 

const FRAME_DURATION = 1000 / 60 
const getTime = typeof performance === 'function' ? performance.now : Date.now 
const MAX_POSITION = 150 

// Initial time
let lastUpdate = getTime() 

const animate = () => {
    const now = getTime() 
    const delta = (now - lastUpdate) / FRAME_DURATION 

    a.updateCells()

    lastUpdate = now 

    setTimeout(animate, 100) 
}

animate() 