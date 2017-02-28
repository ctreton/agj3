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
}

function menuTextHoverIn(_text) {
    _text.addColor(MENU_TEXT_COLOR_HOVER, 0);
}

function menuTextHoverOut(_text) {
    _text.addColor(MENU_TEXT_COLOR, 0);
}

function createMenuSettings() {
    menuSettingsBack = menuSettings.create(0, 0, 'background_day');

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
    menuSettingsSpeedButtonLine.lineStyle(2, 0x626262, 1);
    menuSettingsSpeedButtonLine.beginFill(0x626262, 1);
    menuSettingsSpeedButtonLine.moveTo(GAME_WIDTH / 2 + SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 2 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSpeedButtonLine.lineTo(GAME_WIDTH / 4 * 3 - SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 2 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSpeedButtonLine.endFill();
    menuSettingsSpeedButtonLine.beginFill(0x626262, 1);
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
    menuSettingsSensButtonLine.lineStyle(2, 0x626262, 1);
    menuSettingsSensButtonLine.beginFill(0x626262, 1);
    menuSettingsSensButtonLine.moveTo(GAME_WIDTH / 2 + SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSensButtonLine.lineTo(GAME_WIDTH / 4 * 3 - SELECTOR_WIDTH / 2 + 100, HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSensButtonLine.endFill();
    menuSettingsSensButtonLine.beginFill(0x626262, 1);
    menuSettingsSensButtonLine.moveTo(GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100, HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2));
    menuSettingsSensButtonLine.lineTo(GAME_WIDTH / 2 + GAME_WIDTH / 8 + 100, (HEADER_HEIGHT + optionHeight * 4 + (optionHeight / 2 - SELECTOR_HEIGHT / 2)) - 5);
    menuSettingsSensButtonLine.endFill();
}
