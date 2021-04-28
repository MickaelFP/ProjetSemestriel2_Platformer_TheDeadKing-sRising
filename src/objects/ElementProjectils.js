class ElementProjectils extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'ossement');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(false);
    this.setDisplaySize(16, 16);
    this.setBounceX(1);
    this.setCollideWorldBounds(true);
    this.setGravityY(10)
    this.setVelocity(480, -150);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    //this.scale = 3;
    this.isAlive = true;
    //this.broken = false;
      
      /*this.anims.create(
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

    this.killSound = scene.sound.add('crack');

  }

  killEffect() 
  {
    this.killSound.play({ volume: .5 });
    //this.broken = true;
    //fx.scale = 3;
  }


  update() 
  {
    /*
    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}
    */

    // Le projectil entre en contact
    if (this.body.touching/*.up*/ && this.isAlive) 
    {
      this.killEffect();
      this.disableBody(true, true);
      this.isAlive = false;
    }

    /*if (this.broken == true) 
    {
      this.world.add.sprite(this.x, this.y, 'broke').setDepth(986);
      this.broken = false;
    }*/
  }
}