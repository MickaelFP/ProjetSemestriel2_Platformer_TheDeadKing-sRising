class ElementRocheQuiRoule extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'rocheQuiRoule');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(false);
    this.setDisplaySize(64, 64);
    this.setBounceX(0);
    //this.setGravityY(5000);
    //this.setVelocity(0, 0);
    this.setBodySize(this.body.width, this.body.height);

  }

  update()
  {
    this.setVelocity(0, 0);
  }

}