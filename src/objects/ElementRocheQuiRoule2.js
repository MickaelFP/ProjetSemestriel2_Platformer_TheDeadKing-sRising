class ElementRocheQuiRoule2 extends Phaser.Physics.Arcade.Sprite 
{

    constructor(scene, x, y,) 
    {
        super(scene, x, y, 'rocheQuiRoule2');

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

    }


    limits()
    {
        if(this.body.position.x > 5184 || this.body.position.x < 4996)
        {
            this.setImmovable(true);
        }
        else
        {
            this.setImmovable(false);
        }
    }


    soundPlaying()
    {
        if(this.body.velocity.x !== 0)
        {
            if(!this.soundUnSeul2)
            {
                console.log("je veux du son 2");
                Tableau.current.rocheSound.play(this.musicConfigX);
                this.soundUnSeul2 = true;
                Tableau.current.time.addEvent
                ({
                    delay: 3360,
                    callback: ()=>
                    {
                        this.soundUnSeul2 = false;
                    },
                    loop: false
                })
            }
        }
        else
        {
            Tableau.current.rocheSound.stop();
            this.soundUnSeul2 = false;
        }
    }


    update()
    {
        /*if(Tableau.current.player.body.position.x < this.x - 64
            || Tableau.current.player.body.position.x > this.x + 33)
        {
            this.setVelocityX(0);
        }
        else
        {
            console.log("sans un bruit 2");
            this.setVelocityX(0.1);
        }

        this.limits();
        this.soundPlaying();*/

    }
}