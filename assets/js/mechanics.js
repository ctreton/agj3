function update() {

    if (!paused && !menu) {

        if (moveMouse){
            paddle.x = game.input.x;
        } else {
            if (cursors.left.isDown){
                paddle.x -= KEY_SENS * sens;
            }
            if (cursors.right.isDown) {
                paddle.x += KEY_SENS * sens;
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

function toggleMenu() {
    if(menu) {
        quitMenu();
    } else {
        printMenu();
    }
}

function printMenu() {
    if (!paused) {
        pauseGame();
    }
    menu = true;
    menuHome.callAll('revive');
}

function quitMenu() {
    menu = false;
    menuHome.callAll('kill');
}

function togglePauseGame() {
    if (paused && !menu) {
        unpauseGame();
    } else {
        pauseGame();
    }
}

function pauseGame() {
    paused = true;
    introText.text = "Paused";
    introText.visible = true;
    savedVelocityX = ball.body.velocity.x;
    savedVelocityY = ball.body.velocity.y;
    bonuses.forEach(function(b){b.body.velocity.y = 0;});
    ball.body.velocity.setTo(0, 0);
}

function unpauseGame() {
    paused = false;
    introText.visible = false;
    ball.body.velocity.y = savedVelocityY;
    ball.body.velocity.x = savedVelocityX;
    bonuses.forEach(function(b){b.body.velocity.y = (BONUS_VELOCITY_Y * speed);});
}

function handleClick() {
    if (moveMouse) {
        if (paused && !menu) {
            unpauseGame();
        } else {
            releaseBall();
        }
    }
}

function handleSpace() {
    if (!moveMouse) {
        if (paused && !menu) {
            unpauseGame();
        } else {
            releaseBall();
        }
    }
}

function handleEscape() {
    if (settings) {
        exitSettings();
    } else {
        toggleMenu();
    }
}

function releaseBall() {
    if (ballOnPaddle && !over && !menu) {
        ballOnPaddle = false;
        ball.body.velocity.y = BALL_SPEED * speed;
        ball.body.velocity.x = -75;
        introText.visible = false;
    }
}

function ballLost() {
    if (lives === 1) {
        gameOver();
    } else {
        ballOnPaddle = true;
        ball.reset(paddle.body.x, paddle.y - BALL_SIZE);
        lives--;
        refreshLives();
    }

}

function ballHitBrick(_ball, _brick) {

    score += 10 * _brick.color;
    _brick.kill();

    play(brickSound);

    refreshScore();

    if (bricks.countLiving() == 0 && bricks_0.countLiving() == 0)
    {
        score += 1000;
        level++;
        scoreText.text = 'score\n' + score;

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

function ballHitBrick_0(_ball, _brick) {
    toggleNightAndDay();
    play(buttonSound);
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

    play(paddleSound);

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
            brick.color = 10;
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

function brickBonus(_brick) {
    if(!_brick.night) {
        var chance = Math.random() * 10;
        if (chance < parseInt(_brick.color)){
            addBonus(_brick);
        }
    }
}

function addBonus(_brick) {
    var chance = Math.random() * 10;
    var type = 0;
    if(chance < 1){
        type = 1;
    }
    var bonus = bonuses.create(_brick.x + (BRICK_WIDTH / 2) - (BONUS_WIDTH / 2), _brick.y + BRICK_HEIGHT, 'bonus_' + type);
    bonus.width = BONUS_WIDTH;
    bonus.height = BONUS_HEIGHT;
    bonus.body.bounce.set(1);
    bonus.body.immovable = true;
    bonus.type = type;
    bonus.body.velocity.y = BONUS_VELOCITY_Y * speed;
    bonus.events.onOutOfBounds.add(bonusLost, this);
}

function bonusesHitPaddle(_paddle, _bonus) {
    var bonusType = _bonus.type;
    _bonus.destroy();
    play(bonusSound);
    if(bonusType == 0) {
        score += 50;
        refreshScore();
    } else if (bonusType == 1) {
        lives++;
        refreshLives();
    }
}

function bonusLost(_bonus) {
    _bonus.destroy();
}

function gameOver() {
    ball.body.velocity.setTo(0, 0);
    introText.text = 'Game Over!';
    introText.visible = true;
    over = true;
}

function menuNewGame() {
    bricks.removeAll();
    bricks_0.removeAll();
    bonuses.removeAll();
    level = 0;
    lives = 3;
    refreshLives();
    score = 0;
    ballOnPaddle = true;
    enableDay();
    introText.text = 'click to start';
    ball.reset(paddle.body.x, paddle.y - BALL_SIZE);
    refreshScore();
    loadNextLevel();
    menuHome.callAll('kill');
    menu = false;
    paused = false;
    over = false;
}

function menuSettings() {
    settings = true;
    menuSettings.callAll('revive');
    menuHome.callAll('kill');
}

function exitSettings() {
    settings = false;
    menuHome.callAll('revive');
    menuSettings.callAll('kill');
}

function play(sound) {
    if(!mute) {
        sound.play();
    }
}

function toggleSoundFX() {
    if(mute) {
        enableSoundFX();
    } else {
        disableSoundFX();
    }
}

function enableSoundFX() {
    menuSettingsSoundFXButtonText.text = 'On';
    mute = false;
}

function disableSoundFX() {
    menuSettingsSoundFXButtonText.text = 'Off';
    mute = true;
}

function toggleControl() {
    if(moveMouse) {
        enableKeyboard();
    } else {
        enableMouse();
    }
}

function enableKeyboard() {
    moveMouse = false;
    menuSettingsControlButtonText.text = "Keyboard";
}

function enableMouse() {
    moveMouse = true;
    menuSettingsControlButtonText.text = "Mouse";
}

function resetSettings() {
    enableSoundFX();
    enableMouse();
    speed = 1;
    menuSettingsSpeedButton.x = GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100;
    sens = 1;
    menuSettingsSensButton.x = GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100;
}

function setSpeedPosition(item) {
    speed = ((item.x - (GAME_WIDTH / 2 + SELECTOR_WIDTH / 2 + 100)) / ((GAME_WIDTH / 4) - SELECTOR_WIDTH) + 100) + 0.5 - 100;
    if(savedVelocityY) {
        savedVelocityY = speed * BALL_SPEED;
    }
}

function setSensPosition(item) {
    sens = ((item.x - (GAME_WIDTH / 2 + SELECTOR_WIDTH / 2 + 100)) / ((GAME_WIDTH / 4) - SELECTOR_WIDTH) + 100) + 0.5 - 100;
}
