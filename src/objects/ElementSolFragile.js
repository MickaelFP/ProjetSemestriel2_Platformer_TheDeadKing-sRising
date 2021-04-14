class ElementSolFragile extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'solFragile');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(true);
    this.setDisplaySize(64, 64);
    this.setBounceX(0);
    this.setGravityY(0)
    this.setVelocity(0, 0);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    //this.scale = 3;
    this.isAlive = true;
    this.broken = false;
      
  
    /* this.anims.create(
    {
        key: 'moving',
        frames: this.anims.generateFrameNumbers('crawler', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
  
    scene.anims.create(
    {
        key: 'explode',
        frames: scene.anims.generateFrameNumbers('expl', { start: 0, end: 9 }),
        frameRate: 20,
        repeat: 0
    });*/

    this.killSound = scene.sound.add('chute');

  }

  killEffect() 
  {
    /*let fx = *///this.world.add.sprite(this.x, this.y, 'broke');//.play('explode', true);
    this.killSound.play({ volume: .5 });
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
      this.world.add.sprite(this.x, this.y, 'broke').setDepth(972);
      this.broken = false;
    }*/
  }
}