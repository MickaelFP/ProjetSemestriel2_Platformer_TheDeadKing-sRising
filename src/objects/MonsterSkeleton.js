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
        this.body.allowGravity=false;
        
        this.setDisplaySize(32, 48);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
        //this.setBodySize(this.body.width,this.body.height);
        this.setVelocityX(0);
        this.walking = true;

        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('squelette', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.play('moving', true);

        /*this._directionX=0;
        this._directionY=0;

        this._positionX=0;*/
        
        // X
        this.originalX=x;
        this.minX=x-((386-135)-(115/2));
        this.maxX=x+(661-386-(115/2));
        
        // Y
        this.originalY=y;
        this.minY=y;
        this.maxY=y;
        
     // on applique les propriété du début de l'animation
        this.x=this.minX;
        this.y=this.minY;
        this.alpha=0;
        let me=this;

        //on fait apparaitre notre objet avec un petit delay, puis on lance l'animation
        //ceci a pour effet de décaler les animations pour ce même objet
        
        scene.tweens.add({
            targets:this,
            duration:Math.random()*200,
            delay:Math.random()*1000,
            
            alpha:{
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            },
            onComplete: function () {
                me.start();
             }
        })
        

    }

    start(){
        this.scene.tweens.add(
            {
            targets: this,
            x: 
            {
                from: this.minX,
                to:this.maxX,
                duration: 10*1500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                flipX:true,
                
            },
            y: 
            {
                from: this.minY,
                to:this.maxY,
                duration: 500,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1
            }
        });

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