var Nakama = {};
Nakama.configs = {
  SHIP_SPEED : 700,
  BULLET_SPEED : 1000,
  ENEMY_HEALTH: 5,
  ENEMY_NUMBER: 20,
  PLAYER_TYPE: {
    PLAYER_1: true,
    PLAYER_2: false
  }
}
window.onload = function () {
  Nakama.configs.SHIP_TYPE =
  {
    SHIP_TYPE_1: ShipType1Controller,
    SHIP_TYPE_2: ShipType2Controller,
    SHIP_TYPE_3: ShipType3Controller
  }
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
  Nakama.keyboard = Nakama.game.input.keyboard;

  Nakama.map = Nakama.game.add.tileSprite(
    0,
    0,
    640,
    960,
    'background'
  );

  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyBulletGroup = Nakama.game.add.physicsGroup();
  Nakama.explosionGroup = Nakama.game.add.group();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.bulletControllers = [];
  Nakama.shipControllers = [];
  Nakama.enemyControllers = [];

  var player1Constructor = getPlayerShipChoice("Player1")
  Nakama.shipControllers.push(
    new player1Constructor(245, 800, Nakama.configs.PLAYER_TYPE.PLAYER_1, {
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN,
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      fire: Phaser.Keyboard.SPACEBAR
  }));

  var player2Constructor = getPlayerShipChoice("Player2")
  Nakama.shipControllers.push(
    new player2Constructor(400, 800, Nakama.configs.PLAYER_TYPE.PLAYER_2, {
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S,
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      fire: Phaser.Keyboard.SHIFT
  }));

  Nakama.enemyControllers.push(new EnemyController(new Phaser.Point(320, 100), "EnemyType1.png", { health: 100}));

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

  for (var i = 0; i < Nakama.shipControllers.length; i++) {
    Nakama.shipControllers[i].update();
  }

  for (var i = 0; i < Nakama.bulletControllers.length; i++) {
    Nakama.bulletControllers[i].update();
  }

  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHitActor);
  Nakama.game.physics.arcade.overlap(Nakama.playerGroup, Nakama.enemyGroup, onCrashActor);
}

function getPlayerShipChoice(playerName){
  var playerChoice = prompt(playerName + "please choose ship type: ");
  playerChoice = parseInt(playerChoice);
  switch (playerChoice) {
    case 2:
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE_2;
      break;
    case 3:
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE_3;
      break;
    case 1:
    default:
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE_1;
      break;
  }
  return playerConstructor;
}

function onBulletHitActor(bulletSprite, actorSprite){
  var explosion = Nakama.explosionGroup.getFirstExists(false);
  if(explosion){
    explosion.reset(actorSprite.body.x, actorSprite.body.y);
    explosion.play('destroy', 30, false, true);
  }

  actorSprite.damage(bulletSprite.power);
  if (bulletSprite.power == 10 || bulletSprite.power == 1) {
    bulletSprite.kill();
  }
}

function onCrashActor(shipSprite, enemySprite){
  var explosion = Nakama.explosionGroup.getFirstExists(false);
  if(explosion){
    explosion.reset(enemySprite.body.x, enemySprite.body.y);
    explosion.play('destroy', 30, false, true);
  }

  shipSprite.damage(enemySprite.health);
  enemySprite.kill();
}

function createEnemy(){
  Nakama.enemyControllers.push(new EnemyController(new Phaser.Point(Nakama.game.world.randomX, Nakama.game.world.randomY-900), "EnemyType1.png", {speed: 50 + Math.random() * 200, health: 100}));
}

var render = function(){
  // Nakama.playerGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // });
  // Nakama.bulletGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // });
  // Nakama.enemyGroup.forEachAlive(function(sprite){
  //   Nakama.game.debug.body(sprite);
  // })
}
