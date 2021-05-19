class MonsterZombie extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {                                                              //OBLIGATOIRE
        super(scene, x, y,"zombie2");                                                       //OBLIGATOIRE
        //pas de gravité
        this.body.allowGravity=true;
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.setDisplaySize(40,60);
        this.setCollideWorldBounds(true);
        this.setBounceX(1);
        //this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(0);

        this.walking = true;
        //Tableau.current.zombieAlive = true;
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        /*this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 7, end: 10 }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.play('moving', true);*/

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 7, end: 10 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'immobile',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 4, end: 6 }),
            frameRate: 2,
            repeat: -1
        });

        /*this.anims.create({
            key: 'turn',
            //frames: this.anims.generateFrameNumbers('zombie2', { start: 12, end: 15 }),
            frames: [ { key: 'zombie2', frame: 5 } ],
            frameRate: 20
        });*/

    }

    update()
    {
        //this.die();
        this.move();
        this.animation();

    }


    animation()
    {
        if(this.body.velocity.x < 0)
        {
            //console.log("anims.play left");
            this.anims.play('left', true);
            //this.flipX = true;
        }
        else if (this.body.velocity.x > 0)
        {
            //console.log("anims.play right");
            this.anims.play('right', true);
            //this.flipX = false;
        }
        else
        {
            this.anims.play('immobile', true);
        }
    }


    move(player)
    {
        if(!this.isDead)
        {
            if(this.scene.player.x > this.x - 400 && this.scene.player.x < this.x - 10 && this.scene.player.y <= this.y && this.scene.player.y >= this.y-200)
            {
                //console.log("GRRRRR GAUCHE");
                this.setVelocityX(-40*(Math.random()+1.5));
                //this.flipX = true;
            }
            else if(this.scene.player.x < this.x + 400 && this.scene.player.x > this.x + 10 && this.scene.player.y <= this.y && this.scene.player.y >= this.y-200)
            {
                //console.log("GRRRRR DROITE");
                this.setVelocityX(40*(Math.random()+1.5));
                //this.flipX = false;
            }
            else
            {
                this.setVelocityX(0);
            }
        }
    }


    /*die()
    {
        if(this.isDead)
        {   
            Tableau.current.zombieAlive = true;
        }
        else
        {
            Tableau.current.zombieAlive = true;
        }
    }*/

    
    /**
    * arrête le monstre
    */
    stop()
    {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

    /********** TEST MOVE MONSTER ********** /
     * 
     * 
        if(this.body)
        {
            if(this.body.velocity.x < 0)
            {
                this.flipX=true;
                if(this.walking)
                {
                    this.setVelocityX(-40*(Math.random()+1.5));
                    this.walking = false;
                }
            }
            else
            {
                this.flipX=false;
                if(!this.walking)
                {
                    this.setVelocityX(40*(Math.random()+1.5));
                    this.walking = true;
                }
            }
        }

        if(this.body)
        {
            if(this.body.touching.left)
            {
                console.log("touching LEFT LEFT");
                this.flipX=false;
            }
            else if(this.body.touching.right)
            {
                console.log("touching RIGHT RIGHT");
                this.flipX=true;
            }
        }
     * 
     * 
     * **********/

}