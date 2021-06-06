class MonsterSkeleton extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y,"squelette");
        //pas de gravité
        this.body.allowGravity=true;
        
        this.setDisplaySize(32, 48);
        this.setCollideWorldBounds(true);
        //this.setBounce(1);
        this.setBounceX(1);
        //this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(-40*(Math.random()+1.5));  // 80*(Math.random()+1.5) // -200

        this.walking = true;
        this.onNeVieQuneFoisSQ = true;
        this.unSeulEffect = true;

        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('squelette', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1,
        });
        this.anims.play('moving', true);    
        this.anims.create({
            key: 'movingFast',
            frames: this.anims.generateFrameNumbers('squelette', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });   

    }


    update()
    {
        this.move();
        this.animation();
        if(Tableau.current.isMobilePerso) {
            this.squeletteEffectSound();
        }
    }


    squeletteEffectSound()
    {
        if(this.isDead && this.onNeVieQuneFoisSQ)
        {
            Tableau.current.squeletteEffect();
            this.onNeVieQuneFoisSQ = false;
            this.unSeulEffect = true;
        }

        if(!this.isDead && this.unSeulEffect)
        {
            if(this.scene.player.x > this.x - 256
                && this.scene.player.x < this.x
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 16)
            {
                Tableau.current.squeletteEffect2();
                this.unSeulEffect = false;
            }
            else if(this.scene.player.x < this.x + 256
                && this.scene.player.x > this.x
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 16)
            {
                Tableau.current.squeletteEffect2();
                this.unSeulEffect = false;
            }
        }
        else if(!this.isDead && !this.unSeulEffect)
        {
            if(this.scene.player.x < this.x + 266
                && this.scene.player.x > this.x + 256
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 16)
            {;
                this.unSeulEffect = true;
            }
            else if(this.scene.player.x > this.x - 266
                && this.scene.player.x < this.x - 256
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 16)
            {
                this.unSeulEffect = true;
            }
        }

    }


    move(player)
    {
        if(!this.isDead && !Tableau.current.monsterMoveStop)
        {
            if(this.scene.player.x > this.x - 256 && this.scene.player.x < this.x - 10 && this.scene.player.y <= this.y && this.scene.player.y >= this.y-16)
            {
                this.setVelocityX(-80*(Math.random()+1.5));
                this.anims.play('movingFast', true);
            }
            else if(this.scene.player.x < this.x + 256 && this.scene.player.x > this.x + 10 && this.scene.player.y <= this.y && this.scene.player.y >= this.y-16)
            {
                this.setVelocityX(80*(Math.random()+1.5));
                this.anims.play('movingFast', true);
            }
            else
            {
                this.anims.play('moving', true);
            }
        }
        else
        {
            this.setVelocityX(0);
            this.anims.play('moving', true);
        }
    }


    animation()
    {
        if(this.body)
        {
        
            if(this.body.velocity.x < 0)
            {
                this.flipX = true;
                
            }
            else
            {
                this.flipX = false;
            }
        }
        else
        {
            this.dead();
        }
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