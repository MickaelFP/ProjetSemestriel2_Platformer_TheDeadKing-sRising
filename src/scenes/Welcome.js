class Welcome extends Phaser.Scene {
    constructor(){
      super("bootGame");
    }
  
    preload ()
    {
        this.load.image('startBG', 'assets/backgrounds/startBackground.png');
        this.load.image('startB', 'assets/elements/startBouton.png');
        this.load.image('logo', 'assets/elements/PlatformerLogoRemastered.png');
        //this.load.spritesheet('cp', 'assets/cp.png', { frameWidth: 206, frameHeight: 184 } );
        //this.load.audio('welcome1', 'assets/Sound/Dark-Hero-3.mp3');
        this.load.audio('welcome', 'assets/Sound/Piano_Sonata_no_14_SV.mp3');
    }
  
    create()
    {
        
        this.welcome = this.sound.add('welcome');
        var musicConfig = 
        {
            mute: false,
            volume: 1,
            rate : 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay:0,
        }
        this.welcome.play(musicConfig);
  
        //---------- on affiche les images à l'écran ----------

        this.add.sprite(game.config.width/2, game.config.height/2, 'startBG');
        this.add.sprite(game.config.width/2, game.config.height/2, 'startBG');
  

        //---------- on affiche les boutons ----------

        let startB1 = this.add.sprite(game.config.width/2-8, game.config.height -150, 'startB');
        let startB2 = this.add.sprite(game.config.width/2-8, game.config.height -50, 'startB');
        let startB3 = this.add.sprite(game.config.width/2-8, game.config.height -250, 'startB');
        //startB.scale = 0.5;


        //---------- on affiche les textes que l'on veut faire apparaître (boutons, titre...) ----------

        let startBText1 = this.add.text(game.config.width/2-72, game.config.height -265, "Play",{font: "28px visitor", fill:"#000000"}); //375,560,FFF
        let startBText2 = this.add.text(game.config.width/2-79, game.config.height -165, "Ctrls",{font: "28px visitor", fill:"#000000"});
        let startBText3 = this.add.text(game.config.width/2-66, game.config.height -65, "Credits",{font: "28px visitor", fill:"#000000"});

        let startBText1_2 = this.add.text(game.config.width/2-12, game.config.height -265, "[enter]",{font: "28px visitor", fill:"#000000"});
        let startBText2_2 = this.add.text(game.config.width/2-12, game.config.height -165, "[space]",{font: "28px visitor", fill:"#000000"});
        let startBText3_2 = this.add.text(game.config.width/2+28, game.config.height -65, "[-]",{font: "28px visitor", fill:"#000000"});

        //tweens permet de donner un petit effet à la cible voulue (target)
        this.tweens.add(
        {
            targets:[startBText1_2],
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

        this.tweens.add(
            {
                targets:[startBText2_2],
                duration:2000,
                yoyo: true,
                repeat:-1,
                delay:Math.random()*1000,
                alpha:
                {
                    startDelay:Math.random()*5100,
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

        this.input.keyboard.on('keydown-ENTER', function () //'keydown-SPACE', function () 
        {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
            {
                /*if(Tableau.current){
                    Tableau.current._destroy();
                }
                this.game.scene.start(tableau);
                this.scene.start("aventureBegining");*/
                this.game.scene.start(Niveau1);
                this.scene.start("Cemetary");
            })
        }, this);

        this.input.keyboard.on('keydown-SPACE', function () //'keydown-SPACE', function () 
        {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
            {
                /*if(Tableau.current){
                    Tableau.current._destroy();
                }
                this.game.scene.start(tableau);
                this.scene.start("aventureBegining");*/
                this.game.scene.start(ControlsPanel);
                this.scene.start("panel");
            })
        }, this);
    }
}
