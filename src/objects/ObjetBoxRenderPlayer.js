/*class ObjetBoxRenderPlayer extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'boxRP');
    //this.body.allowGravity=false;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(true);
    this.setDisplaySize(64, 64);
    this.setBounceX(0);
    this.setGravityY(-300)
    this.setVelocity(0, 0);
    this.setBodySize(this.body.width, this.body.height);
    this.setScrollFactor(0);

    this.world = scene;
    //this.scale = 3;
    this.isAlive = true;

  }

  update(player)
  {
    this.auraInvincible.setPosition(this.scene.player.x, this.scene.player.y); 
  }

}*/