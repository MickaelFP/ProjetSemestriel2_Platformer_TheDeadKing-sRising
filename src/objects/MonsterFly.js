class MonsterFly extends ObjetEnnemi{
    /**
     * Un monstre qui vole et fait des allez -retours
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monster-fly"); 
        //pas de gravité
        this.body.allowGravity=false;

        this.setDisplaySize(55,51);
        //on réduit un peu la zone de hit
        this.setCollideWorldBounds(true);
        this.setBodySize(this.body.width,this.body.height);
        //this.setOffset(0, 0);
        this.setVelocityX(-80*(Math.random()+1.5));
        this.setBounceX(1);

        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('monster-fly', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('moving', true)

    }

    update()
    {
        this.animation();
        this.move();

    }


    move(player)
    {
        if(!this.isDead && !Tableau.current.monsterMoveStop)
        {
            if(this.scene.player.x > this.x - 196 && this.scene.player.x < this.x && this.scene.player.y <= this.y && this.scene.player.y >= this.y + 64)
            {
                console.log("GRRRRR GAUCHE");
                this.setVelocityX(-80*(Math.random()+1.5));
            }
            else if(this.scene.player.x < this.x + 196 && this.scene.player.x > this.x && this.scene.player.y <= this.y && this.scene.player.y >= this.y + 64)
            {
                console.log("GRRRRR DROITE");
                this.setVelocityX(80*(Math.random()+1.5));
            }
        }
        else
        {
            this.setVelocityX(0);
        }
    }


    animation()
    {
        if(this.body)
        {
        
            if(this.body.velocity.x < 0)
            {
                this.flipX = false;
                
            }
            else
            {
                this.flipX = true;
            }
        }
    }

    stop()
    {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }

}