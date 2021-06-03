class ElementRocheQuiRoule extends Phaser.Physics.Arcade.Sprite 
{

    constructor(scene, x, y,) 
    {
        super(scene, x, y, 'rocheQuiRoule');

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.player, this);

        this.setImmovable(false);
        this.setDisplaySize(64, 64);
        this.setBounceX(0);
        //this.setVelocity(0, 0);
        this.setBodySize(this.body.width, this.body.height);
        this.setGravityY(600);
        this.setFriction(1);

        this.soundUnSeul = false;
        this.neverMoveAgain = false;
    }


    limits()
    {
        if(this.body.position.x < 5184 || this.body.position.x > 6400)
        {
            this.setImmovable(true);
            this.neverMoveAgain = true;
        }
        else
        {
            this.setImmovable(false);
            this.neverMoveAgain = false;
        }
    }


    soundPlaying()
    {
        if(this.body.velocity.x !== 0)
        {
            if(!this.soundUnSeul)
            {
                console.log("je veux du son");
                Tableau.current.rocheSound.play(this.musicConfigX);
                this.soundUnSeul = true;
                /*Tableau.current.time.addEvent
                ({
                    delay: 3360,
                    callback: ()=>
                    {
                        this.soundUnSeul = false;
                    },
                    loop: false
                })*/
            }
        }
        else
        {
            Tableau.current.rocheSound.stop();
            this.soundUnSeul = false;
        }
    }


    update() 
    {
        if(Tableau.current.player.body.position.x < this.x - 64
            || Tableau.current.player.body.position.x > this.x + 33)
        {
            this.setVelocityX(0);
        }
        else if(Tableau.current.player.body.position.x >= this.x - 64
            && Tableau.current.player.body.position.x <= this.x + 33
            && Tableau.current.player.body.position.y >= this.y - 64
            && Tableau.current.player.body.position.y <= this.y + 64)
        {
            if(!this.neverMoveAgain)
            {
                this.setVelocityX(0.1);
            }
            else
            {
                this.setVelocityX(0);
            }
        }

        this.limits();
        this.soundPlaying();

    }
}