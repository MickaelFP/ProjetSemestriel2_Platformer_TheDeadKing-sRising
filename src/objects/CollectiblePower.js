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
        this.setDisplaySize(26, 20);
        this.setBounceX(0);
        //this.setGravityY(-300)
        this.setVelocity(0, 0);
        this.setBodySize(this.body.width, this.body.height);

        //this.world = scene;
        //this.scale = 3;

        // Y
        this.originalY=y;
        this.minY=y-20;
        this.maxY=y+5;

        // on applique les propriétés du début de l'animation
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        this.anims.create({
            key: 'effect',
            frames: this.anims.generateFrameNumbers('power', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });            
        this.anims.play('effect', true);

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        scene.tweens.add
        ({
            targets:this,
            duration:200,
            delay:Math.random()*1000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () 
            {
                me.start();
            }
        })

    }


    start()
    {
        this.scene.tweens.add
        ({
            targets: this,
            y: {
                from: this.minY,
                to:this.maxY,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });

    }

}