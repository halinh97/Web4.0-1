class BulletController{
  constructor(position, bulletName, direction, configs){
    this.configs = configs;

    this.bullet = Nakama.bulletGroup.create(
      position.x,
      position.y,
      'assets',
      bulletName
    );
    this.bullet.anchor = new Phaser.Point(0.5, 0.5);
    this.bullet.power = configs.power;
    this.bullet.game.checkWorldBounds = true;
    this.bullet.game.outOfBoundsKill = true;
    this.bullet.body.velocity = direction.setMagnitude(Nakama.configs.BULLET_SPEED);
    this.bullet.angle = Math.atan2(direction.x, -direction.y) * (180/Math.PI);
  }

  update(){}
}
