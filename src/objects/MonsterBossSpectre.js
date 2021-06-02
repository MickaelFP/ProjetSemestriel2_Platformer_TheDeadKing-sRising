class MonsterBossSpectre extends ObjetPhysique{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y,"bossSpectre");
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.hitMiniBoss,
            null,
            scene
        );

        //pas de gravité
        this.body.allowGravity=false;
        
        //this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-zombie");
        //this.physics.add.collider(monster, this.solides);
        //this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        //this.setBounce(1);
        this.body.allowGravity = false;
        this.setDisplaySize(160,180);
        this.setCollideWorldBounds(true);
        this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(0);

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
        this.originalX = x;
        this.minX = x-550;
        this.maxX = x+300;
        
        
        // Y
        this.originalY = y;
        this.minY = y-100;
        this.maxY = y+100;
        
        // on applique les propriété du début de l'animation
        this.x = this.minX;
        this.y = this.minY;
        this.alpha = 0;
        let me = this;


        scene.tweens.add(
        {
            targets: this,
            duration: 200,
            delay: Math.random()*1000,
            
            alpha:
            {
                startDelay: Math.random()*5000,
                from: 0,
                to: 1,
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
                to: this.maxX,
                duration: 2500, // 1500 de base
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat: -1,
                flipX: true,
                
            },
            y: 
            {
                from: this.minY,
                to: this.maxY,
                duration: 2000, // 5000 de base
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat: -1
            }
        });
    }
    

    invulnerability()
    {
        if(!Tableau.current.oneShotOnBoss && !this.isDead)
        {
            Tableau.current.time.addEvent
            ({
                delay: 15000,
                callback: ()=>
                {
                    if(!Tableau.current.oneShotOnBoss)
                    {
                        Tableau.current.bossShield = true;
                        Tableau.current.time.addEvent
                        ({
                            delay: 5000,
                            callback: ()=>
                            {
                                if(!Tableau.current.oneShotOnBoss)
                                {
                                    Tableau.current.bossShield = false;
                                }
                            },
                            loop: false
                        })
                    }
                },
                loop: true
            })
        }
    }


    update(player)
    {  
        //this.invulnerability();
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