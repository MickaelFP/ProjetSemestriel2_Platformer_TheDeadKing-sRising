class ElementRocheQuiRoule extends Phaser.Physics.Arcade.Sprite 
{

    constructor(scene, x, y,) 
    {
        super(scene, x, y, 'rocheQuiRoule');

        console.log("ElementQuiRoule en vie");

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.player, this);

        this.setImmovable(false);
        this.setDisplaySize(64, 64);
        this.setBounceX(0);
        //this.setGravityY(5000);
        //this.setVelocity(0, 0);
        this.setBodySize(this.body.width, this.body.height);
    }


    update() 
    {
        this.setVelocity(0, 0);
        this.gravity();
    }


    gravity() 
    {
        if (this.body.velocity.y != 0) 
        {
            this.setGravityY(600);
        }
        else 
        {
            this.setGravityY(0);
        }
    }

}