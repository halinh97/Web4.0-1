class BulletType3Controller extends BulletController {
  constructor(position, direction, configs, parent){
    var bulletName = "BulletType3.png";
    configs.power = 5;
    super(position, bulletName, direction, configs);
    this.parent = parent
    this.bullet.body.velocity = new Phaser.Point(0, 0);
    this.bullet.anchor = new Phaser.Point(0.5, 1);
    this.bullet.update = this.update.bind(this);
  }

  update(){
    if(this.bullet._exists && this.parent) {
      this.bullet.x = this.parent.x;
      this.bullet.y = this.parent.y - 25;
    }
  }
}
