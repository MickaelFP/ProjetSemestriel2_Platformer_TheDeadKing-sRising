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

        //gestion de la taille...car attention notre png est très grand (et c'est maaaaal car pas optimisé)
        this.setDisplaySize(64,64);

        //on réduit un peu la zone de hit
        this.setBodySize(this.body.width,this.body.height);
        this.setOffset(0, 0);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('monster-fly', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('monster-fly', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        //définir les propriété que l'on va utiliser dans notre animation

        // X
        /*this.originalX=x;
        this.minX=x-200;
        this.maxX=x+200;

        // Y
        this.originalY=y;
        this.minY=y-5;
        this.maxY=y+5;

        // on applique les propriétés du début de l'animation
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
        })*/

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
            if(this.scene.player.x > this.x - 400 && this.scene.player.x < this.x - 10 && this.scene.player.y <= this.y && this.scene.player.y == this.y)
            {
                //console.log("GRRRRR GAUCHE");
                this.setVelocityX(-80*(Math.random()+1.5));
            }
            else if(this.scene.player.x < this.x + 400 && this.scene.player.x > this.x + 10 && this.scene.player.y <= this.y && this.scene.player.y == this.y)
            {
                //console.log("GRRRRR DROITE");
                this.setVelocityX(80*(Math.random()+1.5));
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


    animation()
    {
        if(this.body.velocity.x < 0)
        {
            //console.log("anims.play left");
            this.anims.play('left', true);
        }
        else if (this.body.velocity.x > 0)
        {
            //console.log("anims.play right");
            this.anims.play('right', true);
        }

    }


    /*start(){
        this.scene.tweens.add({
            targets: this,
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 10*1000,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:false,
            },
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });
    }*/

}