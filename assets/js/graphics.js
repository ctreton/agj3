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
