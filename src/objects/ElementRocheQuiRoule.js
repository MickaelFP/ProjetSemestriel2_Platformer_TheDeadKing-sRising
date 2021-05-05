class ElementRocheQuiRoule extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'rocheQuiRoule');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(true);
    this.setDisplaySize(64, 64);
    this.setBounceX(0);
    //this.setGravityY(5000);//5000
    this.setVelocity(0, 0);
    this.setBodySize(this.body.width, this.body.height);
    //this.setFriction(1);

    this.contact = false;

  }


  update(player) 
  {
    /*
    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}
    */
    // Player kill Ennemy
    if (this.body.touching & !this.contact) 
    {
      console.log(" DEBUG ");
      this.setImmovable(false);
    }
    else
    {
      console.log(" DEBUG DEBUG ");
      this.contact = false;
    }
  }
}