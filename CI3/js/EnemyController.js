class EnemyController{
  constructor(position, enemyName, configs){
    this.configs = configs

    this.enemy = Nakama.enemyGroup.create(
      position.x,
      position.y,
      'assets',
      enemyName
    );
    this.enemy.anchor = new Phaser.Point(0.5, 0.5);
    this.enemy.health = configs.health;
    this.enemy.body.velocity.y = configs.speed;
    this.enemy.checkWorldBounds = true;
    this.enemy.outOfBoundsKill = false;
  }
}
