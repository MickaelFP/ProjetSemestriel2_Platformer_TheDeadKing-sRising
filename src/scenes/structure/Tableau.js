/**
 * Toutes les fonctions propres à un tableau dans notre jeu.
 * Cette classe n'est pas à utiliser directement, elle doit être extend !
 */
class Tableau extends Phaser.Scene{
    /**
     *
     * @param {String} key identifiant de la scène à jouer
     */
    constructor(key) {
        super(key);

        this.lifePoints=3;
    }

    /**
     * Par défaut on charge un fond et le player
     */
    preload(){
        this.load.image('sky', 'assets/backgrounds/sky2.png');
        this.load.image('sun', 'assets/elements/sun.jpg');
        this.load.image('ossement', 'assets/elements/ossement.png');
        this.load.image('blood', 'assets/elements/bloodblack.png');
        this.load.image('spike', 'assets/elements/spike.png');
        this.load.image('osExplosion', 'assets/elements/persoMort.png');
        this.load.image('broke', 'assets/elements/vaseBroke.png');
        this.load.image('infCtrl', 'assets/elements/infosControls2.png');
        this.load.image('hp0', 'assets/ui/hp0.png');
        this.load.image('hp1', 'assets/ui/hp1.png');
        this.load.image('hp2', 'assets/ui/hp2.png');
        this.load.image('hp3', 'assets/ui/hp3.png');

        this.load.spritesheet('zombie2', 'assets/Spritesheet/zombie2.png', { frameWidth: 32, frameHeight: 48 } ); 

        this.load.audio('os', 'assets/Sound/os_sound.mp3');
        this.load.audio('splash', 'assets/Sound/splash.mp3');
        this.load.audio('crack', 'assets/Sound/crack.mp3');
        this.load.audio('brkkk', 'assets/Sound/broke_sound.mp3');
        this.load.audio('chute', 'assets/Sound/boule_neige.mp3');
        this.load.audio('solPierreBrise', 'assets/Sound/explosion-1.mp3');
        this.load.audio('solEffondre', 'assets/Sound/explosion-2.mp3');
        this.load.audio('AmbianceHalloween1', 'assets/Sound/Ambiance_halloween_1_SV.mp3');
        this.load.audio('criZombie', 'assets/Sound/Zombie_ID-2111.wav');
        this.load.audio('shhh', 'assets/Sound/sabre-9.mp3');

        this.load.spritesheet('player',
            'assets/Spritesheet/playerRemastered.png',
            { frameWidth: 32, frameHeight: 64  }
        );
    }
    create(){

        //---------- Données primaires indispensable au tabbleau ----------

        Tableau.current=this;

        this.isMobile=this.game.device.os.android || this.game.device.os.iOS;
        this.sys.scene.scale.lockOrientation("landscape")
        console.log("On est sur "+this.constructor.name+" / "+this.scene.key);

        /**
         * Le ciel en fond
         * @type {Phaser.GameObjects.Image}
         */
        this.sky=this.add.image(0, 0, 'sky').setOrigin(0,0);
        this.sky.displayWidth=14*64;
        this.sky.setScrollFactor(0,0);

        /**
        * Le joueur
        * @type {Player}
        */
        this.player=new Player(this,0+160,0+1952);//160//1200/1968
        this.player.setMaxVelocity(800,800); //évite que le player quand il tombe ne traverse des plateformes

        this.pv3=this.add.sprite(40, 100, "hp3");
        this.pv3.setDepth(1000);
        this.pv3.setScrollFactor(0);

        //---------- fonction en booleans d'affichage d'image ----------

        this.blood=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"blood");
        this.blood.displayWidth=64;
        this.blood.displayHeight=64;
        this.blood.visible=false;

        this.blood2=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"osExplosion");
        this.blood2.displayWidth=64;
        this.blood2.displayHeight=64;
        this.blood2.visible=false;

        this.broke=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"broke");
        this.broke.displayWidth=32;
        this.broke.displayHeight=32;
        this.broke.visible=false;

        this.infCtrl=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"infCtrl");
        this.infCtrl.displayWidth=400;
        this.infCtrl.displayHeight=400;
        this.infCtrl.visible=false;


        //---------- booleans simples que l'on compte utiliser ----------

        this.aPressed=false;

        this.iPressed=false;
        this.showInfos=false;

        this.ControlPressed=false;

        this.vaseDrope=false;
        this.oneDrope=false;
        this.walking = true;

        //this.cleanStorage();
    }

    InfosLifePoints()
    {
        if(this.lifePoints == 2)
        {
            console.log("hp2");
            this.pv2=this.add.sprite(40, 100, "hp2");
            this.pv2.setDepth(1000);
            this.pv2.setScrollFactor(0);
            this.pv3.destroy();
        }
        if(this.lifePoints == 1)
        {
            this.pv1=this.add.sprite(40, 100, "hp1");
            this.pv1.setDepth(1000);
            this.pv1.setScrollFactor(0);
            this.pv2.destroy();
            console.log("hp1");
        }
        if(this.lifePoints == 0)
        {
            this.pv0=this.add.sprite(40, 100, "hp0");
            this.pv0.setDepth(1000);
            this.pv0.setScrollFactor(0);
            this.pv1.destroy();
            console.log("hp0");
        }
    }

    /**
     *
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    update(monster, player, onComplete)
    {
        super.update();
        this.player.move(); 

        // ---------------------------------------- Effets pour chaques touches configurées ----------------------------------------

        if (this.aPressed)
        {
            let me = this;

            me.aPressed=new ElementProjectils(this,this.player.x,this.player.y,"ossement").setDepth(996);

            me.aPressed.rotation = Phaser.Math.Between(0,6);
            /*me.tweens.add({
                targets:me.aPressed,
                duration:0,
                displayHeight:
                {
                    from:16,
                    to:16,
                },
                displayWidth:
                {
                    from:16,
                    to:16,
                },
                onComplete: function (ossement) 
                {
                    //me.aPressed.visible=false;
                    //me.aPressed.disableBody(true, true);
                    //onComplete();
                }
            })*/

            /*
            me.aPressed=this.add.sprite(this.sys.canvas.width/2,this.sys.canvas.height/2,"ossement").setDepth(996);
            me.aPressed.rotation = Phaser.Math.Between(0,6);
            me.aPressed.x=me.player.x;
            me.aPressed.y=me.player.y;
            */
            //aPressed.displayWidth=32;
            //aPressed.displayHeight=32;
            //aPressed.visible=false;
            ui.perdre();
            me.aPressed=false;
        }

        if (this.iPressed)
        {
            let me = this;
            me.infCtrl.visible=true;
            me.infCtrl.x=me.player.x-50;
            me.infCtrl.y=me.player.y;
            me.tweens.add({
                targets:me.infCtrl,
                duration:0,
                displayHeight:
                {
                    from:400,
                    to:400,
                },
                displayWidth:
                {
                    from:400,
                    to:400,
                },
                onComplete: function () 
                {
                    me.infCtrl.visible=false;
                    //onComplete();
                }
            })
            console.log("infos ctrl affichées");
        }

        if (this.ControlPressed)
        {
            //this.cleanStorage();
            localStorage.removeItem("checkPoint");
            //localStorage.removeItem("bougie");
        }

        // ---------------------------------------- Drop d'objet (ou de monstre...) ----------------------------------------

        if (this.vaseDrope)
        {
            /*let me = this;
            console.log("DEBUG  DEBUG   DEBUG");
            me.vaseDrope=new MonsterZombie(this,this.player.x+20,this.player.y+24,"zombie2").setDepth(996);
            me.player.setVelocityX(120);*/
            //ElementVase.current.broken = false;
            //ElementVase.current.debugVaseDrop = true;
            //me.vaseDrope = false;
            
            // Certains paramètres déjà définis doivent de nouveau l'être ici : déplacements, vitesse, collisions...
            if (this.oneDrope)
            {
                let me = this;
                console.log("oneDrope");

                me.vaseDrope=new MonsterZombie(this,this.player.x+150,this.player.y+24,"zombie2").setDepth(996);
                me.physics.add.collider(me.vaseDrope, this.solides);
                me.physics.add.collider(me.vaseDrope, this.platforms6);
                //me.player.setVelocityX(120);

                while(this.oneDrope)
                {
                    this.oneDrope = false;
                    return;
                }
                me.vaseDrope = false;
            }
            if(this.vaseDrope.body)
            {
                let me = this;
                if(me.vaseDrope.body.velocity.x < 0)
                {
                    me.vaseDrope.flipX=true;
                    if(this.walking)
                    {
                        this.vaseDrope.setVelocityX(-40*(Math.random()+1.5));
                        this.walking = false;
                    }
                }
                else
                {
                    me.vaseDrope.flipX=false;
                    if(!this.walking)
                    {
                        this.vaseDrope.setVelocityX(40*(Math.random()+1.5));
                        this.walking = true;
                    }
                }
            }
            //me.vaseDrope.rotation = Phaser.Math.Between(0,6);
        }
    }

    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    saigne(object,onComplete)
    {
        let me=this;
        me.blood.visible=true;
        me.blood.rotation = Phaser.Math.Between(0,6);
        me.blood.x=object.x;
        me.blood.y=object.y;
        me.tweens.add({
            targets:me.blood,
            duration:200,
            displayHeight:
            {
                from:40,
                to:70,
            },
            displayWidth:
            {
                from:40,
                to:70,
            },
            onComplete: function () 
            {
                me.blood.visible=false;
                onComplete();
            }
        })
    }

    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'animation est finie
     */
    saignePlayer(object,onComplete)
    {
        let me=this;
        me.blood2.visible=true;
        me.blood2.rotation = Phaser.Math.Between(0,6);
        me.blood2.x=object.x;
        me.blood2.y=object.y;
        me.tweens.add(
            {
            targets:me.blood2,
            duration:200,
            displayHeight:
            {
                from:40,
                to:70,
            },
            displayWidth:
            {
                from:40,
                to:70,
            },
            onComplete: function () 
            {
                me.blood2.visible=false;
                onComplete();
            }
        })
    } // FIN DE SAIGNEPLAYER

    /**
     *
     * @param {Sprite} object Objet qui saigne
     * @param {function} onComplete Fonction à appeler quand l'animation est finie
     */
    vaseBroke(object) //,onComplete)
    {
        let me=this;
        me.broke.visible=true;
        me.broke.rotation = Phaser.Math.Between(0,6);
        me.broke.x=object.x;
        me.broke.y=object.y;
        
    } // FIN DE VASEBROKE 

    ramasserEtoile (player, star)
    {
        star.disableBody(true, true);
        star.emit("disabled");
        ui.gagne();
        this.music = this.sound.add('os');

        var musicConfig = 
        {
            mute: false,
            volume: 0.3,
            rate : 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay:0,
        }
        this.music.play(musicConfig);

        //va lister tous les objets de la scène pour trouver les étoies et vérifier si elles sont actives
        /*
        let totalActive=0;
        for(let child of this.children.getChildren()){
            if(child.texture && child.texture.key==="star"){
                if(child.active){
                    totalActive++;
                }
            }
        }
        if(totalActive===0){
            this.win();
        }
        */
    }

    /**
     * Quand on dépasse un monstre
     * il se tourne vers nous
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     *//*
    monsterMove(player, monster)
    {       
        //let me=this;
        this.player.body.position.x = playerX;
        this.player.position.x = playerX;
        this.player.x = playerX;
        this.monster.body.position.x = monsterX;
        this.monster.position.x = monsterX;
        this.monster.x = monsterX;

        if (playerX < monsterX)
        {
            if(monster.VelocityX < 0)
            {
                monster.flipX = true;
                monster.setVelocityX = -100;
            }
            else
            {
                monster.flipX = true;
                monster.setVelocityX = -100;//-100;
            }
        } 
        else if (playerX > monsterX)
        {
            if(monster.VelocityX > 0)
            {
                monster.flipX = false;
                monster.setVelocityX = 100;
            }
            else
            {
                monster.flipX = true;
                monster.setVelocityX = 100;//-100;
            }
        }
    }*/

    /**
     * Aïeee ça fait mal
     * @param player
     * @param spike
     */
    hitSpike (player, spike)
    {
        this.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        this.scene.restart();

    }


    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     *//*
    hitMonster(player, monster)
    {
        let me=this;
        if(monster.isDead !== true)
        { //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y > 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30
                // si le monstre n'est pas immobile
                //&& monster.VelocityX != 0
            ){
                ui.gagne();
                monster.isDead=true; //ok le monstre est mort
                monster.disableBody(true,true);//plus de collisions
                this.walking = false;

                this.saigne(monster,function(){
                    //effets déclenchés à la fin de l'animation :)
                })

                //petit son de mort du monstre
                this.music = this.sound.add('splash');

                var musicConfig = 
                {
                    mute: false,
                    volume: 0.3,
                    rate : 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay:0,
                }
                this.music.play(musicConfig);

                //notre joueur rebondit sur le monstre
                player.directionY=500;
            }
            else
            {
                //le joueur est mort
                me.playerDie();
            }
        }
    }// FIN DE HITMONSTER*/

    
    hitMonster(player, monster)
    {
        let me=this;

        //this.blood2.setDepth(996);
        if(monster.isDead !== true)
        { //si notre monstre n'est pas déjà mort
            if(
                // si le player descend
                player.body.velocity.y >= 0
                // et si le bas du player est plus haut que le monstre
                && player.getBounds().bottom < monster.getBounds().top+30

            ){
                ui.gagne();
                //monster.body.enable = false // Invulnérabilité temporaire
                monster.isDead=true; //ok le monstre est mort
                monster.disableBody(true,true);//plus de collisions

                this.saigne(monster,function()
                {
                    //effets déclenchés à la fin de l'animation :)
                })

                //petit son de mort du monstre
                this.music = this.sound.add('splash');

                var musicConfig = 
                {
                    mute: false,
                    volume: 0.3,
                    rate : 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay:0,
                }
                this.music.play(musicConfig);

                player.directionY=500;

            } 
            else
            {
                me.playerDamage();
            }
        }
    }

    playerDamage(player,hp)
    {
        // Le joueur est blessé
        let me = this;
        if(this.lifePoints>=2)
        {
            ui.losePV();
            me.invincible();
            me.lifePoints -= 1;
            console.log('damage');
            console.log(this.lifePoints);
            me.InfosLifePoints();
            console.log('postInfos');
        }
        // Le joueur est mort
        else if (this.lifePoints<2) 
        {
            console.log('DEAD');
            if (!me.player.isDead) 
            {
                this.blood2.setDepth(1000);
                me.player.isDead = true;
                me.player.visible = false;
                // ça saigne...
                me.saignePlayer(me.player, function () 
                {
                    // à la fin de la petite anim, on relance le jeu
                    me.blood2.visible = false;
                    me.player.anims.play('turn');
                    me.player.isDead = false;
                    me.scene.restart();
                    console.log('saigneFini');
                })
                this.music = this.sound.add('crack');
    
                var musicConfig = 
                {
                    mute: false,
                    volume: 0.3,
                    rate : 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay:0,
                }
                this.music.play(musicConfig);
    
                localStorage.removeItem("bougie");
                console.log('removedBougie');
                //this.song.stop();
                //this.verif=1;
                //this.verifTP=1;
                me.scene.restart();

            }
            this.lifePoints=3;
            console.log('lifePoints = 3');
        }

    }
 
    // Player invulnérable mais immobile
    invincible(){
        this.player.body.enable = false;
        this.time.addEvent({
            delay: 1000,
            callback: ()=>{
                this.player.body.enable = true;
            },
            loop: false
        })
    }


    /**
     * Tue le player
     * - le rend invisible
     * - fait apparaitre du sang
     * - ressuscite le player
     * - redémarre le tableau
     */
    
    /*
    playerDie(player,hp)
    {
        let me=this;
        if(!me.player.isDead) 
        {
            ui.perdre1();
            ui.losePV();
            if(this.hp != 0)
            {
                me.saignePlayer(me.player, function () 
                {
                    //à la fin de la petite anim, on relance le jeu
                    me.blood2.visible = false;
                    me.player.anims.play('turn');
                    //player.directionX= -100;
                    //me.scene.restart();
                })
            }
            else
            {
                me.player.isDead = true;
                me.player.visible = false;
                //ça saigne...
                me.saignePlayer(me.player, function () 
                {
                    //à la fin de la petite anim, on relance le jeu
                    me.blood2.visible = false;
                    me.player.anims.play('turn');
                    me.player.isDead = false;
                    me.scene.restart();
                })
                this.music = this.sound.add('crack');
    
                var musicConfig = 
                {
                    mute: false,
                    volume: 0.3,
                    rate : 1,
                    detune: 0,
                    seek: 0,
                    loop: false,
                    delay:0,
                }
                this.music.play(musicConfig);
    
                localStorage.removeItem("bougie");
            }

        }
    }*/

    /**
     * Pour reset cette scène proprement
     * @private
     */
    _destroy(bougieName)
    {
        this.player.stop();
        this.scene.stop();
        //localStorage.removeItem("bougie", bougieName);
    }

    /**
     * Pour reset le localStorage
     * @private
     */
    cleanStorage(bougieName)
    {
        localStorage.removeItem("bougie", bougieName);
    }

    /**
     * Quand on a gagné
     */
    win()
    {
        console.log("Victory");
        localStorage.removeItem("checkPoint");
        Tableau.suivant();
    }

    /**
     * Va au tableau suivant
     */
    static suivant()
    {
        let ceSeraLaSuivante=false;
        let nextScene=null;
        if(Tableau.current)
        {
            for(let sc of game.scene.scenes)
            {
                if(sc.scene.key !== "ui")
                {
                    if(!nextScene)
                    {
                        if(ceSeraLaSuivante)
                        {
                            nextScene=sc;
                        }
                        if(sc.scene.key === Tableau.current.scene.key)
                        {
                            ceSeraLaSuivante=true;
                        }
                    }
                }
            }
        }
        if(!nextScene)
        {
            nextScene = game.scene.scenes[0];
        }
        Tableau.goTableau(nextScene);
    }

    static goTableau(tableau)
    {
        if(Tableau.current)
        {
            Tableau.current._destroy();
        }
        game.scene.start(tableau);
    }


}

/**
 * Le tableau en cours
 * @type {null|Tableau}
 */
Tableau.current=null;