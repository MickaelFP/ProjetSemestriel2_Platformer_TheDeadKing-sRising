class ElementVase extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'vase');

    console.log("Vase en vie");

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(true);
    this.setDisplaySize(32, 32);
    this.setBounceX(0);
    this.setGravityY(5000);
    this.setVelocity(0, 0);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    //this.scale = 3;
    this.isAlive = true;
    this.broken = false;
    this.dropVase = false;
    this.debugVaseDrop = false;
    this.oneDrop = false; 

    this.killSound = scene.sound.add('brkkk');

  }


  killEffect() 
  {
    this.killSound.play({ volume: .5 });
    this.broken = true;
    //this.dropVase = true;
    //this.drop();
    //this.RandomDrop();
  }

  /*drop()
  {
    if(!this.isAlive & !this.oneDrop)
    {
      console.log("help");
      new MonsterZombie(this,x,y);//(this,monsterObject.x,monsterObject.y-30);
      this.oneDrop = true;
    }
  }*/

  /*RandomDrop(monster, player)
  {
    this.value = Math.random(0,3);

    if(this.isAlive == false)// this.oneDrop == false)// & this.broken == true)
    {
      if(this.value = 0)
      {
        console.log("Attantion aux zombies");
        let monster=new MonsterZombie(this.x,this.y);//(this,monsterObject.x,monsterObject.y-30);
        //this.monstersContainer.add(monster); 
        //this.physics.add.collider(monster, this.player);
        //this.physics.add.collider(monster, this.projectil);
        //this.physics.add.collider(monster, this.solides); 
        //ui.gagne();
      }
      else if(this.value = 1)
      {
        console.log("Un bonus enfin!");
        //let object=new ElementBonus(this.x,this.y);
      }
      else if(this.value = 2)
      {
        console.log("pas encore défini");
      }
      else
      {
        console.log("p.e.d");
      }
      this.oneDrop == true;
    }
  }*/


  update(monster, player) 
  {
    /*
    this.anims.play('moving', true);
    if (this.body.velocity.x > 0){this.flipX = true;}
    else{this.flipX = false;}
    */
    // Player kill Ennemy
    if (this.body.touching.up && this.isAlive) 
    {
      //this.world.player.setVelocityX(400);
      Tableau.current.player.velocityX=200;
      this.killEffect();
      this.disableBody(true, true);
      this.isAlive = false;
      Tableau.current.oneDrope = true;
    }

    if (this.broken) 
    {
      //console.log("broken");
      this.world.add.sprite(this.x, this.y, 'broke').setDepth(987);
      Tableau.current.vaseDrope = true;
      this.broken = false;
    }
    /*if(Tableau.current.vaseDrope)
    {
      console.log("DEBUG  DEBUG");
      Tableau.current.vaseDrope = false;
      //this.debugVaseDrop = false;
    }*/
  }
}