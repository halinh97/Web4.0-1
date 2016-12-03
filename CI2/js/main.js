var Nakama = {};
Nakama.configs = {
  SHIP_SPEED : 700,
  BULLET_SPEED : 1000,
  ENEMY_HEALTH: 5,
  SHIP_HEALTH: 250,
  ENEMY_NUMBER: 20,
  COOL_DOWN: 0.1,
  COOL_DOWN_ENEMY: 5
}
window.onload = function () {
  Nakama.game = new Phaser.Game(
    640,
    960,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render,
    },
    false,
    false
  );
}

var preload = function(){
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');
  Nakama.game.load.spritesheet('destroy', 'Assets/explode.png', 128, 128);
  Nakama.game.time.advancedTiming = true;
}

var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE);
  Nakama.game.physics.setBoundsToWorld();
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.map = Nakama.game.add.tileSprite(
    0,
    0,
    640,
    960,
    'background'
  );

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.explosionGroup = Nakama.game.add.group();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.shipControllers = [];
  Nakama.enemyControllers = [];

  Nakama.shipControllers.push(
    new ShipController(245, 800, "Spaceship1-Player.png", {
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN,
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      fire: Phaser.Keyboard.SPACEBAR,
      cooldown: Nakama.configs.COOL_DOWN,
      bulletType: "BulletType1.png"
  }));

  Nakama.shipControllers.push(
    new ShipController(400, 800, "Spaceship1-Partner.png", {
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S,
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      fire: Phaser.Keyboard.SHIFT,
      cooldown: Nakama.configs.COOL_DOWN,
      bulletType: "BulletType2.png"
  }));

  for (var i = 0; i < Nakama.configs.ENEMY_NUMBER; i++) {
    createEnemy();
  }

  Nakama.explosionGroup.createMultiple(30, 'destroy');
  Nakama.explosionGroup.forEach(setupInvader, this);
}

function setupInvader(invader){
  invader.anchor.x = 0.5;
  invader.anchor.y = 0.5;
  invader.animations.add('destroy');
}

var update = function(){
  Nakama.map.tilePosition.y += 2;

  for (var i = 0; i < Nakama.shipControllers.length; i++) {
    Nakama.shipControllers[i].update();
  }

  var livingEnemy = Nakama.enemyGroup.countLiving();
  var totalEnemy = Nakama.configs.ENEMY_NUMBER;
  if (livingEnemy < totalEnemy) {
    for (var i = 0; i < (totalEnemy - livingEnemy); i++) {
      createEnemy();
    }
  }

  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.enemyGroup, onCrashActor);
}

function onBulletHitActor(bulletSprite, actorSprite){
  var explosion = Nakama.explosionGroup.getFirstExists(false);
  if(explosion){
    explosion.reset(bulletSprite.body.x, bulletSprite.body.y);
    explosion.play('destroy', 30, false, true);
  }

  actorSprite.damage(1);
  bulletSprite.kill();
}

function onCrashActor(shipSprite, enemySprite){
  var explosion = Nakama.explosionGroup.getFirstExists(false);
  if(explosion){
    explosion.reset(enemySprite.body.x, enemySprite.body.y);
    explosion.play('destroy', 30, false, true);
  }

  shipSprite.damage(10);
  enemySprite.kill();
}

function createEnemy(){
  Nakama.enemyControllers.push(new EnemyController(Nakama.game.world.randomX, Math.random() * -200, 50 + Math.random() * 200));
}

var render = function(){}
