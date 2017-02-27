var bonuses;
var bonusSound;

const BONUS_WIDTH  = 20;
const BONUS_HEIGHT = 20;

function initBonuses() {
    bonuses = game.add.group();
    bonuses.enableBody = true;
    bonuses.physicsBodyType = Phaser.Physics.ARCADE;
    bonusSound = game.add.audio('bonusSound');
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
    bonus.body.velocity.y = 200;
    bonus.events.onOutOfBounds.add(bonusLost, this);
}

function bonusesHitPaddle(_paddle, _bonus) {
    var bonusType = _bonus.type;
    _bonus.destroy();
    bonusSound.play();
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
