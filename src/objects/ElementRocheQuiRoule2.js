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
    }


    update() 
    {
        this.setVelocityX(0);
        if(this.body.position.x > 5184 || this.body.position.x < 4996)
        {
            this.setImmovable(true);
        }
        else
        {
            this.setImmovable(false);
        }
    }

}