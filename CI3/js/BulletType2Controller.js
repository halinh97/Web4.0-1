class BulletType2Controller extends BulletController {
  constructor(position, direction, configs){
    var bulletName = "BulletType2.png";
    configs.power = 10;
    super(position, bulletName, direction, configs);
  }

  update(){
    if (Nakama.enemyControllers[0].enemy.alive) {
      this.bullet.body.velocity = new Phaser.Point(Nakama.enemyControllers[0].enemy.body.position.x + this.bullet.body.velocity.x - this.bullet.body.position.x, Nakama.enemyControllers[0].enemy.body.position.y + this.bullet.body.velocity.y - this.bullet.body.position.y).setMagnitude(Nakama.configs.BULLET_SPEED);
      this.bullet.angle = Math.atan2(this.bullet.body.velocity.x, -this.bullet.body.velocity.y) * (180/Math.PI);
    }
    else {
      this.bullet.body.velocity = new Phaser.Point(0, -10).setMagnitude(Nakama.configs.BULLET_SPEED);
    }
  }
}
