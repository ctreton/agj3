function createIngameMenu() {

    gameMenuBackground = game.add.graphics(0, 0);
    gameMenuBackground.beginFill(0xffffff, 0.3);
    gameMenuBackground.drawRect(0, GAME_HEIGHT - FOOTER_HEIGHT, GAME_WIDTH, FOOTER_HEIGHT);
    gameMenuBackground.endFill();

    gameMenuBackground.lineStyle(2, 0xffffff, 1);
    gameMenuBackground.beginFill(0xffffff, 1);
    gameMenuBackground.moveTo(0, GAME_HEIGHT - FOOTER_HEIGHT);
    gameMenuBackground.lineTo(GAME_WIDTH, GAME_HEIGHT - FOOTER_HEIGHT);
    gameMenuBackground.endFill();

    gameMenuBackground.lineStyle(2, 0xffffff, 1);
    gameMenuBackground.beginFill(0xffffff, 1);
    gameMenuBackground.moveTo(GAME_WIDTH / 4, GAME_HEIGHT - FOOTER_HEIGHT);
    gameMenuBackground.lineTo(GAME_WIDTH / 4, GAME_HEIGHT);
    gameMenuBackground.endFill();

    gameMenuBackground.lineStyle(2, 0xffffff, 1);
    gameMenuBackground.beginFill(0xffffff, 1);
    gameMenuBackground.moveTo(GAME_WIDTH - (GAME_WIDTH / 4), GAME_HEIGHT - FOOTER_HEIGHT);
    gameMenuBackground.lineTo(GAME_WIDTH - (GAME_WIDTH / 4), GAME_HEIGHT);
    gameMenuBackground.endFill();

    window.graphics = gameMenuBackground;

    var ingameMenuStyle = { font: "18px Arial", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle", align: "center"};
    scoreText = game.add.text(0, 5, 'score\n0', ingameMenuStyle);
    scoreText.setTextBounds(0, GAME_HEIGHT - FOOTER_HEIGHT, GAME_WIDTH / 4, FOOTER_HEIGHT);
    scoreText.lineSpacing = -10;
    livesIcons = game.add.group();
    refreshLives();
    levelText = game.add.text(0, 5, '', ingameMenuStyle);
    levelText.setTextBounds(GAME_WIDTH / 4, GAME_HEIGHT - FOOTER_HEIGHT, GAME_WIDTH / 2, FOOTER_HEIGHT);
    levelText.fontSize = 32;

    introText = game.add.text(game.world.centerX, 400, '- click to start -', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(MID, MID);
}

function changeFont() {
    introText.font = FONT;
    levelText.font = FONT;
    scoreText.font = FONT;
    menuHomeTitleText.font = FONT;
    menuHomeNewText.font = FONT;
    menuHomeResumeText.font = FONT;
    menuHomeSettingText.font = FONT;
    menuHomeHelpText.font = FONT;
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
            GAME_HEIGHT - ((FOOTER_HEIGHT - LIFE_HEIGHT) / 2 + LIFE_HEIGHT),
            'life'
        );
        life.width = LIFE_WIDTH;
        life.height = LIFE_HEIGHT;
    }

}

function createMenuHome() {
    menuHomeBack = menuHome.create(0, 0, 'background_day');

    var menuTitleStyle = { font: "60px Arial", fill: MENU_TEXT_COLOR, boundsAlignH: "center", boundsAlignV: "middle", align: "center"};
    var menuOptionStyle = { font: "40px Arial", fill: MENU_TEXT_COLOR, boundsAlignH: "center", boundsAlignV: "middle", align: "center"};
    menuHomeTitleText = game.add.text(0, 0, 'Akeneo Game Jame #3', menuTitleStyle, menuHome);
    menuHomeNewText = game.add.text(0, 0, 'New game', menuOptionStyle, menuHome);
    menuHomeResumeText = game.add.text(0, 0, 'Resume game', menuOptionStyle, menuHome);
    menuHomeSettingText = game.add.text(0, 0, 'Settings', menuOptionStyle, menuHome);
    menuHomeHelpText = game.add.text(0, 0, 'Help', menuOptionStyle, menuHome);
    var optionHeight = (GAME_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT)) / 5;
    menuHomeTitleText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 0, GAME_WIDTH, optionHeight);
    menuHomeNewText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 1, GAME_WIDTH, optionHeight);
    menuHomeResumeText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 2, GAME_WIDTH, optionHeight);
    menuHomeSettingText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 3, GAME_WIDTH, optionHeight);
    menuHomeHelpText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 4, GAME_WIDTH, optionHeight);
    menuHomeNewText.inputEnabled = true;
    menuHomeNewText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeNewText.events.onInputOut.add(menuTextHoverOut, this);
    menuHomeResumeText.inputEnabled = true;
    menuHomeResumeText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeResumeText.events.onInputOut.add(menuTextHoverOut, this);
    menuHomeSettingText.inputEnabled = true;
    menuHomeSettingText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeSettingText.events.onInputOut.add(menuTextHoverOut, this);
    menuHomeHelpText.inputEnabled = true;
    menuHomeHelpText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeHelpText.events.onInputOut.add(menuTextHoverOut, this);
}

function menuTextHoverIn(_text) {
    _text.addColor(MENU_TEXT_COLOR_HOVER, 0);
}

function menuTextHoverOut(_text) {
    _text.addColor(MENU_TEXT_COLOR, 0);
}
