const BALL_SIZE = 16;
const PADDLE_WIDTH = 50;
const PADDLE_HEIGHT = 12;
const LIFE_WIDTH = 18;
const LIFE_HEIGHT = 18;
const LIFE_INTER = 2;
const MAX_LIVES = 9;
const BRICK_WIDTH = 40;
const BRICK_HEIGHT = 20;
const PADDLE_MARGIN_BOTTOM = 20;
const MID = 0.5;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const FOOTER_HEIGTH = 50;
const KEY_SENS = 8;
const FONT = "Chewy";

var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'agj3game', { preload: preload, create: create, update: update });

WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND, changeFont, this); },
    google: {
      families: [FONT]
    }
};

function preload() {
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
    game.load.image('background_day', 'assets/graphics/background_day.jpg');
    game.load.image('background_night', 'assets/graphics/background_night.jpg');
    game.load.image('paddle_day', 'assets/graphics/paddle_day.png');
    game.load.image('paddle_night', 'assets/graphics/paddle_night.png');
    game.load.image('life', 'assets/graphics/life.png');
    game.load.image('brick_0_day', 'assets/graphics/brick_0_day.png');
    game.load.image('brick_0_night', 'assets/graphics/brick_0_night.png');
    game.load.image('brick_1', 'assets/graphics/brick_1.png');
    game.load.image('brick_2', 'assets/graphics/brick_2.png');
    game.load.image('brick_3', 'assets/graphics/brick_3.png');
    game.load.image('brick_4', 'assets/graphics/brick_4.png');
    game.load.image('ball_day', 'assets/graphics/ball_day.png');
    game.load.image('ball_night', 'assets/graphics/ball_night.png');
    game.load.image('bonus_0', 'assets/graphics/bonus_0.png');
    game.load.image('bonus_1', 'assets/graphics/bonus_1.png');
    game.load.audio('buttonSound', 'assets/audio/button.mp3');
    game.load.audio('brickSound', 'assets/audio/hit_brick.mp3');
    game.load.audio('paddleSound', 'assets/audio/hit_paddle.mp3');
    game.load.audio('bonusSound', 'assets/audio/hit_bonus.mp3');
    game.load.json('basicLevels', 'levels/basicLevels.json');
}

var ball;
var paddle;
var bricks;
var bricks_0;
var livesIcons;

var ballOnPaddle = true;

var lives = 3;
var score = 0;
var level = 0;
var levels = [];
var paused = false;
var moveMouse = false;

var escKey;
var pKey;
var cursors;
var spaceKey;

var savedVelocityX;
var savedVelocityY;
var over = false;

var day = true;

var ingameMenuBackground;
var scoreText;
var livesText;
var levelText;
var introText;

var buttonSound;
var brickSound;
var paddleSound;

var s;

function create() {
    initGame();

    initBonuses();

    addPaddle();

    addBall();

    createIngameMenu();

    loadLevels();

    loadNextLevel();

    inputEvents();
}

function initGame() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background_day');

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;

    bricks_0 = game.add.group();
    bricks_0.enableBody = true;
    bricks_0.physicsBodyType = Phaser.Physics.ARCADE;

    buttonSound = game.add.audio('buttonSound');
    brickSound = game.add.audio('brickSound');
    paddleSound = game.add.audio('paddleSound');

}

function inputEvents(){
    game.input.onDown.add(releaseBallByClick, this);
    escKey = game.input.keyboard.addKey(Phaser.KeyCode.ESC);
    escKey.onDown.add(togglePauseGame, this);
    pKey = game.input.keyboard.addKey(Phaser.KeyCode.P);
    pKey.onDown.add(togglePauseGame, this);
    spaceKey = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    spaceKey.onDown.add(releaseBallByKeyboard, this);
    cursors = game.input.keyboard.createCursorKeys();

}

function addPaddle() {

    paddle = game.add.sprite(game.world.centerX, GAME_HEIGHT - (FOOTER_HEIGTH + PADDLE_MARGIN_BOTTOM), 'paddle_day');
    paddle.width = PADDLE_WIDTH;
    paddle.height = PADDLE_HEIGHT;
    paddle.anchor.setTo(MID, MID);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

}

function addBall() {

    ball = game.add.sprite(game.world.centerX, paddle.y - BALL_SIZE, 'ball_day');
    ball.width = BALL_SIZE;
    ball.height = BALL_SIZE;
    ball.anchor.set(MID);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    ball.events.onOutOfBounds.add(ballLost, this);

}

function update () {

    if (!paused) {

        if (moveMouse){
            paddle.x = game.input.x;
        } else {
            if (cursors.left.isDown){
                paddle.x -= KEY_SENS;
            }
            if (cursors.right.isDown) {
                paddle.x += KEY_SENS;
            }
        }

        if (paddle.x < (PADDLE_WIDTH / 2))
        {
            paddle.x = (PADDLE_WIDTH / 2);
        }
        else if (paddle.x > GAME_WIDTH - (PADDLE_WIDTH / 2))
        {
            paddle.x = GAME_WIDTH - (PADDLE_WIDTH / 2);
        }

        if (ballOnPaddle)
        {
            ball.body.x = paddle.x - (BALL_SIZE / 2);
        }
        else
        {
            game.physics.arcade.collide(ball, paddle, ballHitPaddle, null, this);
            game.physics.arcade.collide(ball, bricks, ballHitBrick, null, this);
            game.physics.arcade.collide(ball, bricks_0, ballHitBrick_0, null, this);
            game.physics.arcade.collide(bonuses, paddle, bonusesHitPaddle, null, this);
        }
    }

}

function togglePauseGame() {
    if (paused) {
        unpauseGame();
    } else {
        pauseGame();
    }
}

function pauseGame () {
    paused = true;
    introText.text = "Paused";
    introText.visible = true;
    savedVelocityX = ball.body.velocity.x;
    savedVelocityY = ball.body.velocity.y;
    ball.body.velocity.setTo(0, 0);
}

function unpauseGame() {
    paused = false;
    introText.visible = false;
    ball.body.velocity.y = savedVelocityY;
    ball.body.velocity.x = savedVelocityX;
}

function releaseBallByClick() {
    moveMouse = true;
    releaseBall();
}

function releaseBallByKeyboard() {
    moveMouse = false;
    releaseBall();
}

function releaseBall() {

    if (ballOnPaddle && !over)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        introText.visible = false;
    }

}

function ballLost() {

    if (lives === 1)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        ball.reset(paddle.body.x, paddle.y - BALL_SIZE);

        ball.animations.stop();

        lives--;
        refreshLives();
    }

}

function gameOver() {

    ball.body.velocity.setTo(0, 0);

    introText.text = 'Game Over!';
    introText.visible = true;

    over = true;

}

function ballHitBrick(_ball, _brick) {

    _brick.kill();

    brickSound.play();

    score += 10;
    refreshScore();

    if (bricks.countLiving() == 0 && bricks_0.countLiving() == 0)
    {
        score += 1000;
        level++;
        scoreText.text = 'score\n' + score;
        introText.text = '- Next Level -';

        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        enableDay();

        bricks.removeAll();
        bricks_0.removeAll();
        loadNextLevel();
        bricks.callAll('revive');
        bricks_0.callAll('revive');
    } else {
        brickBonus(_brick);
    }

}

function refreshScore() {
    scoreText.text = 'score\n' + score;
}

function refreshLives() {
    if(lives > MAX_LIVES) {
        lives = MAX_LIVES;
    }
    livesIcons.removeAll();
    var life;
    var paddingLeft = (GAME_WIDTH / 4 - (lives * LIFE_WIDTH + (lives - 1) * LIFE_INTER)) / 2;
    for(var i = 0; i < lives; i++) {
        life = livesIcons.create(
            GAME_WIDTH - (GAME_WIDTH / 4) + paddingLeft + i * (LIFE_WIDTH + LIFE_INTER),
            GAME_HEIGHT - ((FOOTER_HEIGTH - LIFE_HEIGHT) / 2 + LIFE_HEIGHT),
            'life'
        );
        life.width = LIFE_WIDTH;
        life.height = LIFE_HEIGHT;
    }

}

function ballHitBrick_0(_ball, _brick) {
    toggleNightAndDay();
    buttonSound.play();
    ballHitBrick(_ball, _brick);
}

function ballHitPaddle(_ball, _paddle) {

    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }

    paddleSound.play();

}

function createIngameMenu() {

    gameMenuBackground = game.add.graphics(0, 0);
    gameMenuBackground.beginFill(0xffffff, 0.3);
    gameMenuBackground.drawRect(0, GAME_HEIGHT - FOOTER_HEIGTH, GAME_WIDTH, FOOTER_HEIGTH);
    gameMenuBackground.endFill();

    gameMenuBackground.lineStyle(2, 0xffffff, 1);
    gameMenuBackground.beginFill(0xffffff, 1);
    gameMenuBackground.moveTo(0, GAME_HEIGHT - FOOTER_HEIGTH);
    gameMenuBackground.lineTo(GAME_WIDTH, GAME_HEIGHT - FOOTER_HEIGTH);
    gameMenuBackground.endFill();

    gameMenuBackground.lineStyle(2, 0xffffff, 1);
    gameMenuBackground.beginFill(0xffffff, 1);
    gameMenuBackground.moveTo(GAME_WIDTH / 4, GAME_HEIGHT - FOOTER_HEIGTH);
    gameMenuBackground.lineTo(GAME_WIDTH / 4, GAME_HEIGHT);
    gameMenuBackground.endFill();

    gameMenuBackground.lineStyle(2, 0xffffff, 1);
    gameMenuBackground.beginFill(0xffffff, 1);
    gameMenuBackground.moveTo(GAME_WIDTH - (GAME_WIDTH / 4), GAME_HEIGHT - FOOTER_HEIGTH);
    gameMenuBackground.lineTo(GAME_WIDTH - (GAME_WIDTH / 4), GAME_HEIGHT);
    gameMenuBackground.endFill();

    window.graphics = gameMenuBackground;

    var ingameMenuStyle = { font: "18px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", align: "center"};
    scoreText = game.add.text(0, 5, 'score\n0', ingameMenuStyle);
    scoreText.setTextBounds(0, GAME_HEIGHT - FOOTER_HEIGTH, GAME_WIDTH / 4, FOOTER_HEIGTH);
    scoreText.lineSpacing = -10;
    livesIcons = game.add.group();
    refreshLives();
    levelText = game.add.text(0, 5, '', ingameMenuStyle);
    levelText.setTextBounds(GAME_WIDTH / 4, GAME_HEIGHT - FOOTER_HEIGTH, GAME_WIDTH / 2, FOOTER_HEIGTH);
    levelText.fontSize = 32;

    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(MID, MID);
}

function changeFont() {
    introText.font = FONT;
    levelText.font = FONT;
    scoreText.font = FONT;
}

function toggleNightAndDay() {
    if (day) {
        enableNight();
    } else {
        enableDay();
    }
}

function enableDay() {
    s.loadTexture('background_day');
    ball.loadTexture('ball_day');
    paddle.loadTexture('paddle_day');
    bricks.visible = true;
    bricks_0.forEach(function(brick_0){
        brick_0.loadTexture('brick_0_day');
    });
    day = true;
}

function enableNight() {
    s.loadTexture('background_night');
    ball.loadTexture('ball_night');
    paddle.loadTexture('paddle_night');
    bricks.visible = false;
    bricks_0.forEach(function(brick_0){
        brick_0.loadTexture('brick_0_night');
    });
    day = false;
}

function loadLevels() {
    var basicLevels = game.cache.getJSON('basicLevels');
    basicLevels["levels"].forEach(function(lvl){
        if(lvl["enable"]){
            levels.push(lvl);
        }
    });
}

function loadNextLevel() {
    if (levels[level]) {
        var brick;
        levels[level]["bricks"].forEach(function(b){
            brick = bricks.create(b[0] * BRICK_WIDTH, b[1] * BRICK_HEIGHT, 'brick_' + b[2]);
            brick.width = BRICK_WIDTH;
            brick.height = BRICK_HEIGHT;
            brick.body.bounce.set(1);
            brick.body.immovable = true;
            brick.night = false;
            brick.color = b[2];
        });
        levels[level]["bricks_0"].forEach(function(b){
            brick = bricks_0.create(b[0] * BRICK_WIDTH, b[1] * BRICK_HEIGHT, 'brick_0_day');
            brick.width = BRICK_WIDTH;
            brick.height = BRICK_HEIGHT;
            brick.body.bounce.set(1);
            brick.body.immovable = true;
            brick.night = true;
        });
        if(levels[level]["name"] && levels[level]["name"] != "") {
            levelText.text = levels[level]["name"];
        } else {
            levelText.text = 'Level ' + (level + 1);
        }
    } else {
        gameOver();
    }
}









