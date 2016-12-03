class ShipController{
  constructor(x, y, spriteName, configs, bulletType){
    this.configs = configs;

    this.sprite = Nakama.playerGroup.create(
      x,
      y,
      'assets',
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.timeSinceLastFire = 0;
    this.sprite.health = Nakama.configs.SHIP_HEALTH;
  }

  update(){
    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;

    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -Nakama.configs.SHIP_SPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = Nakama.configs.SHIP_SPEED;
    }
    else {
      this.sprite.body.velocity.y = 0;
    }
    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -Nakama.configs.SHIP_SPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = Nakama.configs.SHIP_SPEED;
    }
    else {
      this.sprite.body.velocity.x = 0;
    }
    if(Nakama.keyboard.isDown(this.configs.fire) && this.timeSinceLastFire >= this.configs.cooldown){
      this.fire();
      this.timeSinceLastFire = 0;
    }
  }

  fire(){
    Nakama.bulletControllers = [];

    var x = this.sprite.position.x;
    var y = this.sprite.position.y;

    Nakama.bulletControllers.push(new BulletController(x, y, 0, -10, this.configs.bulletType));
    Nakama.bulletControllers.push(new BulletController(x, y, 2, -10, this.configs.bulletType));
    Nakama.bulletControllers.push(new BulletController(x, y, -2, -10, this.configs.bulletType));
    Nakama.bulletControllers.push(new BulletController(x, y, 4, -10, this.configs.bulletType));
    Nakama.bulletControllers.push(new BulletController(x, y, -4, -10, this.configs.bulletType));
  }
}
