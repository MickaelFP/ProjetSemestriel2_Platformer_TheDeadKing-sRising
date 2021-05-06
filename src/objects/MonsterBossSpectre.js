class MonsterBossSpectre extends Phaser.Physics.Arcade.Sprite
{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y)
    {
        super(scene, x, y,"bossSpectre");
        //this.body.allowGravity=true;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.player, this);
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        //this.physics.add.collider(monster, this.solides);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        //this.setBounce(1);
        this.setDisplaySize(160,180);
        this.setCollideWorldBounds(true);
        this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(0);

        this.BarreDeVie = 10;

        /*
        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('spectre', { start: 7, end: 12 }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.play('moving', true);
        */

        
        // X
        this.originalX=x;
        this.minX=x-550;
        this.maxX=x+300;
        
        
        // Y
        this.originalY=y;
        this.minY=y-100;
        this.maxY=y+100;
        
        // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add(
        {
            targets:this,
            duration:200,
            delay:Math.random()*1000,
            
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () 
            {
                me.start();
            }
        })

    }


    start()
    {
        this.scene.tweens.add(
        {
            targets: this,
            x: 
            {
                from: this.minX,
                to:this.maxX,
                duration: 10*800*Math.random(), // 1500 de base
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
                
            },
            y: 
            {
                from: this.minY,
                to:this.maxY,
                duration: 10*2500, // 5000 de base
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });
    }


    DamageEffect()
    {
        
    }
   

    update(player)
    {
        if (this.body.touching.up && !this.isDead) 
        {
          //this.world.player.setVelocityX(400);
          //this.killEffect();
          this.DamageEffect();
          this.disableBody(true, true);
          this.isAlive = false;
          Tableau.current.oneDropePower = true;
        }
    

        if(!this.isDead & this.BarreDeVie <= 0)
        {
            this.isDead = true;
        }

        if(this.isDead)
        {
            Tableau.current.win();
        }
            
        /*if (player.x - monster.x > 0)
        {
            monster.scale.x = 1;
        } 
        else 
        {
            monster.scale.x = -1;
        }*/
            
    }
    


}