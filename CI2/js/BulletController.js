class BulletController{
  constructor(x, y, vectorx, vectory, bulletType){
    this.bullet = Nakama.bulletGroup.create(
      x,
      y,
      'assets',
      bulletType
    );
    this.bullet.anchor = new Phaser.Point(0.5, 0.5);
    this.bullet.body.velocity = new Phaser.Point(vectorx, vectory).setMagnitude(Nakama.configs.BULLET_SPEED);
  }
}

class EnemyBulletController {
  constructor(x, y, playerx, playery) {
    this.bullet = Nakama.enemyBulletGroup.create(
      x,
      y,
      'assets',
      "EnemyBulletType1.png"
    );
    this.bullet.anchor = new Phaser.Point(0.5, 0.5);
    this.bullet.body.velocity.y = Nakama.configs.BULLET_SPEED;
  }
}
