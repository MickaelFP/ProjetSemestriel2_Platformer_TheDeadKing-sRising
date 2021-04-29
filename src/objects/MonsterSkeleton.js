class MonsterSkeleton extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {                                                              //OBLIGATOIRE
        super(scene, x, y,"squelette");                                                       //OBLIGATOIRE
        //pas de gravité
        this.body.allowGravity=true;
        
        this.setDisplaySize(32, 48);
        this.setCollideWorldBounds(true);
        //this.setBounce(1);
        this.setBounceX(1);
        //this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(-80*(Math.random()+1.5));  // 80*(Math.random()+1.5) // -200
        this.walking = true;

        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('squelette', { start: 4, end: 7 }),
            frameRate: 5,
            repeat: -1,
        });
        this.anims.play('moving', true);       

    }
    update(player)
    {
        if(this.body)
        {
        
            if(this.body.velocity.x < 0)
            {
                this.flipX=true;
            }
            else
            {
                this.flipX=false;
            }
        }
    }

    
    /**
    * arrête le monstre
    */
    stop()
    {
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.directionY=0;
        this.directionX=0;
    }
}