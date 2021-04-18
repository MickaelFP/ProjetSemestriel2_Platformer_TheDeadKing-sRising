class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "player")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBounce(0.3);
        this.setGravityY(700)
        this.setFriction(1,1);

        this.setBodySize(this.body.width-6,this.body.height-3);
        this.setOffset(3, 3);
        this.jumping = false;

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

        this._directionX=0;
        this._directionY=0;

    }

    set directionX(value){
        this._directionX=value;
    }
    set directionY(value){
        this._directionY=value;
    }

    /********** Arrête le joueur **********/
    stop()
    {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }


    /********** Déplace le joueur en fonction des directions données **********/
    move()
    {

        switch (true)
        {
            case this._directionX < 0 && !this.jumping:
                this.setVelocityX(-160);
                this.anims.play('left', true);
                break;

            case this._directionX > 0 && !this.jumping:
                this.setVelocityX(160);
                this.anims.play('right', true);
                break;

            case this._directionX < 0 && this.jumping:
                this.setVelocityX(-160);
                this.anims.play('jumpLeft', true);
                break;
            
            case this._directionX > 0 && this.jumping:
                this.setVelocityX(160);
                this.anims.play('jumpRight', true);
                break;

            default:
                this.setVelocityX(0);
                this.anims.play('turn', true);
        }

        if(this._directionY<0)
        {
            if(this.body.blocked.down || this.body.touching.down)
            {
                this.jumping = true;
                this.setVelocityY(-500);
            }
        }
        else//(this._directionY == 0 && this._directionX == 0)
        {
            this.jumping = false;
        }
    }

}