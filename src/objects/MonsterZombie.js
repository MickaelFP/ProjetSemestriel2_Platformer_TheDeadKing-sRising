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
        this.onNeVieQuneFoisZB = true;
        this.unSeulEffect = true;


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 0, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 6, end: 11 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'immobile',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 12, end: 13 }),
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
        this.move();
        this.animation();
        if(Tableau.current.isMobilePerso) {
            this.zombieEffectSound();
        }
    }


    zombieEffectSound()
    {
        if(this.isDead && this.onNeVieQuneFoisZB)
        {
            Tableau.current.zombieEffect();
            this.onNeVieQuneFoisZB = false;
            this.unSeulEffect = true;
        }

        if(!this.isDead && this.unSeulEffect)
        {
            if(this.scene.player.x > this.x - 400
                && this.scene.player.x < this.x
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                Tableau.current.zombieEffect2();
                this.unSeulEffect = false;
            }
            else if(this.scene.player.x < this.x + 400
                && this.scene.player.x > this.x
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                Tableau.current.zombieEffect2();
                this.unSeulEffect = false;
            }
        }
        else if(!this.isDead && !this.unSeulEffect)
        {
            if(this.scene.player.x < this.x + 410
                && this.scene.player.x > this.x + 400
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                this.unSeulEffect = true;
            }
            else if(this.scene.player.x > this.x - 410
                && this.scene.player.x < this.x - 400
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                this.unSeulEffect = true;
            }
        }

    }

    animation()
    {
        if(this.body.velocity.x < 0)
        {
            this.anims.play('left', true);
        }
        else if(this.body.velocity.x > 0)
        {
            this.anims.play('right', true);
        }
        else
        {
            this.anims.play('immobile', true);
        }
    }


    move(player)
    {
        if(!this.isDead && !Tableau.current.monsterMoveStop)
        {
            if(this.scene.player.x > this.x - 400 && this.scene.player.x < this.x - 10 && this.scene.player.y <= this.y && this.scene.player.y >= this.y - 200)
            {
                this.setVelocityX(-40*(Math.random()+1.5));
            }
            else if(this.scene.player.x < this.x + 400 && this.scene.player.x > this.x + 10 && this.scene.player.y <= this.y && this.scene.player.y >= this.y - 200)
            {
                this.setVelocityX(40*(Math.random()+1.5));
            }
            else
            {
                this.setVelocityX(0);
            }
        }
        else
        {
            this.setVelocityX(0);
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