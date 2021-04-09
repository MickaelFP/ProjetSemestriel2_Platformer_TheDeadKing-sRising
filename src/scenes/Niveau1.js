class Niveau1 extends Tableau
{
    constructor()
    {
        super("Cemetary");
    }

    preload() 
    {
        super.preload();

        // ------pour TILED-------------
        // nos images principales
        this.load.image('star', 'assets/Os.png');
        this.load.image('os', 'assets/os.png');
        this.load.image('platformStone', 'assets/platformStone.png');
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTilesetCimetiere.png');

        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiledCimetiereDbug.json'); // original -> 'tableauTiled.json' & 2nd 'MapTiledLongueur.json'

        // -----Decors-------------
        this.load.image('night', 'assets/nuitEtoileCarre_4.png');
        this.load.image('night1', 'assets/aurore2.png');//nuitEtoileCarre_5
        this.load.image('chateauLoin', 'assets/chateauLoin_x896_2.png');
        this.load.image('grilleHerbe', 'assets/grille_x896_2.png');
        this.load.image('colines', 'assets/colinesForet_x896.png');
        this.load.image('ombresTombes', 'assets/ombresTombes_x896_2.png');
        this.load.image('checkPoint', 'assets/checkPoint.png');

        // -----Elements interactifs-------------
        this.load.image('vase', 'assets/vase2.png');

        // -----Monstres-------------
        this.load.image('monster-fly', 'assets/chauve-souris.png'); // original 'monster-fly'
        this.load.image('bossSpectre', 'assets/bossSpectre_Remastered.png');

        this.load.spritesheet('zombie2', 'assets/Spritesheet/zombie2.png', { frameWidth: 32, frameHeight: 48 } );        

        // -----Particules-------------
        this.load.image('feuille1', 'assets/particles/animation_feuille_1.png');
        this.load.image('feuille2', 'assets/particles/animation_feuille_2.png');
        this.load.image('feuille3', 'assets/particles/animation_feuille_3.png');
        this.load.image('fog', 'assets/particles/animation_fog_1.png');
        //this.load.image('vent', 'assets/Animation_vent_1.png');

        // -----Effets-------------
        this.load.image('light', 'assets/light.png');

        // -----Sons-------------
        this.load.audio('brkkk', 'assets/Sound/broke_sound.mp3');
        this.load.audio('welcome', 'assets/Sound/Piano_Sonata_no_14.mp3');
        this.load.audio('AmbianceHalloween1', 'assets/Sound/Ambiance_halloween_1.mp3');
 
        // -----Atlas de texture généré avec https://free-tex-packer.com/app/ -------------
        //on y trouve notre étoiles et une tête de mort
        this.load.atlas('particles', 'assets/particles/particlesM.png', 'assets/particles/particles.json'); // original 'particles.png'
    }
    create() 
    {
        super.create();

        /********** POUR COUPER LES MUSIQUES PRECEDENTE **********
        
        this.game.sound.stopAll();
        */
        this.musicAmb = this.sound.add('AmbianceHalloween1');

        var musicConfig = 
        {
            mute: false,
            volume: 0.5,
            rate : 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay:0,
        }
        this.musicAmb.play(musicConfig);

        //on en aura besoin...
        let ici=this;
        let hauteurSol = 64;
        let hauteurDif = 448;

        //------------------------ chargement de la tile map & configuration de la scène ------------------------

        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tableauTiledTilesetCimetiere', 'tiles'); // original 'tableauTiledTilset'

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //------------------------ ajoute les plateformes simples ------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        //this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        //this.devant = this.map.createLayer('devant', this.tileset, 0, 0);

        // plateformes columbariums
        let plate1=this.physics.add.sprite(200,293+hauteurDif); // ,"platformStone");
        plate1.setDisplaySize(113,7);
        plate1.setOrigin(0,0); // pour positionner plus facilement
        plate1.body.allowGravity=0; // la gravité n'a pas d'effet ici
        plate1.setImmovable(true); // ne bouge pas quand on rentre dedans
        plate1.refreshBody();

        let plate2=this.physics.add.sprite(776,293+hauteurDif);
        plate2.setDisplaySize(113,7);
        plate2.setOrigin(0,0);
        plate2.body.allowGravity=0;
        plate2.setImmovable(true);
        plate2.refreshBody();

        let plate3=this.physics.add.sprite(1288,293+hauteurDif);
        plate3.setDisplaySize(113,7);
        plate3.setOrigin(0,0);
        plate3.body.allowGravity=0;
        plate3.setImmovable(true);
        plate3.refreshBody();

        let plate4=this.physics.add.sprite(1864,293+hauteurDif);
        plate4.setDisplaySize(113,7);
        plate4.setOrigin(0,0);
        plate4.body.allowGravity=0;
        plate4.setImmovable(true);
        plate4.refreshBody();

        let plate5=this.physics.add.sprite(2312,293+hauteurDif);
        plate5.setDisplaySize(113,7);
        plate5.setOrigin(0,0);
        plate5.body.allowGravity=0;
        plate5.setImmovable(true);
        plate5.refreshBody();

        let plate6=this.physics.add.sprite(2760,293+hauteurDif);
        plate6.setDisplaySize(113,7);
        plate6.setOrigin(0,0);
        plate6.body.allowGravity=0;
        plate6.setImmovable(true);
        plate6.refreshBody();

        let plate7=this.physics.add.sprite(3208,293+hauteurDif);
        plate7.setDisplaySize(113,7);
        plate7.setOrigin(0,0);
        plate7.body.allowGravity=0;
        plate7.setImmovable(true);
        plate7.refreshBody();

        let plate8=this.physics.add.sprite(3784,293+hauteurDif);
        plate8.setDisplaySize(113,7);
        plate8.setOrigin(0,0);
        plate8.body.allowGravity=0;
        plate8.setImmovable(true);
        plate8.refreshBody();

        let plate9=this.physics.add.sprite(4296,293+hauteurDif);
        plate9.setDisplaySize(113,7);
        plate9.setOrigin(0,0);
        plate9.body.allowGravity=0;
        plate9.setImmovable(true);
        plate9.refreshBody();

        let plate10=this.physics.add.sprite(4872,293+hauteurDif);
        plate10.setDisplaySize(113,7);
        plate10.setOrigin(0,0);
        plate10.body.allowGravity=0;
        plate10.setImmovable(true);
        plate10.refreshBody();

        let plate11=this.physics.add.sprite(5384,293+hauteurDif);
        plate11.setDisplaySize(113,7);
        plate11.setOrigin(0,0);
        plate11.body.allowGravity=0;
        plate11.setImmovable(true);
        plate11.refreshBody();

        let plate12=this.physics.add.sprite(5960,293+hauteurDif);
        plate12.setDisplaySize(113,7);
        plate12.setOrigin(0,0);
        plate12.body.allowGravity=0;
        plate12.setImmovable(true);
        plate12.refreshBody();

        let plate13=this.physics.add.sprite(7624,293+hauteurDif);
        plate13.setDisplaySize(113,7);
        plate13.setOrigin(0,0);
        plate13.body.allowGravity=0;
        plate13.setImmovable(true);
        plate13.refreshBody();

        let plate14=this.physics.add.sprite(8776,293+hauteurDif);
        plate14.setDisplaySize(113,7);
        plate14.setOrigin(0,0);
        plate14.body.allowGravity=0;
        plate14.setImmovable(true);
        plate14.refreshBody();

        // plateformes mausolés
        let plate15=this.physics.add.sprite(447,183+hauteurDif); // ,"platformStone");
        plate15.setDisplaySize(194,11);
        plate15.setOrigin(0,0); // pour positionner plus facilement
        plate15.body.allowGravity=0; // la gravité n'a pas d'effet ici
        plate15.setImmovable(true); // ne bouge pas quand on rentre dedans
        plate15.refreshBody();

        let plate16=this.physics.add.sprite(1535,183+hauteurDif);
        plate16.setDisplaySize(194,11);
        plate16.setOrigin(0,0);
        plate16.body.allowGravity=0;
        plate16.setImmovable(true);
        plate16.refreshBody();

        let plate17=this.physics.add.sprite(3455,183+hauteurDif);
        plate17.setDisplaySize(194,11);
        plate17.setOrigin(0,0);
        plate17.body.allowGravity=0;
        plate17.setImmovable(true);
        plate17.refreshBody();

        let plate18=this.physics.add.sprite(4031,183+hauteurDif);
        plate18.setDisplaySize(194,11);
        plate18.setOrigin(0,0);
        plate18.body.allowGravity=0;
        plate18.setImmovable(true);
        plate18.refreshBody();
        
        let plate19=this.physics.add.sprite(4543,183+hauteurDif);
        plate19.setDisplaySize(194,11);
        plate19.setOrigin(0,0);
        plate19.body.allowGravity=0;
        plate19.setImmovable(true);
        plate19.refreshBody();

        let plate20=this.physics.add.sprite(5631,183+hauteurDif);
        plate20.setDisplaySize(194,11);
        plate20.setOrigin(0,0);
        plate20.body.allowGravity=0;
        plate20.setImmovable(true);
        plate20.refreshBody();

        let plate21=this.physics.add.sprite(7871,183+hauteurDif);
        plate21.setDisplaySize(194,11);
        plate21.setOrigin(0,0);
        plate21.body.allowGravity=0;
        plate21.setImmovable(true);
        plate21.refreshBody();

        let plate22=this.physics.add.sprite(8191,183+hauteurDif);
        plate22.setDisplaySize(194,11);
        plate22.setOrigin(0,0);
        plate22.body.allowGravity=0;
        plate22.setImmovable(true);
        plate22.refreshBody();

        let plate23=this.physics.add.sprite(8511,183+hauteurDif);
        plate23.setDisplaySize(194,11);
        plate23.setOrigin(0,0);
        plate23.body.allowGravity=0;
        plate23.setImmovable(true);
        plate23.refreshBody();

        //------------------------ on définit les collisions, plusieurs méthodes existent: ------------------------

        // 1 La méthode que je préconise (il faut définir une propriété dans tiled pour que ça marche)
        //permet de travailler sur un seul layer dans tiled et des définir les collisions en fonction des graphiques
        //exemple ici https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
        this.solides.setCollisionByProperty({ collides: true });
        //this.lave.setCollisionByProperty({ collides: true });

        // 2 manière la plus simple (là où il y a des tiles ça collide et sinon non)
        //this.solides.setCollisionByExclusion(-1, true);
        //this.lave.setCollisionByExclusion(-1, true);

        // 3 Permet d'utiliser l'éditeur de collision de Tiled...mais ne semble pas marcher pas avec le moteur de physique ARCADE, donc oubliez cette option :(
        //this.map.setCollisionFromCollisionGroup(true,true,this.plateformesSimples);

        //------------------------ les étoiles (objets) ------------------------

        this.stars = this.physics.add.group(
        {
            allowGravity: true,
            immovable: false,
            bounceY:0
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => 
        {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x+32, starObject.y+32 , 'particles','star');
        });


        //------------------------ Les monstres (objets tiled) ------------------------

        //let fonction1 = this;

        this.monstersContainer=this.add.container();
        this.flyingMonstersObjects = this.map.getObjectLayer('flyingMonsters')['objects'];
        // On crée des montres volants pour chaque objet rencontré
        this.flyingMonstersObjects.forEach(monsterObject => 
        {
            let monster=new MonsterFly(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
        });

        this.zombiesObjects = this.map.getObjectLayer('zombies')['objects'];
        // On crée des zombies pour chaque objet rencontré
        this.zombiesObjects.forEach(monsterObject => 
        {
            let monster=new MonsterZombie(this,monsterObject.x,monsterObject.y-30);
            this.monstersContainer.add(monster);
            //this.physics.add.collider(monster, this.solides);
        });
        
        this.bossSpectreObjects = this.map.getObjectLayer('bossSpectre')['objects'];
        // On crée le boss
        this.bossSpectreObjects.forEach(monsterObject => 
        {
            let monster=new MonsterBossSpectre(this,monsterObject.x+7600,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
        });


         //------------------------ Les elements interactifs (objets tiled) ------------------------

        //this.ElementVaseContainer = this.add.container();
        this.vaseObjects = this.map.getObjectLayer('vase')['objects'];
        this.vaseObjects.forEach(monsterObject => 
        {
            let monster=new ElementVase(this,monsterObject.x+32,monsterObject.y);
            //this.ElementVaseContainer.add(monster);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
        });


        //------------------------ check point ------------------------

        this.checkPoints = this.physics.add.staticGroup();
        this.checkPointsObjects = this.map.getObjectLayer('checkPoints')['objects'];
        //on crée des checkpoints pour chaque objet rencontré
        this.checkPointsObjects.forEach(checkPointObject => 
        {
            //let point=this.checkPoints.create(checkPointObject.x,checkPointObject.y+432 ,"checkPoint"/*,"particles","death-white"*/).setOrigin(16.5,16.5);
            //point.scale = 0.03;
            //point.setBodySize(32,32);
            let point=this.checkPoints.create(checkPointObject.x,checkPointObject.y).setOrigin(0.5,1);
            point.blendMode=Phaser.BlendModes.COLOR_DODGE;
            point.checkPointObject=checkPointObject;


        });

        //------------------------ effet sur la lave (ou autre surface mortelle) ------------------------

        /*this.laveFxContainer=this.add.container();
        this.lave.forEachTile(function(tile){ //on boucle sur TOUTES les tiles de lave pour générer des particules
            if(tile.index !== -1){ //uniquement pour les tiles remplies

                /*
                //dé-commenter pour mieux comprendre ce qui se passe
                console.log("lave tile",tile.index,tile);
                let g=ici.add.graphics();
                laveFxContainer.add(g);
                g.setPosition(tile.pixelX,tile.pixelY)
                g.lineStyle(1,0xFF0000);
                g.strokeRect(0, 0, 64, 64);
                */

            /*    //on va créer des particules
                let props={
                    frame: [
                        //'star', //pour afficher aussi des étoiles
                        'death-white'
                    ],
                    frequency:200,
                    lifespan: 2000,
                    quantity:2,
                    x:{min:-32,max:32},
                    y:{min:-12,max:52},
                    tint:[  0xC11A05,0x883333,0xBB5500,0xFF7F27 ],
                    rotate: {min:-10,max:10},
                    speedX: { min: -10, max: 10 },
                    speedY: { min: -20, max: -30 },
                    scale: {start: 0, end: 1},
                    alpha: { start: 1, end: 0 },
                    blendMode: Phaser.BlendModes.ADD,
                };
                let props2={...props}; //copie props sans props 2
                props2.blendMode=Phaser.BlendModes.MULTIPLY; // un autre blend mode plus sombre

                //ok tout est prêt...ajoute notre objet graphique
                let laveParticles = ici.add.particles('particles');

                //ajoute le premier émetteur de particules
                laveParticles.createEmitter(props);
                //on ne va pas ajouter le second effet émetteur mobile car il consomme trop de ressources
                if(!ici.isMobile) {
                    laveParticles.createEmitter(props2); // ajoute le second
                }
                // positionne le tout au niveau de la tile
                laveParticles.x=tile.pixelX+32;
                laveParticles.y=tile.pixelY+32;
                ici.laveFxContainer.add(laveParticles);

                //optimisation (les particules sont invisibles et désactivées par défaut)
                //elles seront activées via update() et optimizeDisplay()
                laveParticles.pause();
                laveParticles.visible=false;
                //on définit un rectangle pour notre tile de particules qui nous servira plus tard
                laveParticles.rectangle=new Phaser.Geom.Rectangle(tile.pixelX,tile.pixelY,64,64);

            }

        })*/

        //------------------------ allez on se fait un peu la même en plus simple mais avec les étoiles ------------------------

        let starsFxContainer=ici.add.container();
        this.stars.children.iterate(function(etoile) 
        {
            let particles=ici.add.particles("particles","star");
            let emmiter=particles.createEmitter(
            {
                tint:[  0xFFFFFF,0xE8E8E8,0xDBDBDB,0xCCCCCC ], // original [  0xFF8800,0xFFFF00,0x88FF00,0x8800FF ]
                rotate: {min:0,max:360},
                scale: {start: 0.2, end: 0.2},
                alpha: { start: 1, end: 0 },
                blendMode: Phaser.BlendModes.ADD, //MULTIPLY
                //lifespan:3000,
                speed:40
            });
            etoile.on("disabled",function()
            {
                emmiter.on=false;
            })
            emmiter.startFollow(etoile);
            starsFxContainer.add(particles);
        });


        //------------------------ débug ------------------------
        
        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false)
        {
            debug.visible=false;
        }
        //débug solides en vers
        this.solides.renderDebug(debug,
        {
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });
        /*//debug lave en rouge
        this.lave.renderDebug(debug,{
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        }); */


        //------------------------ parallax ciel (rien de nouveau) ------------------------

        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night1'
        );
        this.sky2.setOrigin(0,0);
        this.sky2.setScrollFactor(0);
        this.sky2.blendMode=Phaser.BlendModes.ADD;

        this.sky3=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'chateauLoin'
        );
        this.sky3.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
        
        this.sky4=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'colines'
        );
        this.sky4.setScrollFactor(0);
        this.sky4.setOrigin(0,0);
        
        this.sky5=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'grilleHerbe'
        );
        this.sky5.setScrollFactor(0);
        this.sky5.setOrigin(0,0);

        this.skyDevant=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'ombresTombes'
        );
        this.skyDevant.setScrollFactor(0);
        this.skyDevant.setOrigin(0,0);


        //------------------------ sources lumineuses ------------------------

        //    grandes torches    //
        /*this.pointLight1 = this.add.pointlight(50, 770, (0, 0, 0), 100, 0.05, 0.15);
        this.pointLight1.color.r = 255;
        this.pointLight1.color.g = 50;
        this.pointLight1.color.b = 0;    

        this.pointLight1B = this.add.pointlight(50, 770, (0, 0, 0), 80, 0.05, 0.15);
        this.pointLight1B.color.r = 255;
        this.pointLight1B.color.g = 250;
        this.pointLight1B.color.b = 0;*/

        this.pointLight2 = this.add.pointlight(1075, 770, (0, 0, 0), 100, 0.05, 0.15);
        this.pointLight2.color.r = 255;
        this.pointLight2.color.g = 50;
        this.pointLight2.color.b = 0;

        this.pointLight2B = this.add.pointlight(1075, 770, (0, 0, 0), 80, 0.05, 0.15);
        this.pointLight2B.color.r = 255;
        this.pointLight2B.color.g = 250;
        this.pointLight2B.color.b = 0;
        
        this.pointLight3 = this.add.pointlight(1432, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight3.color.r = 255;
        this.pointLight3.color.g = 200;
        this.pointLight3.color.b = 0;

        this.pointLight4 = this.add.pointlight(1832, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight4.color.r = 255;
        this.pointLight4.color.g = 200;
        this.pointLight4.color.b = 0;

        this.pointLight5 = this.add.pointlight(3352, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight5.color.r = 255;
        this.pointLight5.color.g = 200;
        this.pointLight5.color.b = 0;

        this.pointLight6 = this.add.pointlight(3752, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight6.color.r = 255;
        this.pointLight6.color.g = 200;
        this.pointLight6.color.b = 0;

        this.pointLight7 = this.add.pointlight(3978, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight7.color.r = 255;
        this.pointLight7.color.g = 200;
        this.pointLight7.color.b = 0;

        this.pointLight8 = this.add.pointlight(4278, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight8.color.r = 255;
        this.pointLight8.color.g = 200;
        this.pointLight8.color.b = 0;

        this.pointLight9 = this.add.pointlight(4478, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight9.color.r = 255;
        this.pointLight9.color.g = 200;
        this.pointLight9.color.b = 0;

        this.pointLight10 = this.add.pointlight(4543, 770, (0, 0, 0), 100, 0.15, 0.1);
        this.pointLight10.color.r = 255;
        this.pointLight10.color.g = 200;
        this.pointLight10.color.b = 0;

        /*
        5631
        7871
        8191
        8511
        */
        // test
        let torche1 = this.add.pointlight(50, 770, 0, 200, 0.6) //game.config.width/2+60, game.config.height/2-160, 0, 200, 0.5);
        torche1.attenuation = 0.05;
        torche1.color.setTo(255, 200, 0);
        this.tweens.add(
        {
            targets:torche1,
            duration:4000,
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

        //    petites torches    //
        //
        this.pointLight11 = this.add.pointlight(470, 760, (0, 0, 0), 60, 0.05, 0.15);
        this.pointLight11.color.r = 255;
        this.pointLight11.color.g = 50;
        this.pointLight11.color.b = 0;

        this.pointLight12 = this.add.pointlight(470, 760, (0, 0, 0), 40, 0.05, 0.15);
        this.pointLight12.color.r = 255;
        this.pointLight12.color.g = 250;
        this.pointLight12.color.b = 0;
        //
        //
        this.pointLight13 = this.add.pointlight(620, 760, (0, 0, 0), 60, 0.05, 0.15);
        this.pointLight13.color.r = 255;
        this.pointLight13.color.g = 50;
        this.pointLight13.color.b = 0;

        this.pointLight14 = this.add.pointlight(620, 760, (0, 0, 0), 40, 0.05, 0.15);
        this.pointLight14.color.r = 255;
        this.pointLight14.color.g = 250;
        this.pointLight14.color.b = 0;
        //
        //

        //test
        let torche1B = this.add.pointlight(470, 760, 0, 50, 0.6) //game.config.width/2+60, game.config.height/2-160, 0, 200, 0.5);
        torche1B.attenuation = 0.05;
        torche1B.color.setTo(255, 50, 0);
        this.tweens.add(
        {
            targets:torche1B,
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


        //------------------------ Effets particules ------------------------

        //----- effets de feuilles -----
        this.particles1 = this.add.particles('feuille1');
        this.emitter = this.particles1.createEmitter(
        {
            x: -200, y: 600,
            speed: 10, //10
            moveToX: {min:100,max:1500},
            moveToY: {min:796,max:886},
            rotate: {min:-10,max:360},
            lifespan: 22500, //12500
            quantity: 1,
            frequency: 3000, //2000
            delay: 300,
            scale: { start: 0.6, end: 0.6 },
            blendMode: 'NORMAL', 
        });

        this.particles2 = this.add.particles('feuille2');
        this.emitter = this.particles2.createEmitter(
        {
            x: -200, y: 600,
            speed: 10,
            moveToX: {min:100,max:1500},
            moveToY: {min:600,max:886},
            rotate: {min:-10,max:360},
            lifespan: 22500,
            quantity: 1,
            frequency: 3000,
            delay: 1500,
            scale: { start: 0.6, end: 0.6 },
            blendMode: 'NORMAL', 
        });

        this.particles3 = this.add.particles('feuille3');
        this.emitter = this.particles3.createEmitter(
        {
            x: -200, y: 600,
            speed: 10,
            moveToX: {min:100,max:1500},
            moveToY: {min:796,max:886},
            rotate: {min:-10,max:360},
            lifespan: 22500,
            quantity: 1,
            frequency: 3000,
            delay: 3000,
            scale: { start: 0.6, end: 0.6 },
            blendMode: 'NORMAL', 
        });

        //----- effet de brouillard -----
        this.particles4 = this.add.particles('fog');
        this.emitter = this.particles4.createEmitter(
        {
            x: -200, y: 846,
            speed: 10,
            moveToX: {min:100,max:10000},
            moveToY: {min:846,max:846},
            rotate: {min:-360,max:360},
            lifespan: 200000,
            quantity: 4,
            frequency: 1000,
            delay: 1000,
            scale: { start: 0.6, end: 0.1 },
            blendMode: 'NORMAL', 
        });


        //------------------------ collisions ------------------------

        //les solides
        this.physics.add.collider(this.player, this.solides);
        this.physics.add.collider(this.stars, this.solides);
        //joueur et étoiles
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        //quand on touche la lave (ou autre surface mortelle), on meurt
        this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);
        //plateformes
        this.physics.add.collider(this.stars, plate1); // les étoiles rebondissent dessus
        this.physics.add.collider(this.player, plate1); // le joueur rebondit dessus
        this.physics.add.collider(this.stars, plate2);
        this.physics.add.collider(this.player, plate2);
        this.physics.add.collider(this.stars, plate3);
        this.physics.add.collider(this.player, plate3);
        this.physics.add.collider(this.stars, plate4);
        this.physics.add.collider(this.player, plate4);
        this.physics.add.collider(this.stars, plate5);
        this.physics.add.collider(this.player, plate5);
        this.physics.add.collider(this.stars, plate6);
        this.physics.add.collider(this.player, plate6);
        this.physics.add.collider(this.stars, plate7);
        this.physics.add.collider(this.player, plate7);
        this.physics.add.collider(this.stars, plate8);
        this.physics.add.collider(this.player, plate8);
        this.physics.add.collider(this.stars, plate9);
        this.physics.add.collider(this.player, plate9);
        this.physics.add.collider(this.stars, plate10);
        this.physics.add.collider(this.player, plate10);
        this.physics.add.collider(this.stars, plate11);
        this.physics.add.collider(this.player, plate11);
        this.physics.add.collider(this.stars, plate12);
        this.physics.add.collider(this.player, plate12);
        this.physics.add.collider(this.stars, plate13);
        this.physics.add.collider(this.player, plate13);
        this.physics.add.collider(this.stars, plate14);
        this.physics.add.collider(this.player, plate14);
        this.physics.add.collider(this.stars, plate15);
        this.physics.add.collider(this.player, plate15);
        this.physics.add.collider(this.stars, plate16);
        this.physics.add.collider(this.player, plate16);
        this.physics.add.collider(this.stars, plate17);
        this.physics.add.collider(this.player, plate17);
        this.physics.add.collider(this.stars, plate18);
        this.physics.add.collider(this.player, plate18);
        this.physics.add.collider(this.stars, plate19);
        this.physics.add.collider(this.player, plate19);
        this.physics.add.collider(this.stars, plate20);
        this.physics.add.collider(this.player, plate20);
        this.physics.add.collider(this.stars, plate21);
        this.physics.add.collider(this.player, plate21);
        this.physics.add.collider(this.stars, plate22);
        this.physics.add.collider(this.player, plate22);
        this.physics.add.collider(this.stars, plate23);
        this.physics.add.collider(this.player, plate23);


        //------------------------ check points ------------------------

        //quand on touche un checkpoint
        
        this.physics.add.overlap(this.player, this.checkPoints, function(player, checkPoint)
        {
            ici.saveCheckPoint(checkPoint.checkPointObject.name);
        }, null, this);


        //--------- Z order -----------------------

        //on définit les z à la fin
        let z=1000; 
        //niveau Z qui a chaque fois est décrémenté.
        this.checkPoints.setDepth(1000);
        debug.setDepth(z--);

        this.skyDevant.setDepth(z--);

        this.particles4.setDepth(z--);
        this.particles1.setDepth(z--);
        this.particles2.setDepth(z--);
        this.particles3.setDepth(z--);
        this.blood.setDepth(z--);
        this.blood2.setDepth(z--);

        /*this.pointLight1B.setDepth(z--);
        this.pointLight1.setDepth(z--);*/
        this.pointLight2B.setDepth(z--);
        this.pointLight2.setDepth(z--);    
        this.pointLight3.setDepth(z--);
        this.pointLight4.setDepth(z--);
        this.pointLight5.setDepth(z--);
        this.pointLight6.setDepth(z--);
        this.pointLight7.setDepth(z--);
        this.pointLight8.setDepth(z--);
        this.pointLight9.setDepth(z--);
        this.pointLight10.setDepth(z--);
        this.pointLight12.setDepth(z--);
        //this.pointLight11.setDepth(z--);
        this.pointLight14.setDepth(z--);
        this.pointLight13.setDepth(z--);

        torche1.setDepth(z--);
        torche1B.setDepth(z--);

        this.monstersContainer.setDepth(z--);
        this.stars.setDepth(z--);
        starsFxContainer.setDepth(z--);
        this.solides.setDepth(z--);
        //this.laveFxContainer.setDepth(z--);
        //this.lave.setDepth(z--);
        this.player.setDepth(z--);
        this.derriere.setDepth(z--);

        this.sky5.setDepth(z--);
        this.sky4.setDepth(z--);
        this.sky3.setDepth(z--);
        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

        //Save & Restore checkpoint
        this.restoreCheckPoint();

    } //---------- FIN DE CREATE ----------


    // Ne pas oublier de nommer chaques checkpoints sur Tiled
    saveCheckPoint(checkPointName)
    {
        if (localStorage.getItem("checkPoint") !== checkPointName)
        {
            console.log("on atteint le checkpoint", checkPointName);
            localStorage.setItem("checkPoint", checkPointName);
        }
    } //---------- FIN DE SAVECHECKPOINT ----------


    restoreCheckPoint()
    {
        let storedCheckPoint=localStorage.getItem("checkPoint")
        if(storedCheckPoint)
        {
            this.checkPointsObjects.forEach(checkPointObject => 
            {
                if(checkPointObject.name === storedCheckPoint)
                {
                    this.player.setPosition(checkPointObject.x, checkPointObject.y-64);//+432);
                    //console.log("on charge le checkpoint", checkPointName);
                }
            });
        }
    } //---------- FIN DE RESTORECHECKPOINT ----------


    /**
     * Permet d'activer, désactiver des éléments en fonction de leur visibilité dans l'écran ou non
     */
    optimizeDisplay()
    {
        //return;
        let world=this.cameras.main.worldView; // le rectangle de la caméra, (les coordonnées de la zone visible)
        /*
        // on va activer / désactiver les particules de lave
        for( let particule of this.laveFxContainer.getAll()){ // parcours toutes les particules de lave
            if(Phaser.Geom.Rectangle.Overlaps(world,particule.rectangle)){
                //si le rectangle de la particule est dans le rectangle de la caméra
                if(!particule.visible){
                    //on active les particules
                    particule.resume();
                    particule.visible=true;
                }
            }else{
                //si le rectangle de la particule n'est PAS dans le rectangle de la caméra
                if(particule.visible){
                    //on désactive les particules
                    particule.pause();
                    particule.visible=false;
                }
            }
        }
        */
        // ici on peut appliquer le même principe pour des monstres, des collectibles etc...

    } //---------- FIN DE OPTIMIZEDISPLAY ----------


    /**
     * Fait se déplacer certains éléments en parallax
     */
    moveParallax()
    {
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.01;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.6;

        this.sky2.tilePositionX=this.cameras.main.scrollX*0.03+100;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.7+100;

        ///le chateau sur la coline
        this.sky3.tilePositionX=this.cameras.main.scrollX*0.05;//*0.6//*0.3+500;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.8+144;//+24//*0.1;    
                
        //les colines
        this.sky4.tilePositionX=this.cameras.main.scrollX*0.6;//*0.3//*0.6;
        this.sky4.tilePositionY=this.cameras.main.scrollY+22;//+22//*0.2;
                    
        //la grille avec herbes
        this.sky5.tilePositionX=this.cameras.main.scrollX*0.8;//*0.6//0.15;
        this.sky5.tilePositionY=this.cameras.main.scrollY+22;//+0//*0.05;

        //les ombres devant
        this.skyDevant.tilePositionX=this.cameras.main.scrollX*1.4;//*0.6//0.15;
        this.skyDevant.tilePositionY=this.cameras.main.scrollY;//+0//*0.05;
    }

    update()
    {
        super.update();
        this.moveParallax();

        this.monstersContainer.each(function (child) {child.update();})

        //optimisation
        //teste si la caméra a bougé
        let actualPosition=JSON.stringify(this.cameras.main.worldView);
        if(
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ){
            this.previousPosition=actualPosition;
            this.optimizeDisplay();
        }
    }
}

