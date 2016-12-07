class ShipType2Controller extends ShipController {
  constructor(x, y, isPlayer1, configs) {
    var spriteName = "Spaceship2-" + (isPlayer1 ? "Player" : "Partner") + ".png";
    configs.cooldown = 0.1;
    configs.health = 20;
    configs.hitBoxRadius = 15;
    configs.hitBoxOffset = new Phaser.Point(26, 10);
    super(x, y, spriteName, configs);
  }

  fire(){
    Nakama.bulletControllers.push(new BulletType2Controller(this.sprite.position, new Phaser.Point(0, -10), {}));
  }
}
