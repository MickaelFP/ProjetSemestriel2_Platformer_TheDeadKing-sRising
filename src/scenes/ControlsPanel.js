class ControlsPanel extends Phaser.Scene {
    constructor(){
      super("panel");
    }
  
    preload ()
    {
        this.load.image('pCBG', 'assets/backgrounds/startBackground.png');
        this.load.image('pCB', 'assets/elements/pCBouton_100pct.png');
        this.load.image('logo', 'assets/elements/PlatformerLogoRemastered.png');
        //this.load.spritesheet('cp', 'assets/cp.png', { frameWidth: 206, frameHeight: 184 } );
        //this.load.audio('welcome1', 'assets/Sound/Dark-Hero-3.mp3');
        this.load.audio('welcome', 'assets/Sound/Piano_Sonata_no_14.mp3');
    }
  
    create()
    {
        //---------- on affiche les images à l'écran ----------

        this.add.sprite(game.config.width/2, game.config.height/2, 'pCBG');
        //this.add.sprite(game.config.width/2, game.config.height/2, 'startBG');
  

        //---------- on affiche les boutons ----------

        let pCB = this.add.sprite(game.config.width/2-8, game.config.height -170, 'pCB');
        //startB.scale = 0.5;


        //---------- on affiche les textes que l'on veut faire apparaître (boutons, titre...) ----------

        let cPBText1 = this.add.text(game.config.width/2-85, game.config.height -240, "[A] = throw bones",{font: "15px visitor", fill:"#000000"}); //375,560,FFF
        let cPBText2 = this.add.text(game.config.width/2-85, game.config.height -210, "[R]",{font: "15px visitor", fill:"#000000"});
        let cPBText3 = this.add.text(game.config.width/2-85, game.config.height -180, "[ArrowLeft] = go left",{font: "15px visitor", fill:"#000000"});
        let cPBText4 = this.add.text(game.config.width/2-85, game.config.height -150, "[ArrowRight] = go right",{font: "15px visitor", fill:"#000000"});
        let cPBText5 = this.add.text(game.config.width/2-85, game.config.height -120, "[ArrowTop] = jump",{font: "15px visitor", fill:"#000000"});

        let cPBText2_1 = this.add.text(game.config.width/2-60, game.config.height -210, "= back/menu/pause",{font: "15px visitor", fill:"#000000"});

        //tweens permet de donner un petit effet à la cible voulue (target)
        this.tweens.add(
        {
            targets:[cPBText2],
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:Math.random()*1000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            }
        })

        //---------- quelques effets supplémentaires symphatiques ----------

        let lanterne = this.add.pointlight(game.config.width/2-378, game.config.height/2+32, 0, 50, 0.5);
        lanterne.attenuation = 0.05;
        lanterne.color.setTo(255, 200, 0);
        this.tweens.add(
        {
            targets:lanterne,
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:Math.random()*1000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            }
        })

        let lanterne2 = this.add.pointlight(game.config.width/2-250, game.config.height/2+40, 0, 30, 0.5);
        lanterne2.attenuation = 0.05;
        lanterne2.color.setTo(255, 200, 0);
        this.tweens.add(
        {
            targets:lanterne2,
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:Math.random()*3000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            }
        })

        let lanterne3 = this.add.pointlight(game.config.width/2-190, game.config.height/2+45, 0, 15, 0.5);
        lanterne3.attenuation = 0.05;
        lanterne3.color.setTo(255, 200, 0);
        this.tweens.add(
        {
            targets:lanterne3,
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:Math.random()*2000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            }
        })

        let lanterne4 = this.add.pointlight(game.config.width/2+182, game.config.height/2+45, 0, 15, 0.5);
        lanterne4.attenuation = 0.05;
        lanterne4.color.setTo(255, 200, 0);
        this.tweens.add(
        {
            targets:lanterne4,
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:Math.random()*2000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            }
        })

        
        let lanterne5 = this.add.pointlight(game.config.width/2+242, game.config.height/2+38, 0, 30, 0.5);
        lanterne5.attenuation = 0.05;
        lanterne5.color.setTo(255, 200, 0);
        this.tweens.add(
        {
            targets:lanterne5,
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:Math.random()*1000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            }
        })

        let lanterne6 = this.add.pointlight(game.config.width/2+370, game.config.height/2+31, 0, 50, 0.5);
        lanterne6.attenuation = 0.05;
        lanterne6.color.setTo(255, 200, 0);
        this.tweens.add(
        {
            targets:lanterne6,
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:Math.random()*3000,
            alpha:
            {
                startDelay:Math.random()*5000,
                from:0,
                to:1,
            }
        })
  

        //---------- on initialise les touches du clavier pour lancer le jeu, activer/desactiver des options, etc ----------

        this.input.keyboard.on('keydown-R', function () //'keydown-SPACE', function () 
        {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
            {
                /*if(Tableau.current){
                    Tableau.current._destroy();
                }
                this.game.scene.start(tableau);*/
                this.game.scene.start(Welcome);
                this.scene.start("bootGame");
            })
        }, this);
    }
}
