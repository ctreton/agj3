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

    introText = game.add.text(game.world.centerX, 400, 'click to start', { font: "40px Arial", fill: "#ffffff", align: "center" });
    introText.anchor.setTo(MID, MID);
}

function changeFont() {
    introText.font = FONT;
    levelText.font = FONT;
    scoreText.font = FONT;
    menuHomeTitleText.font = FONT;
    menuHomeNewText.font = FONT;
    menuHomeResumeText.font = FONT;
    menuHomeSettingsText.font = FONT;
    menuHomeHelpText.font = FONT;
    menuSettingsTitleText.font = FONT;
    menuSettingsSoundFXText.font = FONT;
    menuSettingsSoundFXButtonText.font = FONT;
    menuSettingsSpeedText.font = FONT;
    menuSettingsControlText.font = FONT;
    menuSettingsControlButtonText.font = FONT;
    menuSettingsResetButtonText.font = FONT;
    menuSettingsKeySensButtonText.font = FONT;
    menuSettingsExitText.font = FONT;
    menuHelpTitleText.font = FONT;
    menuHelpExitText.font = FONT;
    menuHelpGameplayText.font = FONT;
    menuHelpBricksText.font = FONT;
    menuHelpBrick1Text.font = FONT;
    menuHelpBrick2Text.font = FONT;
    menuHelpBrick3Text.font = FONT;
    menuHelpBrick4Text.font = FONT;
    menuHelpBrick0Text.font = FONT;
    menuHelpBonusText.font = FONT;
    menuHelpCoinText.font = FONT;
    menuHelpLifeText.font = FONT;
}

function refreshScore() {
    scoreText.text = 'score\n' + score;
}

function refreshLives() {
    if (lives > MAX_LIVES) {
        lives = MAX_LIVES;
    }
    livesIcons.removeAll();
    var life;
    var paddingLeft = (GAME_WIDTH / 4 - (lives * LIFE_WIDTH + (lives - 1) * LIFE_INTER)) / 2;
    for (var i = 0; i < lives; i++) {
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
    menuHomeBack.width = GAME_WIDTH;
    menuHomeBack.height = GAME_HEIGHT;
    menuHomeTitleText = game.add.text(0, 0, 'Akeneo Game Jam #3', menuTitleStyle, menuHome);
    menuHomeNewText = game.add.text(0, 0, 'New game', menuOptionStyle, menuHome);
    menuHomeResumeText = game.add.text(0, 0, 'Resume game', menuOptionStyle, menuHome);
    menuHomeSettingsText = game.add.text(0, 0, 'Settings', menuOptionStyle, menuHome);
    menuHomeHelpText = game.add.text(0, 0, 'Help', menuOptionStyle, menuHome);
    var optionHeight = (GAME_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT)) / 5;
    menuHomeTitleText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 0, GAME_WIDTH, optionHeight);
    menuHomeNewText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 1, GAME_WIDTH, optionHeight);
    menuHomeResumeText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 2, GAME_WIDTH, optionHeight);
    menuHomeSettingsText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 3, GAME_WIDTH, optionHeight);
    menuHomeHelpText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 4, GAME_WIDTH, optionHeight);
    menuHomeNewText.inputEnabled = true;
    menuHomeNewText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeNewText.events.onInputOut.add(menuTextHoverOut, this);
    menuHomeNewText.events.onInputDown.add(menuNewGame, this);
    menuHomeResumeText.inputEnabled = true;
    menuHomeResumeText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeResumeText.events.onInputOut.add(menuTextHoverOut, this);
    menuHomeResumeText.events.onInputDown.add(quitMenu, this);
    menuHomeSettingsText.inputEnabled = true;
    menuHomeSettingsText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeSettingsText.events.onInputOut.add(menuTextHoverOut, this);
    menuHomeSettingsText.events.onInputDown.add(menuSettings, this);
    menuHomeHelpText.inputEnabled = true;
    menuHomeHelpText.events.onInputOver.add(menuTextHoverIn, this);
    menuHomeHelpText.events.onInputOut.add(menuTextHoverOut, this);
    menuHomeHelpText.events.onInputDown.add(menuHelp, this);
}

function menuTextHoverIn(_text) {
    _text.addColor(MENU_TEXT_COLOR_HOVER, 0);
}

function menuTextHoverOut(_text) {
    _text.addColor(MENU_TEXT_COLOR, 0);
}

function createMenuSettings() {
    menuSettingsBack = menuSettings.create(0, 0, 'background_day');
    menuSettingsBack.width = GAME_WIDTH;
    menuSettingsBack.height = GAME_HEIGHT;

    var optionHeight = (GAME_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT)) / 6;

    menuSettingsTitleText = game.add.text(0, 0, 'Settings', menuTitleStyle, menuSettings);
    menuSettingsExitText = game.add.text(0, 0, 'X', menuTitleStyle, menuSettings);
    menuSettingsSoundFXText = game.add.text(0, 0, 'Sound effects', menuOptionStyle, menuSettings);
    menuSettingsSoundFXButtonText = game.add.text(0, 0, 'On', menuOptionStyle, menuSettings);
    menuSettingsSpeedText = game.add.text(0, 0, 'Speed', menuOptionStyle, menuSettings);
    menuSettingsControlText = game.add.text(0, 0, 'Controller', menuOptionStyle, menuSettings);
    menuSettingsControlButtonText = game.add.text(0, 0, 'Mouse', menuOptionStyle, menuSettings);
    menuSettingsKeySensButtonText = game.add.text(0, 0, 'Keyboard Sensitivity', menuOptionStyle, menuSettings);
    menuSettingsResetButtonText = game.add.text(0, 0, 'Reset settings', menuOptionStyle, menuSettings);

    menuSettingsTitleText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 0, GAME_WIDTH, optionHeight);
    menuSettingsExitText.setTextBounds(20, 20, 50, 50);
    menuSettingsExitText.fontSize = 50;
    menuSettingsExitText.inputEnabled = true;
    menuSettingsExitText.events.onInputDown.add(exitSettings, this);
    menuSettingsExitText.events.onInputOver.add(menuTextHoverIn, this);
    menuSettingsExitText.events.onInputOut.add(menuTextHoverOut, this);
    menuSettingsSoundFXText.setTextBounds(GAME_WIDTH / 4 - 100, HEADER_HEIGHT + optionHeight * 1, GAME_WIDTH / 4, optionHeight);
    menuSettingsSoundFXButtonText.setTextBounds(GAME_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 1, GAME_WIDTH / 4, optionHeight);
    menuSettingsSoundFXButtonText.inputEnabled = true;
    menuSettingsSoundFXButtonText.events.onInputDown.add(toggleSoundFX, this);
    menuSettingsSpeedText.setTextBounds(GAME_WIDTH / 4 - 100, HEADER_HEIGHT + optionHeight * 2, GAME_WIDTH / 4, optionHeight);
    menuSettingsControlText.setTextBounds(GAME_WIDTH / 4 - 100, HEADER_HEIGHT + optionHeight * 3, GAME_WIDTH / 4, optionHeight);
    menuSettingsControlButtonText.setTextBounds(GAME_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 3, GAME_WIDTH / 4, optionHeight);
    menuSettingsControlButtonText.inputEnabled = true;
    menuSettingsControlButtonText.events.onInputDown.add(toggleControl, this);
    menuSettingsKeySensButtonText.setTextBounds(GAME_WIDTH / 4 - 100, HEADER_HEIGHT + optionHeight * 4, GAME_WIDTH / 4, optionHeight);
    menuSettingsResetButtonText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 5, GAME_WIDTH, optionHeight);
    menuSettingsResetButtonText.inputEnabled = true;
    menuSettingsResetButtonText.events.onInputDown.add(resetSettings, this);
    menuSettingsResetButtonText.events.onInputOver.add(menuTextHoverIn, this);
    menuSettingsResetButtonText.events.onInputOut.add(menuTextHoverOut, this);

    var positionSpeed = ((speed - 0.5) * ((GAME_WIDTH / 4) - SELECTOR_WIDTH));
    menuSettingsSpeedButton = menuSettings.create(GAME_WIDTH / 2 + positionSpeed + SELECTOR_WIDTH / 2 + 100, (HEADER_HEIGHT + optionHeight * 2) + (optionHeight / 2), 'selector');
    menuSettingsSpeedButton.height = SELECTOR_HEIGHT;
    menuSettingsSpeedButton.width = SELECTOR_WIDTH;
    menuSettingsSpeedButton.inputEnabled = true;
    menuSettingsSpeedButton.anchor.setTo(MID,MID);
    menuSettingsSpeedButton.input.enableDrag();
    menuSettingsSpeedButton.input.allowVerticalDrag = false;
    menuSettingsSpeedButton.input.boundsRect = new Phaser.Rectangle(GAME_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 2, GAME_WIDTH / 4, optionHeight);
    menuSettingsSpeedButton.events.onDragStop.add(setSpeedPosition, this);

    menuSettingsSpeedButtonLine = game.add.graphics(0, 0, menuSettings);
    menuSettingsSpeedButtonLine.lineStyle(2, MENU_TEXT_COLOR_HEX, 1);
    menuSettingsSpeedButtonLine.beginFill(MENU_TEXT_COLOR_HEX, 1);
    menuSettingsSpeedButtonLine.moveTo(GAME_WIDTH / 2 + SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 2 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSpeedButtonLine.lineTo(GAME_WIDTH / 4 * 3 - SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 2 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSpeedButtonLine.endFill();
    menuSettingsSpeedButtonLine.beginFill(MENU_TEXT_COLOR_HEX, 1);
    menuSettingsSpeedButtonLine.moveTo(GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100, HEADER_HEIGHT + optionHeight * 2 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSpeedButtonLine.lineTo(GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100, (HEADER_HEIGHT + optionHeight * 2 + (optionHeight / 2 - SELECTOR_HEIGHT / 2)) - 5);
    menuSettingsSpeedButtonLine.endFill();

    var positionSens = ((speed - 0.5) * ((GAME_WIDTH / 4) - SELECTOR_WIDTH));
    menuSettingsSensButton = menuSettings.create(GAME_WIDTH / 2 + positionSens + SELECTOR_WIDTH / 2 + 100, (HEADER_HEIGHT + optionHeight * 4) + (optionHeight / 2), 'selector');
    menuSettingsSensButton.height = SELECTOR_HEIGHT;
    menuSettingsSensButton.width = SELECTOR_WIDTH;
    menuSettingsSensButton.inputEnabled = true;
    menuSettingsSensButton.anchor.setTo(MID,MID);
    menuSettingsSensButton.input.enableDrag();
    menuSettingsSensButton.input.allowVerticalDrag = false;
    menuSettingsSensButton.input.boundsRect = new Phaser.Rectangle(GAME_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 4, GAME_WIDTH / 4, optionHeight);
    menuSettingsSensButton.events.onDragStop.add(setSensPosition, this);

    menuSettingsSensButtonLine = game.add.graphics(0, 0, menuSettings);
    menuSettingsSensButtonLine.lineStyle(2, MENU_TEXT_COLOR_HEX, 1);
    menuSettingsSensButtonLine.beginFill(MENU_TEXT_COLOR_HEX, 1);
    menuSettingsSensButtonLine.moveTo(GAME_WIDTH / 2 + SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSensButtonLine.lineTo(GAME_WIDTH / 4 * 3 - SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSensButtonLine.endFill();
    menuSettingsSensButtonLine.beginFill(MENU_TEXT_COLOR_HEX, 1);
    menuSettingsSensButtonLine.moveTo(GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100, HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSensButtonLine.lineTo(GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100, (HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2)) - 5);
    menuSettingsSensButtonLine.endFill();
}

function createMenuHelp() {
    menuHelpBack = menuHelp.create(0, 0, 'background_day');
    menuHelpBack.width = GAME_WIDTH;
    menuHelpBack.height = GAME_HEIGHT;

    var optionHeight = (GAME_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT)) / 12;

    menuHelpTitleText = game.add.text(0, 0, 'Help', menuTitleStyle, menuHelp);
    menuHelpExitText = game.add.text(0, 0, 'X', menuTitleStyle, menuHelp);
    menuHelpGameplayText = game.add.text(0, 0, 'This game is a classic breakout-like game, with the paddle and the ball you have to destroy all the bricks on the screen to pass the level. The difference with classic games is in the day/night mode, if you destroy a switch brick (black or phosphorescent), you switch the mode. Day mode is the normal mode, in night mode you’ll see only switch bricks, bonuses, the ball and the paddle in phosphorescent color.', menuTextStyle, menuHelp);

    menuHelpBricksText = game.add.text(0, 0, 'Bricks', menuOptionStyle, menuHelp);
    menuHelpBrick1Text = game.add.text(0, 3, '10pts', menuHelpTextStyle, menuHelp);
    menuHelpBrick2Text = game.add.text(0, 3, '20pts', menuHelpTextStyle, menuHelp);
    menuHelpBrick3Text = game.add.text(0, 3, '30pts', menuHelpTextStyle, menuHelp);
    menuHelpBrick4Text = game.add.text(0, 3, '40pts', menuHelpTextStyle, menuHelp);
    menuHelpBrick0Text = game.add.text(0, 3, '100pts', menuHelpTextStyle, menuHelp);
    menuHelpBonusText  = game.add.text(0, 0, 'Bonus', menuOptionStyle, menuHelp);
    menuHelpCoinText   = game.add.text(0, 3, '50pts', menuHelpTextStyle, menuHelp);
    menuHelpLifeText   = game.add.text(0, 3, '+1 life', menuHelpTextStyle, menuHelp);

    menuHelpTitleText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 0, GAME_WIDTH, optionHeight * 2);
    menuHelpExitText.setTextBounds(20, 20, 50, 50);
    menuHelpExitText.fontSize = 50;
    menuHelpExitText.inputEnabled = true;
    menuHelpExitText.events.onInputDown.add(exitHelp, this);
    menuHelpExitText.events.onInputOver.add(menuTextHoverIn, this);
    menuHelpExitText.events.onInputOut.add(menuTextHoverOut, this);
    menuHelpGameplayText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 2, GAME_WIDTH, optionHeight * 4);
    menuHelpGameplayText.wordWrap = true;
    menuHelpGameplayText.wordWrapWidth = GAME_WIDTH - 50;

    menuHelpBricksText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 6, GAME_WIDTH, optionHeight);
    menuHelpBrick1Text.setTextBounds(GAME_WIDTH / 4 + MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 7, GAME_WIDTH / 4 - MENU_HELP_PADDING, optionHeight);
    menuHelpBrick2Text.setTextBounds(GAME_WIDTH / 4 + MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 8, GAME_WIDTH / 4 - MENU_HELP_PADDING, optionHeight);
    menuHelpBrick3Text.setTextBounds(GAME_WIDTH / 4 + MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 9, GAME_WIDTH / 4 - MENU_HELP_PADDING, optionHeight);
    menuHelpBrick4Text.setTextBounds(GAME_WIDTH / 4 * 3 + MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 7, GAME_WIDTH / 4 - MENU_HELP_PADDING, optionHeight);
    menuHelpBrick0Text.setTextBounds(GAME_WIDTH / 4 * 3 + MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 8, GAME_WIDTH / 4 - MENU_HELP_PADDING, optionHeight * 2);
    menuHelpBonusText.setTextBounds(0, HEADER_HEIGHT + optionHeight * 10, GAME_WIDTH, optionHeight);
    menuHelpCoinText.setTextBounds(GAME_WIDTH / 4 + MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 11, GAME_WIDTH / 4 - MENU_HELP_PADDING, optionHeight);
    menuHelpLifeText.setTextBounds(GAME_WIDTH / 4 * 3 + MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 11, GAME_WIDTH / 4 - MENU_HELP_PADDING, optionHeight);

    var menuHelpBrick1 = menuHelp.create((GAME_WIDTH / 4) - BRICK_WIDTH - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 7 + optionHeight / 2 - BRICK_HEIGHT / 2, 'brick_1');
    menuHelpBrick1.width = BRICK_WIDTH;
    menuHelpBrick1.height = BRICK_HEIGHT;
    var menuHelpBrick2 = menuHelp.create((GAME_WIDTH / 4) - BRICK_WIDTH - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 8 + optionHeight / 2 - BRICK_HEIGHT / 2, 'brick_2');
    menuHelpBrick2.width = BRICK_WIDTH;
    menuHelpBrick2.height = BRICK_HEIGHT;
    var menuHelpBrick3 = menuHelp.create((GAME_WIDTH / 4) - BRICK_WIDTH - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 9 + optionHeight / 2 - BRICK_HEIGHT / 2, 'brick_3');
    menuHelpBrick3.width = BRICK_WIDTH;
    menuHelpBrick3.height = BRICK_HEIGHT;
    var menuHelpBrick4 = menuHelp.create((GAME_WIDTH / 4) * 3 - BRICK_WIDTH - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 7 + optionHeight / 2 - BRICK_HEIGHT / 2, 'brick_4');
    menuHelpBrick4.width = BRICK_WIDTH;
    menuHelpBrick4.height = BRICK_HEIGHT;
    var menuHelpBrick0Day = menuHelp.create((GAME_WIDTH / 4) * 3 - BRICK_WIDTH - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 8 + optionHeight / 2 - BRICK_HEIGHT / 2, 'brick_0_day');
    menuHelpBrick0Day.width = BRICK_WIDTH;
    menuHelpBrick0Day.height = BRICK_HEIGHT;
    var menuHelpBrick0Night = menuHelp.create((GAME_WIDTH / 4) * 3 - BRICK_WIDTH - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 9 + optionHeight / 2 - BRICK_HEIGHT / 2, 'brick_0_night');
    menuHelpBrick0Night.width = BRICK_WIDTH;
    menuHelpBrick0Night.height = BRICK_HEIGHT;
    var menuHelpCoin = menuHelp.create((GAME_WIDTH / 4) - BRICK_WIDTH + (BRICK_WIDTH - BONUS_WIDTH) / 2 - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 11 + optionHeight / 2 - BONUS_HEIGHT / 2, 'bonus_0');
    menuHelpCoin.width = BONUS_WIDTH;
    menuHelpCoin.height = BONUS_HEIGHT;
    var menuHelpLife = menuHelp.create((GAME_WIDTH / 4) * 3 - BRICK_WIDTH + (BRICK_WIDTH - BONUS_WIDTH) / 2 - MENU_HELP_PADDING, HEADER_HEIGHT + optionHeight * 11 + optionHeight / 2 - BONUS_HEIGHT / 2, 'bonus_1');
    menuHelpLife.width = BONUS_WIDTH;
    menuHelpLife.height = BONUS_HEIGHT;
}
