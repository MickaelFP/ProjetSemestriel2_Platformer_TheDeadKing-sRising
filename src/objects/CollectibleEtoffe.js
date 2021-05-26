/*
    <script src="src/objects/CollectibleEtoffe.js"></script>

class CollectibleEtoffe extends Phaser.Physics.Arcade.Sprite 
{

    constructor(scene, x, y,) 
    {
        super(scene, x, y, 'etoffe');
        //this.body.allowGravity=false;

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.add.collider(scene.player, this);

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
        this.minY=y-5;
        this.maxY=y+5;

        // on applique les propriétés du début de l'animation
        this.y=this.minY;
        this.alpha=0;
        let me=this;

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

}*/