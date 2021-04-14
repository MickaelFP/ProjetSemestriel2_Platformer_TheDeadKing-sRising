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
        this.body.allowGravity=false;
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        this.setDisplaySize(40,60);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        //this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(0);
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
        });*//*

        

        this._directionX=0;
        this._directionY=0;

        this._positionX=0;*/
        
        // X
        this.originalX=x;
        this.minX=x-((386-135)-(115/2));
        this.maxX=x+(661-386-(115/2));
        
        // Y
        this.originalY=y;
        this.minY=y;
        this.maxY=y;
        
     // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        
        scene.tweens.add({
            targets:this,
            duration:200,
            delay:Math.random()*1000,
            
            alpha:{
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () {
                me.start();
             }
        })
        

    }

    /*monsterMove(player)
    {       
        if (player.position.x < this.x)
        {
            if(this.VelocityX < 0)
            {
                //this.flipX = true;
                this.setVelocityX = -100;
            }
            else
            {
                //this.flipX = true;
                this.setVelocityX = -100;//-100;
            }
        } 
        else if (player.position.x> this.x)
        {
            if(this.VelocityX > 0)
            {
                //this.flipX = false;
                this.setVelocityX = 100;
            }
            else
            {
                //this.flipX = true;
                this.setVelocityX = 100;//-100;
            }
        }
    }*/

    start(){
        this.scene.tweens.add(
            {
            targets: this,
            x: 
            {
                from: this.minX,
                to:this.maxX,
                duration: 10*1500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
                
            },
            y: 
            {
                from: this.minY,
                to:this.maxY,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });

    }/*

    set directionX(value)
    {
        this._directionX=value;
    }
    set directionY(value)
    {
        this._directionY=value;
    }
    set positionX(value)
    {
        this._positionX=value;
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

    /**
    * Déplace le joueur en fonction des directions données
    *//*
    move(player)
    {

        switch (true)
        {
            case this.playerX<this.positionX:
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;
            case this.playerX>this.positionX:

                this.setVelocityX(160);
                this.anims.play('right', true);
                break;
            default:
                this.setVelocityX(0);
                this.anims.play('turn'); // , true);
        }/*
        
        if(this.player._directionY<0)
        {
            if(this.body.blocked.down || this.body.touching.down)
            {
                this.setVelocityY(-550);
            }
        }
    }*/
}