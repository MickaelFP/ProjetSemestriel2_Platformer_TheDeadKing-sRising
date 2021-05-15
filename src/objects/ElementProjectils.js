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
    this.setBounce(0.2);
    this.setCollideWorldBounds(false);
    this.setGravityY(150);
    this.setVelocity(0, -350);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    this.isAlive = true;
    //this.broken = false;
    

    this.killSound = scene.sound.add('crack');
    //Tableau.current.projectilDestroyed = false;
    Tableau.current.youCanDestroyIt = false;

  this._directionX=0;
  this._directionY=0;

  }
  

  set directionX(value)
  {
      this._directionX=value;
  }
  set directionY(value)
  {
      this._directionY=value;
  }


  killEffect() 
  {
    this.killSound.play({ volume: .5 });
    //this.broken = true;

  }


  update() 
  {
    //console.log("CHECK");

    // ********** Destruction du projectil par contact (pas encore fonctionnel) **********/

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

    // ********** /

    // ********** Destruction du projectil par Delai **********/

    if(Tableau.current.youCanDestroyIt)
    {
      let me = this;
      me.body.destroy();
      me.visible = false;
      //me.disableBody(true, true);
      me.isAlive = false;
      Tableau.current.youCanDestroyIt = false;
      Tableau.current.oneShootOnly = true;
      //console.log("youCanDestroyIt = false");
      //console.log("oneShootOnly = true");
    }

    // ********** /

    /*if (this.broken == true) 
    {
      this.world.add.sprite(this.x, this.y, 'broke').setDepth(986);
      this.broken = false;
    }*/
  }


  move()
  {
    this.setGravityY(150);
    this.setVelocity(120, -175);
  }


  stop()
  {
    console.log("ShootStop");
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.directionY=0;
    this.directionX=0;
  }

}