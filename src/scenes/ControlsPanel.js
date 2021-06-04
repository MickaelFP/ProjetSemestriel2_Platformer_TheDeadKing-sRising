class ControlsPanel extends Phaser.Scene {
    constructor(){
      super("panel");
    }
  
    preload ()
    {
        // images
        this.load.image('pCBG', 'assets/backgrounds/startBackground.png');
        this.load.image('pCB', 'assets/elements/pCBouton_100pct4.png');
        this.load.image('logo', 'assets/elements/PlatformerLogoRemastered_400x400.png');
        //this.load.spritesheet('cp', 'assets/cp.png', { frameWidth: 206, frameHeight: 184 } );

        // audios
        //this.load.audio('welcome1', 'assets/Sound/Dark-Hero-3.mp3');
        this.load.audio('welcome', 'assets/Sound/Piano_Sonata_no_14.mp3');
        this.load.audio('drapeau', 'assets/Sound/Drapeau_ID-1788.wav');
    }
  
    create()
    {
        //---------- booleans que l'on compte utiliser ----------

        this.rPressed = false;


        //---------- on affiche les images à l'écran ----------

        this.add.sprite(game.config.width/2, game.config.height/2, 'pCBG').setAlpha(0.5);
        this.add.sprite(game.config.width/6, game.config.height/3, 'logo').setDisplaySize(320,320);

        let logoLight = this.add.pointlight(game.config.width/4, game.config.height/2.5, 0, 200, 0.5);
        logoLight.attenuation = 0.05;
        logoLight.color.setTo(255, 50, 255);
  

        //---------- on affiche les boutons ----------

        let pCB = this.add.sprite(game.config.width/2-8, game.config.height -170, 'pCB');
        //startB.scale = 0.5;


        //---------- on affiche les textes que l'on veut faire apparaître (boutons, titre...) ----------

        //let cPBText1 = this.add.text(game.config.width/2-90, game.config.height -270, "[A] = throw bones",{font: "15px visitor", fill:"#000000"}); //375,560,FFF
        let cPBText2 = this.add.text(game.config.width/2-90, game.config.height -25, "[R] = back",{font: "15px Script MT Bold", fill:"#FFFFFF"});
        /*let cPBText3 = this.add.text(game.config.width/2-90, game.config.height -210, "[I] = infos controls",{font: "15px visitor", fill:"#000000"});
        let cPBText4 = this.add.text(game.config.width/2-90, game.config.height -180, "[ArrowLeft] = go left",{font: "15px visitor", fill:"#000000"});
        let cPBText5 = this.add.text(game.config.width/2-90, game.config.height -150, "[ArrowRight] = go right",{font: "15px visitor", fill:"#000000"});
        let cPBText6 = this.add.text(game.config.width/2-90, game.config.height -120, "[ArrowTop] = jump",{font: "15px visitor", fill:"#000000"});
        let cPBText7 = this.add.text(game.config.width/2-90, game.config.height -90, "[Ctrl] = disable Checkpoint",{font: "15px visitor", fill:"#000000"});*/

        //let cPBText2_1 = this.add.text(game.config.width/2-64, game.config.height -45, "= back",{font: "15px visitor", fill:"#FFFFFF"});

        //tweens permet de donner un petit effet à la cible voulue (target)
        this.tweens.add(
        {
            targets:[cPBText2],
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:0,
            alpha:
            {
                startDelay:0,
                from:0,
                to:1,
            }
        })    


        //---------- quelques effets supplémentaires symphatiques ----------

        let lanterne = this.add.pointlight(game.config.width/2-378, game.config.height/2+32, 0, 50, 0.5);
        lanterne.attenuation = 0.05;
        lanterne.color.setTo(255, 200, 0);
        let lanterne5 = this.add.pointlight(game.config.width/2+242, game.config.height/2+38, 0, 30, 0.5);
        lanterne5.attenuation = 0.05;
        lanterne5.color.setTo(255, 200, 0);

        /*let lanterne2 = this.add.pointlight(game.config.width/2-250, game.config.height/2+40, 0, 30, 0.5);
        lanterne2.attenuation = 0.05;
        lanterne2.color.setTo(255, 200, 0);*/
        let lanterne6 = this.add.pointlight(game.config.width/2+370, game.config.height/2+31, 0, 50, 0.5);
        lanterne6.attenuation = 0.05;
        lanterne6.color.setTo(255, 200, 0);

        /*let lanterne3 = this.add.pointlight(game.config.width/2-190, game.config.height/2+45, 0, 15, 0.5);
        lanterne3.attenuation = 0.05;
        lanterne3.color.setTo(255, 200, 0);*/
        let lanterne4 = this.add.pointlight(game.config.width/2+182, game.config.height/2+45, 0, 15, 0.5);
        lanterne4.attenuation = 0.05;
        lanterne4.color.setTo(255, 200, 0);


        this.tweens.add(
        {
            targets:[lanterne, lanterne6],
            duration:1000,
            yoyo: true,
            repeat:-1,
            delay:0,
            alpha:
            {
                startDelay:0,
                from:0,
                to:1,
            }
        })
        this.tweens.add(
        {
            targets:[/*lanterne2, */lanterne5],
            duration:2000,
            yoyo: true,
            repeat:-1,
            delay:0,
            alpha:
            {
                startDelay:0,
                from:0,
                to:1,
            }
        })
        this.tweens.add(
        {
            targets:[/*lanterne3, */lanterne4],
            duration:3000,
            yoyo: true,
            repeat:-1,
            delay:0,
            alpha:
            {
                startDelay:0,
                from:0,
                to:1,
            }
        })
  

        //---------- on initialise les touches du clavier pour lancer le jeu, activer/desactiver des options, etc ----------

        this.input.keyboard.on('keydown-R', function () //'keydown-SPACE', function () 
        {
            if (!this.rPressed)
            {
                this.music = this.sound.add('drapeau');
                var musicConfig = 
                {
                    mute: false,
                    volume: 1,
                    rate : 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay:0,
                }
                this.music.play(musicConfig);

                this.cameras.main.fadeOut(1000, 0, 0, 0)
                this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
                {
                    /*if(Tableau.current){
                        Tableau.current._destroy();
                    }
                    this.game.scene.start(tableau);*/
    
                    this.rPressed = true;
                    this.game.scene.start(Welcome);
                    this.scene.start("bootGame");
                })
            }
        }, this);

        this.input.on('pointerdown', function(pointer){
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) =>
            {
                /*if(Tableau.current){
                    Tableau.current._destroy();
                }
                this.game.scene.start(tableau);
                this.scene.start("aventureBegining");*/
                this.rPressed = true;
                this.game.scene.start(Niveau1);
                this.scene.start("Cemetary");
            })

        },this);
    }
}
