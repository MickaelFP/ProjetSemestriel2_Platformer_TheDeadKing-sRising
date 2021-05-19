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

        // ----------------------------------- Données primaires indispensable au tabbleau -----------------------------------

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

        this.auraDamage = this.add.pointlight(this.player.x, this.player.y, 0, 2000, 0.02);
        this.auraDamage.setDepth(999);
        this.auraDamage.attenuation = 0.1;
        this.auraDamage.color.setTo(354, 10, 10);
        this.auraDamage.visible=false;

        this.auraHeal = this.add.pointlight(this.player.x, this.player.y, 0, 2000, 0.02);
        this.auraHeal.setDepth(999);
        this.auraHeal.attenuation = 0.1;
        this.auraHeal.color.setTo(0, 255, 0);
        this.auraHeal.visible=false;

        //this.boxRenderPlayer = new ObjetBoxRenderPlayer(this,this.player.x, this.player.y);

        this.pv3=this.add.sprite(90, 100, "hp3");
        this.pv3.setDepth(1000);
        this.pv3.setScrollFactor(0);

        ui._hpText.setText('Status : ');

        this.shoot = new ElementProjectils(this,0+8600,0+4448);
        this.monsterOfVase = new MonsterZombie(this,0+8600,0+4448).setVelocity(0,0);


        // ----------------------------------- fonction en booleans d'affichage d'image -----------------------------------

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


        // ----------------------------------- booleans simples que l'on compte utiliser -----------------------------------

        this.aPressed = false;
        this.oneShootOnly = true;
        this.youCanDestroyIt = false;
        //this.projectilDestroyed = false;

        this.iPressed=false;
        this.showInfos=false;

        this.ControlPressed=false;

        this.ePressed = false;
        this.oneHeal = false;
        this.startAuraHeal = false;

        this.dPressed = false;
        this.dashEffect = true;
        this.timerDash = true;

        this.arrowRightPressed = false;
        this.arrowLefttPressed = false;
        this.playerMoveStop = false;
        //this.contactSolides = false;

        this.arrowUpPressed = false;
        this.jumpStop = false;
        this.timingJump = true;
        this.stopTomber = false;
        
        this.arrowDownPressed = false;
        this.tJArrowDownPressed = false;

        this.vaseDrope=false;
        this.oneDrope=false;
        this.oneDropePower=false;

        this.invicibleForEver = false;
        this.startAuraDmg = false;

        this.destructionTorcheLight = false;
        //this.torcheContact = false;
        //this.oneTorche = false;

        //this.zombieAlive = true;
        this.walking = true;

        this.antiBug = true;

    }



    // ********************************* Gestionnaire de l'affichage des points de vies *********************************

    InfosLifePoints()
    {
        if(this.lifePoints == 2)
        {
            this.pv2=this.add.sprite(90, 100, "hp2");
            this.pv2.setDepth(1000);
            this.pv2.setScrollFactor(0);
            this.pv3.destroy();
            //console.log("InfosLifePoints() -> hp2");
        }
        if(this.lifePoints == 1)
        {
            this.pv1=this.add.sprite(90, 100, "hp1");
            this.pv1.setDepth(1000);
            this.pv1.setScrollFactor(0);
            this.pv2.destroy();
            //console.log("InfosLifePoints() -> hp1");
        }
        if(this.lifePoints == 0)
        {
            this.pv0=this.add.sprite(90, 100, "hp0");
            this.pv0.setDepth(1000);
            this.pv0.setScrollFactor(0);
            this.pv1.destroy();
            //console.log("InfosLifePoints() -> hp0");
        }
    }
    InfosLifePoints2()
    {
        if(this.lifePoints == 3)
        {
            this.pv3=this.add.sprite(90, 100, "hp3");
            this.pv3.setDepth(1000);
            this.pv3.setScrollFactor(0);
            this.pv2.destroy();
            //console.log("InfosLifePoints2() -> hp3");
        }
        if(this.lifePoints == 2)
        {
            this.pv2=this.add.sprite(90, 100, "hp2");
            this.pv2.setDepth(1000);
            this.pv2.setScrollFactor(0);
            this.pv1.destroy();
            //console.log("InfosLifePoints2() -> hp2");
        }
    }

    // ********************************* Exécutable de fonction et de variables à chaques frames *********************************

    /**
     *
     * @param {function} onComplete Fonction à appeler quand l'anim est finie
     */
    update(monster, player, onComplete)
    {
        super.update();
        this.player.update(); 
        this.shoot.update();
        this.monsterOfVase.update();
        //this.boxRenderPlayer.update();

        //this.shoot.move();
        //this.contact = false ;
        //this.jumpStop = false;

        // ----------------------------------- Effets pour chaques touches configurées -----------------------------------

        this.throwBones();
        this.showInfoCtrl();
        this.playerHealing();
        this.dash();
        this.clearCheckPoints(); 

        // ------------------------------

        this.vaseDropping();
        this.auraEffect();

        /*this.physics.add.overlap(this.player, this.solides, function(player, solides)
        {
            this.jumping = false;
        }, null, this);*/

        if(this.stopTomber && this.player.body.blocked.down)
        {
            this.player.directionX=0;
            this.stopTomber = false;
        }

        // ----------------------------------- Drop d'objet (ou de monstre...) -----------------------------------
        
        //if(this.monsterOfVase.body)
        //{
            this.physics.add.overlap(this.monsterOfVase, this.shoot, function(monsterOfVase, shoot)
            {
                //if(this.monsterOfVase.body)
                //{
                    this.destroyProjectil();
                    //console.log("Debug Debug Debug Debug Debug Debug Debug");
                //}
            }, null, this);
        //}

    } // FIN DE UPDATE


    auraEffect()
    {
        if(this.startAuraDmg)
        {
            this.auraDamage.setPosition(this.player.x, this.player.y);
            this.auraDamage.visible=true;
        }
        else if(!this.startAuraDmg)
        {
            this.auraDamage.setPosition(this.player.x, this.player.y);
            this.auraDamage.visible=false;
        }

        if(this.startAuraHeal)
        {
            this.auraHeal.setPosition(this.player.x, this.player.y);
            this.auraHeal.visible=true;
        }
        else if(!this.startAuraHeal)
        {
            this.auraHeal.setPosition(this.player.x, this.player.y);
            this.auraHeal.visible=false;
        }
    }


    timingJumping()
    {
        //console.log("Tableau.current -> timingJump = false");
        this.time.addEvent
        ({
            delay: 1000,
            callback: ()=>
            {
                this.timingJump = true;
                //console.log("Tableau.current -> timingJump = true");
            },
            loop: false
        })
    } // FIN DE timingJumping()

    tJAfterPressArrowDown()
    {
        this.jumpStop = true;
        this.tJArrowDownPressed = true;
        this.time.addEvent
        ({
            delay: 1000,
            callback: ()=>
            {
                this.tJArrowDownPressed = false;
                this.jumpStop = false;
                //console.log("Tableau.current -> tJAfterPressArrowDown = true");
            },
            loop: false
        })
    } // FIN DE tJAfterPressArrowDown()

    vaseDropping()
    {
        //this.monsterOfVase.update();
        if (this.vaseDrope)
        {      
            // Certains paramètres déjà définis doivent de nouveau l'être ici : collisions...
            if (this.oneDrope)
            {
                let me = this;
                console.log("oneDrope");

                me.monsterOfVase=new MonsterZombie(this,this.player.x+150,this.player.y+24,"zombie2").setDepth(996);
                me.physics.add.collider(me.monsterOfVase, this.solides);
                me.physics.add.collider(me.monsterOfVase, this.platforms6);

                if(!me.monsterOfVase.isDead)
                {                
                    this.time.addEvent
                    ({
                        delay: 5000,
                        callback: ()=>
                        {
                            this.monsterOfVase.isDead = true;
                            this.monsterOfVase.disableBody(true,true);
                            //console.log("monsterOfVase is dead !!!");

                            this.saigne(me.monsterOfVase,function(){})
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

                        },
                        loop: false
                    })
                }


                while(this.oneDrope)
                {
                    this.oneDrope = false;
                    return;
                }
                me.vaseDrope = false;
            }
        }
    }


    dash(player)
    {
        //this.boxRenderPlayerX = -(this.boxRenderPlayer.x - this.solides.body.x);
        //this.boxRenderPlayerY = -(this.boxRenderPlayer.y - this.solides.body.y);

        if(this.dashEffect)
        {
            if(this.dPressed && this.timerDash)
            {
                if(this.arrowRightPressed && !this.arrowUpPressed)
                {
                    console.log("dashing");
                    this.invincible();
                    //this.player.setPosition(this.player.x+3, this.player.y);
                    this.player.setVelocityX(800);
                    this.time.addEvent
                    ({
                        delay: 200,
                        callback: ()=>
                        {
                            this.timerDash = false;
                            this.player.setVelocityX(160);
                        },
                        loop: false
                    })
                }
                if(this.arrowLeftPressed && !this.arrowUpPressed)
                {
                    console.log("dashing");
                    this.timerDash = false;
                    this.invincible();
                    //this.player.setPosition(this.player.x-3, this.player.y);
                    this.player.setVelocityX(-800);
                    this.time.addEvent
                    ({
                        delay: 200,
                        callback: ()=>
                        {
                            this.player.setVelocityX(-160);
                            this.timerDash = true;
                        },
                        loop: false
                    })
                }
                if(this.arrowRightPressed && this.arrowUpPressed)
                {
                    console.log("dashing");
                    this.timerDash = false;
                    this.invincible();
                    this.player.setPosition(this.player.x+3, this.player.y-1);
                    this.player.setVelocityX(800);
                    this.player.setVelocityY(-500);
                    this.time.addEvent
                    ({
                        delay: 200,
                        callback: ()=>
                        {
                            this.player.setVelocityX(160);
                            this.player.setVelocityY(0);
                            this.timerDash = true;
                        },
                        loop: false
                    })
                }
                if(this.arrowLeftPressed && this.arrowUpPressed)
                {
                    console.log("dashing");
                    this.timerDash = false;
                    this.invincible();
                    this.player.setPosition(this.player.x-3, this.player.y-1);
                    this.player.setVelocityX(-800);
                    this.player.setVelocityY(-500);
                    this.time.addEvent
                    ({
                        delay: 200,
                        callback: ()=>
                        {
                            this.player.setVelocityX(-160);
                            this.player.setVelocityY(0);
                            this.timerDash = true;
                        },
                        loop: false
                    })
                }
                else
                {
                    this.timerDash = true;
                }
            }
        }
 
    }


    clearCheckPoints()
    {
        if (this.ControlPressed)
        {
            localStorage.removeItem("checkPoint");
        }
    }


    showInfoCtrl()
    {
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
            //console.log("infos ctrl affichées");
        }
    } // FIN DE SHOWINFOCTRL


    throwBones()
    {
        if (this.aPressed && this.oneShootOnly)
        {
            let me = this;

            me.oneShootOnly = false;
            me.shoot=new ElementProjectils(this,this.player.x +30,this.player.y-30,"ossement").setDepth(996);
            me.physics.add.collider(this.solides, this.shoot);

            if(this.arrowRightPressed)
            {
                //console.log("me.shoot.setVelocity +++");
                me.shoot.setVelocity(240, -200);//(240, -350);
            }
            if(this.arrowLeftPressed)
            {
                //console.log("me.shoot.setVelocity ---");
                me.shoot.setVelocity(-240, -200);//(-240, -350);
            }

            this.destroyProjectil2();

            /*me.physics.add.collider(this.plateform, this.aPressed);
            me.physics.add.collider(this.plateform2, this.aPressed);
            me.physics.add.collider(this.plateform3, this.aPressed);
            me.physics.add.collider(this.plateform4, this.aPressed);
            me.physics.add.collider(this.plateform5, this.aPressed);
            me.physics.add.collider(this.plateform6, this.aPressed);*/

            ui.perdre();
            me.aPressed=false;
        }
    } // FIN DE THROWBONES

    // ********************************* Gestionnaire des effets déclenchés à la mort d'un monstre *********************************

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
    } // FIN DE SAIGNE


    // ********************************* Gestionnaire des effets déclenchés à la mort du joueur *********************************
    //
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


    // ********************************* Gestionnaire des effets déclenchés à la destruction d'un vase *********************************
    //
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


    // ********************************* Gestionnaire de collectibilité des ossements (score) *********************************
    //
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
    } // FIN DE RAMASSERETOILE


    // ********************************* Tentative de déplacement d'un monstre en fonction des coordonées du joueur *********************************
    //
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

    } // FIN DE HITSPIKE


    /**
     * Quand on touche un monstre
     * si on le touche par en haut on le tue, sinon c'est lui qui nous tue
     * @param {Player} player
     * @param {Phaser.Physics.Arcade.Sprite} monster
     */
    hitMonster(player, monster)
    {
        if(!this.invicibleForEver)
        {
            let me=this;

            //this.blood2.setDepth(996);
            if(monster.isDead !== true)
            { //si notre monstre n'est pas déjà mort
                if(player.body.velocity.y >= 0 && player.getBounds().bottom < monster.getBounds().top+30)
                {
                    ui.gagne1();
                    //monster.body.enable = false // Invulnérabilité temporaire
                    monster.isDead=true; //ok le monstre est mort
                    //console.log("hitMonster() -> monster.isDead=true")
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
    } // FIN DE HITMONSTER


    playerDamage(player,hp)
    {
        // Le joueur est blessé
        let me = this;
        if(this.lifePoints>=2)
        {
            ui.perdre1();
            ui.losePV();
            this.shakeCameras();
            me.invincible();
            me.lifePoints -= 1;
            //console.log('playerDamage(player,hp) -> damage');
            console.log(this.lifePoints);
            me.InfosLifePoints();
            //console.log('playerDamage(player,hp) -> postInfos');
        }
        // Le joueur est mort
        else if (this.lifePoints<2) 
        {
            //console.log('playerDamage(player,hp) -> DEAD');
            if (!me.player.isDead) 
            {
                ui.perdre2();
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
                    //console.log('playerDamage(player,hp) -> saigneFini');
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
    
                this.cleanStorage();
                //this.song.stop();
                me.scene.restart();

            }
            this.lifePoints=3;
            //console.log('playerDamage(player,hp) -> lifePoints = 3');
        }
    } // FIN DE PLAYERDAMAGE


    playerHealing()
    {
        let me = this;
        if(this.ePressed)
        {
            if(this.lifePoints<=2 && this.oneHeal == false && ui.score >= 20)
            {
                ui.perdre1();
                ui.gagnePV();
                this.shakeCamerasMini();
                me.lifePoints += 1;
                //console.log('playerHealing() -> heal');
                //console.log(this.lifePoints);
                me.InfosLifePoints2();
                this.oneHeal = true;
            }
        }

    } // FIN DE PLAYERHEALING


    shakeCamerasMini()
    {
        //console.log('shakeCamerasMini() -> shakeCameras');
        this.startingHealAura();
        this.cameras.main.shake(1000, 0.001);
    }
    shakeCameras()
    {
        //console.log('shakeCameras() -> shakeCameras');
        this.startingDmgAura();
        this.cameras.main.shake(500, 0.005);
    }
    shakeCamerasM()
    {
        //console.log('shakeCamerasM() -> shakeCamerasM');
        this.startingDmgAura();
        this.cameras.main.shake(500, 0.005);

    } // FIN DES SHAKECAMERAS
    

    startingDmgAura()
    {
        this.startAuraDmg = true;
        this.time.addEvent
        ({
            delay: 500,
            callback: ()=>
            {
                this.startAuraDmg = false;
            },
            loop: false
        })
    }
    startingHealAura()
    {
        this.startAuraHeal= true;
        this.time.addEvent
        ({
            delay: 500,
            callback: ()=>
            {
                this.startAuraHeal = false;
            },
            loop: false
        })
    }


    // ********************************* Rend le player invulnérable *********************************
    //
    // pour un évènement à durée courte
    invincible()
    {
        console.log("invincible");

        this.invicibleForEver = true;
        this.zombieAlive = false;
        this.time.addEvent
        ({
            delay: 1000,
            callback: ()=>
            {
                this.startAuraDmg = false;
                this.invicibleForEver = false;
                this.zombieAlive = true;
                //console.log("vulnerable");
            },
            loop: false
        })
    }
    // pour un évènement à durée moyenne
    invincibleM()
    {
        //console.log("invincibleM");
        this.invicibleForEver = true;
        this.zombieAlive = false;
        this.time.addEvent
        ({
            delay: 4000,
            callback: ()=>
            {
                this.invicibleForEver = false;
                this.zombieAlive = true;
                //console.log("vulnerableM");
            },
            loop: false
        })
    }
    // *********************************


    JumpRetomber()
    {
        if(!this.player.body.blocked.down)// || Tableau.player.body.touching.down)
        {
            //console.log("jumping = true");
            this.stopTomber = true;
        }
        else
        {
            this.player.directionX=0;
        }
    } // FIN DE JUMPRETOMBER


    // ********************************* Confirme la destruction du projectil après un délai prédéfini *********************************
    //
    // Instantanément
    destroyProjectil()
    {
        //this.projectilDestroyed = true;
        //this.shoot.move();
        //console.log("destroyProjectil addEvent");
        this.time.addEvent
        ({
            delay: 0,//1500,
            callback: ()=>
            {
                //this.shoot.stop();
                this.youCanDestroyIt = true;
                //console.log("youCanDestroyIt = true");
            },
            loop: false
        })
    }
    // Après un lapse de temps
    destroyProjectil2()
    {
        this.time.addEvent
        ({
            delay: 1500,
            callback: ()=>
            {
                this.youCanDestroyIt = true;
            },
            loop: false
        })
    }
    // *********************************


    /**
     * Tue le player
     * - le rend invisible
     * - fait apparaitre du sang
     * - ressuscite le player
     * - redémarre le tableau
     */  /*
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
    _destroy()
    {
        console.log("destroy");
        this.player.stop();
        this.scene.stop();
    }

    /**
     * Pour reset le localStorage
     * @private
     */
    cleanStorage()
    {
        console.log("cleanStorage");
        localStorage.removeItem("bougie"); // ,bougieName);
        localStorage.removeItem("bougie1"); // ,bougie1Name);
        localStorage.removeItem("bougie2");
        localStorage.removeItem("bougie3");
        localStorage.removeItem("torche");
        localStorage.removeItem("torche1");
        localStorage.removeItem("torche2");
        localStorage.removeItem("torche3");
        localStorage.removeItem("torche4");
        localStorage.removeItem("torche5");
        localStorage.removeItem("torche6");
        localStorage.removeItem("torche7");
        localStorage.removeItem("torche8");
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