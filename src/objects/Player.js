class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.setGravityY(700);
        this.setFriction(1,1);

        this.setBodySize(this.body.width-6,this.body.height-3);
        //this.scale = 0.3; 
        this.setOffset(3, 3);

        this.varSpeed = 0;

        this.jumping = false;
        this.falling = true;
        this.staticY = false;
        this.semiMobileY = false;
        this.contactPlayerPB = false;

        //console.log("player Is Created");

        /********** On définit les animations du joueur **********/
        this.anims.create(
        {
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end:  7}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 8, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'turn',
            frames: this.anims.generateFrameNumbers('player', { start: 16, end: 21 }),
            frameRate: 10
        });

        this.anims.create(
        {
            key: 'jumpLeft',
            frames: [ { key: 'player', frame: 3 } ],
            frameRate: 20
        });

        this.anims.create(
        {
            key: 'jumpRight',
            frames: [ { key: 'player', frame: 12 } ],
            frameRate: 20
        });

        this.anims.create(
        {
            key: 'jumpUp',
            frames: this.anims.generateFrameNumbers('player', { start: 22, end: 25 }),
            frameRate: 8
        });

        this.anims.create(
        {
            key: 'Fall',
            frames: [ { key: 'player', frame: 26 } ],
            frameRate: 20
        });

        this._directionX=0;
        this._directionY=0;

    }


    set directionX(value)
    {
        this._directionX=value;
    }
    set directionY(value)
    {
        this._directionY=value;
    }


    update()
    {
        this.move();
        this.jump();
        this.animation();

    }


    animation() // bien plus fluide qu'un switch (et y aura aucun bug avec ça)
    {
        if(this.body.velocity.x < 0)
        {
            if(this.body.velocity.y < 0)
            {
                this.anims.play('jumpLeft', true);
            }
            else if(this.body.velocity.y > 0)
            {
                this.anims.play('jumpLeft', true);
            }
            else
            {
                this.anims.play('left', true);
            }
        }
        else if(this.body.velocity.x > 0)
        {
            if(this.body.velocity.y < 0)
            {
                this.anims.play('jumpRight', true);
            }
            else if(this.body.velocity.y > 0)
            {
                this.anims.play('jumpRight', true);
            }
            else
            {
                this.anims.play('right', true);
            }
        }
        else
        {
            if(this.body.velocity.y < 0)
            {
                this.anims.play('jumpUp', true);
            }
            else if(this.body.velocity.y > 0)
            {
                this.anims.play('Fall', true);
            }
            else
            {
                this.anims.play('turn', true);
            }

        }
    }


    /********** Arrête le joueur **********/
    stop()
    {
        //console.log("playerStop");
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }


    /********** Déplace le joueur en fonction des directions données **********/
    move()
    {

        if(!Tableau.current.playerMoveStop && !Tableau.current.player.isDead)
        {
            //console.log("Tu peux bouger")
            switch (true)
            {
                case this.body.velocity.x  == 0 && this.jumping:
                    //console.log("jump");
                    break;

                case this.body.velocity.x == 0 && this.falling:
                    //console.log("fall");
                    break;

                case this._directionX < 0 && this.staticY:
                    //console.log("left");
                    this.setVelocityX(-160-this.varSpeed);
                    break;
    
                case this._directionX > 0 && this.staticY:
                    //console.log("right");
                    this.setVelocityX(160+this.varSpeed);
                    break;
    
                case this._directionX < 0 && this.semiMobileY:
                    //console.log("jumpLeft");
                    this.setVelocityX(-160-this.varSpeed);
                    break;
                
                case this._directionX > 0 && this.semiMobileY:
                    //console.log("jumpRight");
                    this.setVelocityX(160+this.varSpeed);
                    break;

                default:
                    this.setVelocityX(0);
            }
        }
        /*else
        {
            if(!Tableau.current.dPressed)
            {
                this.setVelocityX(0);
                this.anims.play('turn', true);
            }
        }*/

        if(this.body.velocity.y != 0 && !this.contactPlayerPB)
        {
            if(this.body.velocity.y < 0)
            {
                this.jumping = true;
                this.falling = false;
            }
            if(this.body.velocity.y > 0)
            {
                this.falling = true;
                this.jumping = false;
            }
        }
        else
        {
            this.jumping = false;
            this.falling = false;
        }

        if(!this.jumping && !this.falling)
        {
            this.staticY = true;
            this.semiMobileY = false;
        }
        else if(this.jumping || this.falling)
        {
            this.semiMobileY = true;
            this.staticY = false;
        }
        else{
            this.staticY = false;
            this.semiMobileY = false;
        }

    } // FIN DE MOVE

    jump()
    {
        if(!Tableau.current.playerMoveStop && !Tableau.current.tJArrowDownPressed)
        {
            if(Tableau.current.arrowUpPressed)
            {
                if(!Tableau.current.jumpStop)
                {
                    if(this._directionY<0)
                    {
                        if(this.body.blocked.down || this.body.touching.down)
                        {
                            if(Tableau.current.timingJump == true)
                            {
                                this.setVelocityY(-500-(this.varSpeed/2));
                                Tableau.current.timingJump = false;
                                Tableau.current.timingJumping();
                            }
                        }
                    }
                }
            }

        }

    }  // FIN DE JUMP
    
} // Fin de " class Player "