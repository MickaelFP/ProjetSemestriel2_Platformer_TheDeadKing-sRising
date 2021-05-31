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
    }

    update() 
    {
        this.setVelocityX(0);
        if(this.body.position.x < 5184 || this.body.position.x > 6400)
        {
            this.setImmovable(true);
        }
        else
        {
            this.setImmovable(false);
        }
    }
}