class EnemyController{
  constructor(x, y, speed){
    this.enemy = Nakama.enemyGroup.create(
      x,
      y,
      'assets',
      "EnemyType1.png"
    );
    this.enemy.anchor = new Phaser.Point(0.5, 0.5);
    this.enemy.health = Nakama.configs.ENEMY_HEALTH;
    this.enemy.body.velocity.y = speed;
    this.enemy.checkWorldBounds = true;
    this.enemy.outOfBoundsKill = true;
  }
}
