class BulletType1Controller extends BulletController {
  constructor(position, direction, configs){
    var bulletName = "BulletType1.png";
    configs.power = 1;
    super(position, bulletName, direction, configs);
  }
}
