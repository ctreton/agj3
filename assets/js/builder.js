const BRICK_WIDTH = 40;
const BRICK_HEIGHT = 20;
const MID = 0.5;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const GRID_WIDTH = 800;
const GRID_HEIGHT = 400;
const FOOTER_HEIGTH = 50;

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'agj3builder', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('background', 'assets/graphics/background.jpg');
    game.load.image('brick_0', 'assets/graphics/brick_0_day.png');
    game.load.image('brick_1', 'assets/graphics/brick_1.png');
    game.load.image('brick_2', 'assets/graphics/brick_2.png');
    game.load.image('brick_3', 'assets/graphics/brick_3.png');
    game.load.image('brick_4', 'assets/graphics/brick_4.png');
    game.load.image('button_g', 'assets/graphics/button_g.png');
    game.load.image('button_r', 'assets/graphics/button_r.png');
}

var grid;
var bricks;
var selectors;
var currentSelector = 0;
var go;
var goText;
var reset;
var resetText;

function create() {
    s = game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background');
    drawGrid();
    createBricks();
    createSelectors();
}

function update() {

}

function drawGrid() {
    grid = game.add.graphics(0, 0);

    grid.lineStyle(1, 0xffffff, 1);
    grid.beginFill(0xffffff, 1);

    for(var i = 1; i < 21; i++) {
        grid.moveTo(BRICK_WIDTH * i, 0);
        grid.lineTo(BRICK_WIDTH * i, GRID_HEIGHT);
        grid.moveTo(0, BRICK_HEIGHT * i, 0);
        grid.lineTo(GRID_WIDTH, BRICK_HEIGHT * i);
    }

    grid.endFill();
}

function createBricks() {
    bricks = game.add.group();
    for(var i = 0; i < 20; i++){
        for(var j = 0; j < 20; j++){
            brick = bricks.create(i * BRICK_WIDTH, j * BRICK_HEIGHT, 'brick_1');
            brick.width = BRICK_WIDTH;
            brick.height = BRICK_HEIGHT;
            brick.i = i;
            brick.j = j;
            brick.type = -1;
            brick.inputEnabled = true;
            brick.alpha = 0;
            brick.events.onInputDown.add(clickOnBrick, this);
        }
    }
}

function createSelectors() {
    selectors = game.add.group();
    for (var i=0;i<5;i++) {
        selector = selectors.create((GAME_WIDTH - (50+2*BRICK_WIDTH)*2) / 6 * (i + 1) + (50+2*BRICK_WIDTH) - BRICK_WIDTH / 2,GAME_HEIGHT - FOOTER_HEIGTH, 'brick_' + i);
        selector.width = BRICK_WIDTH;
        selector.height = BRICK_HEIGHT;
        selector.inputEnabled = true;
        selector.type = i;
        selector.events.onInputDown.add(function(s){currentSelector = s.type;}, this);
    }
    go = game.add.sprite(GAME_WIDTH-(50+2*BRICK_WIDTH), GAME_HEIGHT - (FOOTER_HEIGTH + BRICK_HEIGHT / 2), 'button_g');
    go.width = BRICK_WIDTH * 2;
    go.height = BRICK_HEIGHT * 2;
    go.inputEnabled = true;
    go.events.onInputDown.add(buildLevel, this);
    var buttonStyle = { font: "22px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", align: "center"};
    goText = game.add.text(0, 2, 'Go', buttonStyle);
    goText.setTextBounds(GAME_WIDTH-(50+2*BRICK_WIDTH), GAME_HEIGHT - (FOOTER_HEIGTH + BRICK_HEIGHT / 2), BRICK_WIDTH * 2, BRICK_HEIGHT * 2);

    reset = game.add.sprite(50, GAME_HEIGHT - (FOOTER_HEIGTH + BRICK_HEIGHT / 2), 'button_r');
    reset.width = BRICK_WIDTH * 2;
    reset.height = BRICK_HEIGHT * 2;
    reset.inputEnabled = true;
    reset.events.onInputDown.add(resetGrid, this);
    resetText = game.add.text(0, 2, 'Reset', buttonStyle);
    resetText.setTextBounds(50, GAME_HEIGHT - (FOOTER_HEIGTH + BRICK_HEIGHT / 2), BRICK_WIDTH * 2, BRICK_HEIGHT * 2);
}

function clickOnBrick(brick){
    if(currentSelector != brick.type) {
        brick.alpha = 1;
        brick.loadTexture("brick_" + currentSelector);
        brick.type = currentSelector;
    } else {
        brick.alpha = 0;
        brick.type = -1;
    }
}

function buildLevel() {
    var levelBricks = [];
    var levelBricks0 = [];
    bricks.forEach(function(e){
        if (e.type > 0){
            levelBricks.push([e.i,e.j,e.type]);
        } else if (e.type == 0) {
            levelBricks0.push([e.i,e.j]);
        }
    });
    var level = {"name":"","enable":true,bricks":levelBricks,"bricks_0":levelBricks0};
    document.getElementById('level').value = JSON.stringify(level);
}

function resetGrid(){
    bricks.forEach(function(b){
        b.alpha = 0;
        b.type = -1;
    });
}


