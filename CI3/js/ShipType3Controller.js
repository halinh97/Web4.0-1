class ShipType3Controller extends ShipController {
  constructor(x, y, isPlayer1, configs) {
    var spriteName = "Spaceship3-" + (isPlayer1 ? "Player" : "Partner") + ".png";
    configs.cooldown = 0.1;
    configs.health = 5;
    configs.hitBoxRadius = 15;
    configs.hitBoxOffset = new Phaser.Point(16, 15);
    super(x, y, spriteName, configs);
  }

  fire(){
    if(!this.lazer) {
      this.lazer = new BulletType3Controller(this.sprite.position, new Phaser.Point(0, -10), {}, this.sprite);
    }
  }

  update(){
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = -Nakama.configs.SHIP_SPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = Nakama.configs.SHIP_SPEED;
    }
    else{
      this.sprite.body.velocity.y = 0;
    }

    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = -Nakama.configs.SHIP_SPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = Nakama.configs.SHIP_SPEED;
    }
    else{
      this.sprite.body.velocity.x = 0;
    }
    if(Nakama.keyboard.isDown(this.configs.fire)) {
     this.fire();
    }
    else if(this.lazer){
      this.lazer.bullet.destroy();
      this.lazer = null;
    }
  }
}
