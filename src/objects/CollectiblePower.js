class CollectiblePower extends Phaser.Physics.Arcade.Sprite 
{

    constructor(scene, x, y,) 
    {
        super(scene, x, y, 'power');
        //this.body.allowGravity=false;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.overlap(
            scene.player,
            this,
            scene.ramasserPower,
            null,
            scene
        );

        this.setImmovable(true);
        this.setDisplaySize(52, 50);
        this.setBounceX(0);
        this.setGravityY(-300)
        this.setVelocity(0, 0);
        this.setBodySize(52, 50);


        this.anims.create({
            key: 'effect',
            frames: this.anims.generateFrameNumbers('power', { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });            
        this.anims.play('effect', true);

    }

}