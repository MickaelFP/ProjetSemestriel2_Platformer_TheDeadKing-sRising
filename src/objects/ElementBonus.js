class ElementBonus extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "bonus")
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.setCollideWorldBounds(true)
        this.setBodySize(this.body.width,this.body.height+46);
       
        this.oneBonus = false;
    }

    EventRandomDrop (player)
    {
        this.disableBody(true, true);
        this.oneBonus = true;
        if( this.oneBonus == true)
        {
            ui.gagne1();
            this.cameras.main.shake(1000, 0.025);
            me.tweens.add(
            {
                targets:me.cameras.main,
                duration:20,
                displayHeight:
                {
                    from:448,
                    to:470,
                },
                displayWidth:
                {
                    from:886,
                    to:908,
                },
                onComplete: function () 
                {
                    this.cameras.main.shake(0,0);
                    //onComplete();
                }
            });
            //this.cameras.main.flash(1000,255,162,0);
            //this.player.plusVite(); 
        }
    }
}