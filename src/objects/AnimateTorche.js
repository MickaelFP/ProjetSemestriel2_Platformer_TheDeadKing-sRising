/*<script src="src/objects/AnimateTorche.js"></script>

class AnimateTorche extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'animateTorche');
    //this.body.allowGravity=false;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    //scene.physics.add.collider(scene.player, this);

    AnimateTorche.current = this;

    this.setImmovable(true);
    this.setDisplaySize(64, 96);
    this.setBounceX(0);
    this.setGravityY(-300)
    this.setVelocity(0, 0);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    //this.scale = 3;
    this.isAlive = true;
    //Tableau.current.oneTorche = false;
    
    this.anims.create({
      key: 'tch',
      frames: this.anims.generateFrameNumbers('torcheAnime', { start: 0, end: 8 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.play('tch', true);


  }

  update() 
  {    
    if(Tableau.current.destroyTorche)
    {
        console.log("probleme de size");
        let me = this;
        me.body.destroy();
        me.visible = false;
        this.anims.play('tch', false);
        //me.disableBody(true, true);
        me.isAlive = false;
        Tableau.current.destroyTorche = false;
        //Tableau.current.torcheContact = false;
        //console.log("youCanDestroyIt = false");
        //console.log("oneShootOnly = true");
    }
  } 

}*/