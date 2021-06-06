class ElementRocheQuiRoule2 extends Phaser.Physics.Arcade.Sprite 
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
        this.setGravityY(600);
        //this.setVelocity(0, 0);
        this.setFriction(1);
        this.setBodySize(this.body.width, this.body.height);

        this.soundUnSeul2 = false;
        this.neverMoveAgain2 = false;

    }


    limits()
    {
        if(this.body.position.x > 5184 || this.body.position.x < 4998)
        {
            //console.log("bouge pas 2 = pas de son 2");
            this.setImmovable(true);
            this.neverMoveAgain2 = true;
        }
        else
        {
            this.setImmovable(false);
            this.neverMoveAgain2 = false;
        }
    }


    soundPlaying()
    {
        if(this.body.velocity.x !== 0)
        {
            if(!this.soundUnSeul2)
            {
                //console.log("je veux du son 2");
                Tableau.current.rocheSound2.play(this.musicConfigX2);
                this.soundUnSeul2 = true;
                /*Tableau.current.time.addEvent
                ({
                    delay: 3360,
                    callback: ()=>
                    {
                        this.soundUnSeul2 = false;
                    },
                    loop: false
                })*/
            }
        }
        else
        {
            Tableau.current.rocheSound2.stop();
            this.soundUnSeul2 = false;
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
            if(!this.neverMoveAgain2 && Tableau.current.player.body.velocity.x !== 0)
            {
                this.setVelocityX(0.1);
            }
            else
            {
                this.setVelocityX(0);
            }
        }

        this.limits();

        /*if(Tableau.current.isMobilePerso)
        {
            this.soundPlaying();
        }*/

    }
}