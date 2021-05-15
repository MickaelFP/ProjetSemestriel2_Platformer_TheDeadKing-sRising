/*<script src="src/objects/ElementTorche.js"></script>

class ElementTorche extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'torche');
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
      

    //this.allumer = scene.sound.add('allumerTorche');

  }

  /*killEffect() 
  {
    this.allumer.play(
    { 
            volume: 10
    });

        //mute: false,,
        //rate : 1,
        //detune: 0,
        //seek: 0,
        //loop: false,
        //delay:200,
  }


  update() 
  {
    /*
    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}
    */
    // Player kill Ennemy


    /*if (this.body.touching.up && this.isAlive) 
    {
      this.world.player.setVelocityY(-10);
      this.killEffect();
      this.disableBody(true, true);
      this.isAlive = false;
    }*/


    /*
    if (this.broken == true) 
    {
      this.world.add.sprite(this.x, this.y, 'broke').setDepth(972);
      this.broken = false;
    }
  }
}*/