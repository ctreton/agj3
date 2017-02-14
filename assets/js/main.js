var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('agj3', 'assets/graphics/agj3.png', 'assets/graphics/agj3.json');
    game.load.image('background_day', 'assets/graphics/background.jpg');
    game.load.image('background_night', 'assets/graphics/background.png');
    game.load.image('paddle_day', 'assets/graphics/paddle_day.png');
    game.load.image('paddle_night', 'assets/graphics/paddle_night.png');
    game.load.image('brick_1', 'assets/graphics/brick_1.png');
    game.load.image('brick_2', 'assets/graphics/brick_2.png');
    game.load.image('brick_3', 'assets/graphics/brick_3.png');
    game.load.image('brick_4', 'assets/graphics/brick_4.png');
    game.load.image('ball_day', 'assets/graphics/ball_day.png');
    game.load.image('ball_night', 'assets/graphics/ball_night.png');

}

const BALL_SIZE = 16;
const PADDLE_WIDTH = 50;
const PADDLE_HEIGHT = 12;
const BRICK_WIDTH = 40;
const BRICK_HEIGHT = 20;
const PADDLE_MARGIN_BOTTOM = 20;
const MID = 0.5;
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const FOOTER_HEIGTH = 50;

var ball;
var paddle;
var bricks;

var ballOnPaddle = true;

var lives = 3;
var score = 0;

var day = true;

var ingameMenuBackground;
var scoreText;
var livesText;
var introText;

var s;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.checkCollision.down = false;

    s = game.add.tileSprite(0, 0, GAME_WIDTH, GAME_HEIGHT, 'background_day');

    bricks = game.add.group();
    bricks.enableBody = true;
    bricks.physicsBodyType = Phaser.Physics.ARCADE;


    loadLevelOne();

    paddle = game.add.sprite(game.world.centerX, GAME_HEIGHT - (FOOTER_HEIGTH + PADDLE_MARGIN_BOTTOM), 'paddle_day');
    paddle.width = PADDLE_WIDTH;
    paddle.height = PADDLE_HEIGHT;
    paddle.anchor.setTo(MID, MID);

    game.physics.enable(paddle, Phaser.Physics.ARCADE);

    paddle.body.collideWorldBounds = true;
    paddle.body.bounce.set(1);
    paddle.body.immovable = true;

    ball = game.add.sprite(game.world.centerX, paddle.y - BALL_SIZE, 'ball_day');
    ball.width = BALL_SIZE;
    ball.height = BALL_SIZE;
    ball.anchor.set(MID);
    ball.checkWorldBounds = true;

    game.physics.enable(ball, Phaser.Physics.ARCADE);

    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);

    ball.events.onOutOfBounds.add(ballLost, this);

    createIngameMenu();

    game.input.onDown.add(releaseBall, this);

}

function update () {

    paddle.x = game.input.x;

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
    }

}

function releaseBall () {

    if (ballOnPaddle)
    {
        ballOnPaddle = false;
        ball.body.velocity.y = -300;
        ball.body.velocity.x = -75;
        introText.visible = false;
    }

}

function ballLost () {

    lives--;
    livesText.text = 'lives\n' + lives;

    if (lives === 0)
    {
        gameOver();
    }
    else
    {
        ballOnPaddle = true;

        ball.reset(paddle.body.x, paddle.y - BALL_SIZE);

        ball.animations.stop();
    }

}

function gameOver () {

    ball.body.velocity.setTo(0, 0);

    introText.text = 'Game Over!';
    introText.visible = true;

}

function ballHitBrick (_ball, _brick) {

    _brick.kill();

    score += 10;

    scoreText.text = 'score\n' + score;

    if (bricks.countLiving() == 0)
    {
        score += 1000;
        scoreText.text = 'score\n' + score;
        introText.text = '- Next Level -';

        ballOnPaddle = true;
        ball.body.velocity.set(0);
        ball.x = paddle.x + 16;
        ball.y = paddle.y - 16;
        ball.animations.stop();

        enableDay();

        bricks.callAll('revive');
    } else if (bricks.countLiving() == 30) {
        enableNight();
    }

}

function ballHitPaddle (_ball, _paddle) {

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

}

function loadLevelOne () {
    var brick;

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 15; x++)
        {
            brick = bricks.create(75 + (x * 44), 100 + (y * 52), 'brick_' + (y+1));
            brick.width = BRICK_WIDTH;
            brick.height = BRICK_HEIGHT;
            brick.body.bounce.set(1);
            brick.body.immovable = true;
        }
    }
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
    scoreText = game.add.text(0, 0, 'score\n0', ingameMenuStyle);
    scoreText.setTextBounds(0, GAME_HEIGHT - FOOTER_HEIGTH, GAME_WIDTH / 4, FOOTER_HEIGTH);
    livesText = game.add.text(0, 0, 'lives\n3', ingameMenuStyle);
    livesText.setTextBounds(GAME_WIDTH - (GAME_WIDTH / 4), GAME_HEIGHT - FOOTER_HEIGTH, GAME_WIDTH / 4, FOOTER_HEIGTH);


    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(0.5, 0.5);
}

function toggleNightAndDay() {
    if (day) {
        enableDay();
    } else {
        enableNight();
    }
}

function enableDay() {
    s.loadTexture('background_day');
    ball.loadTexture('ball_day');
    paddle.loadTexture('paddle_day');
    bricks.visible = true;
    day = true;
}

function enableNight() {
    s.loadTexture('background_night');
    ball.loadTexture('ball_night');
    paddle.loadTexture('paddle_night');
    bricks.visible = false;
    day = false;
}










