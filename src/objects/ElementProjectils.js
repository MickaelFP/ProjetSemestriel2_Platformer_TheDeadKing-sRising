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
    //this.setBounceX(1);
    this.setBounce(0.1);
    this.setCollideWorldBounds(false);
    this.setGravityY(150);
    this.setVelocity(240, -350);
    this.setBodySize(this.body.width, this.body.height);
    this.disableBody(false, false);

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
    //Tableau.current.projectilDestroyed = false;
    Tableau.current.youCanDestroyIt = false;

    /*scene.tweens.add({
      targets:this,
      duration:10,
      repeat:-1,
      rotate:,
      displayHeight:
      {
          from:16,
          to:16,
      },
      displayWidth:
      {
          from:16,
          to:16,
      },
      onComplete: function (ossement) 
      {
          this.rotation = Phaser.Math.Between(6,0);
          //me.aPressed.visible=false;
          //me.aPressed.disableBody(true, true);
          //onComplete();
      }
  })*/


  }

  killEffect() 
  {
    this.killSound.play({ volume: .5 });
    //this.broken = true;
    //fx.scale = 3;
  }

  update() 
  {
    //console.log("CHECK");
    /*
    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}
    */

    // Le projectil entre en contact
    /*if(Tableau.current.youCanDestroyIt) // blocked / touching 
    {
      let me = this;
      console.log("DETRUIT TOIT PINAISE V1");
      me.body.destroy();
      //this.destroy();
      me.killEffect();
      me.disableBody(true, true);
      me.visible(false);
      me.isAlive = false;
      //Tableau.current.projectilDestroyed = false;
    }*/

    if(Tableau.current.youCanDestroyIt)
    {
      let me = this;
      me.body.destroy();
      //this.destroy();
      me.disableBody(true, true);
      //me.visible(false);
      me.isAlive = false;
      Tableau.current.youCanDestroyIt = false;
      Tableau.current.oneShootOnly = true;
      console.log("youCanDestroyIt = false");
      console.log("oneShootOnly = true");
    }


    /*if (this.broken == true) 
    {
      this.world.add.sprite(this.x, this.y, 'broke').setDepth(986);
      this.broken = false;
    }*/
  }

  move()
  {
    this.setGravityY(150);
    this.setVelocity(240, -350);
  }

  /*supprimeProjectil(ossement, monster)
  {
      //this.aPressed.destroy();
      this.aPressed.invisible();
      this.aPressed.disableBody(true);
  }*/
}