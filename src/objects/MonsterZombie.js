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
        this.setVelocityX(-40*(Math.random()+1.5));
        this.walking = true;
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 7, end: 12 }),
            frameRate: 4,
            repeat: -1,
        });
        this.anims.play('moving', true);

        /*this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 7, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            //frames: this.anims.generateFrameNumbers('zombie2', { start: 12, end: 15 }),
            frames: [ { key: 'zombie2', frame: 5 } ],
            frameRate: 20
        });*/

    }

    update(player)
    {
        if(this.body)
        {
            if(this.body.velocity.x < 0)
            {
                this.flipX=true;
            }
            else
            {
                this.flipX=false;
            }
        }

        /*if(this.body)
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
        }*/
    }

    
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

}