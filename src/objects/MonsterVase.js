class MonsterVase extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y,"zombie2");
        this.body.allowGravity=true;

        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.setDisplaySize(40,60);
        this.setCollideWorldBounds(true);
        this.setBounceX(1);
        //this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(0);

        this.walking = true;
        Tableau.current.monsterOfVaseIsDead = false;
        Tableau.current.onNeVieQuneFoisMV = true;
        Tableau.current.unSeulEffectMV = true;

        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

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

    }

    update()
    {
        this.move();
        this.animation();
        /*if(Tableau.current.isMobilePerso) {
            this.monsterVaseEffectSound();
        }*/
    }


    monsterVaseEffectSound()
    {
        if(this.isDead && Tableau.current.onNeVieQuneFoisMV)
        {
            Tableau.current.monsterVaseEffect();
            Tableau.current.onNeVieQuneFoisMV = false;
        }

        if(!this.isDead && Tableau.current.unSeulEffectMV)
        {
            if(this.scene.player.x > this.x - 400
                && this.scene.player.x < this.x
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                Tableau.current.monsterVaseEffect2();
                Tableau.current.unSeulEffectMV = false;
            }
            else if(this.scene.player.x < this.x + 400
                && this.scene.player.x > this.x
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                Tableau.current.monsterVaseEffect2();
                Tableau.current.unSeulEffectMV = false;
            }
        }
        else if(!this.isDead && !Tableau.current.unSeulEffectMV)
        {
            if(this.scene.player.x < this.x + 410
                && this.scene.player.x > this.x + 400
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                Tableau.current.unSeulEffectMV = true;
            }
            else if(this.scene.player.x > this.x - 410
                && this.scene.player.x < this.x - 400
                && this.scene.player.y <= this.y
                && this.scene.player.y >= this.y - 200)
            {
                Tableau.current.unSeulEffectMV = true;
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