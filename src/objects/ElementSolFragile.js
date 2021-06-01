class ElementSolFragile extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'solFragile');
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

    this.world = scene;
    //this.scale = 3;
    this.isAlive = true;
    this.broken = false;

    this.tombeSound = scene.sound.add('chute');
    this.seBriseSound = scene.sound.add('solEffondre');

  }

  killEffect() 
  {
    /*let fx = *///this.world.add.sprite(this.x, this.y, 'broke');//.play('explode', true);
    this.seBriseSound.play(
      { 
        volume: 10,
        //delay:1
      });
    this.tombeSound.play(
    { 
      volume: 1,
      delay:1
    });
    //this.broken = true;
    //fx.scale = 3;
    //fx.once('animationcomplete', () => {fx.destroy()})
  }


  update() 
  {
    /*
    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}
    */
    // Player kill Ennemy
    if (this.body.touching.up && this.isAlive) 
    {
      this.world.player.setVelocityY(-10);
      this.killEffect();
      this.disableBody(true, true);
      this.isAlive = false;
    }
    /*
    if (this.broken == true) 
    {
      this.world.add.sprite(this.x, this.y, 'broke').setDepth(972+Tableau.current.depthConst);
      this.broken = false;
    }*/
  }
}