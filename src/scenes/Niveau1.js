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
        this.load.image('star', 'assets/elements/Os.png');
        this.load.image('ossement', 'assets/elements/ossement.png');
        this.load.image('os', 'assets/elements/os.png');
        this.load.image('platformStone', 'assets/elements/platformStone.png');
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTilesetCimetiere2.png');

        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/TheDeadKingRisingAlpha1-3.json'); // -> 'tableauTiled' & 2nd 'MapTiledLongueur' & 3rd 'tableauTiledCimetiereDbug

        // -----Decors-------------
        this.load.image('night', 'assets/backgrounds/sky_plan_nuitEtoileCarre.png');//nuitEtoileCarre_4.png');
        this.load.image('night1', 'assets/backgrounds/sky_plan_aurore.png');//aurore2.png');//nuitEtoileCarre_5
        this.load.image('chateauLoin', 'assets/backgrounds/cinquieme_plan_chateauLoin.png');//chateauLoin_x896_2.png');
        this.load.image('grilleHerbe', 'assets/backgrounds/second_plan_grille.png');//grille_x896_2.png');
        this.load.image('colines', 'assets/backgrounds/quatrieme_plan_colinesForet2.png');//colinesForet_x896.png');
        this.load.image('ombresTombes', 'assets/backgrounds/ombres_plan_surface.png');//ombresTombes_x896_2.png');

        // -----Elements interactifs-------------
        this.load.image('vase', 'assets/elements/vase2.png');
        this.load.image('solFragile', 'assets/elements/solFragile.png');
        this.load.image('solFragilePierre', 'assets/elements/solFragilePierre.png');
        this.load.image('rocheQuiRoule', 'assets/elements/solFragilePierre1.png');
        this.load.image('infCtrl', 'assets/elements/infosControls2.png');

        this.load.spritesheet('checkPoint', 'assets/Spritesheet/corbeauAnimation1.png', { frameWidth: 448, frameHeight: 448 } );

        // -----Monstres-------------
        this.load.image('monster-fly', 'assets/entities/chauve-souris.png'); // original 'monster-fly'
        this.load.image('bossSpectre', 'assets/entities/bossSpectre_Remastered.png');

        this.load.spritesheet('zombie2', 'assets/Spritesheet/zombie2.png', { frameWidth: 32, frameHeight: 48 } );       
        this.load.spritesheet('squelette', 'assets/Spritesheet/player0.png', { frameWidth: 32, frameHeight: 48 } ); 

        // -----Particules-------------
        this.load.image('feuille1', 'assets/particles/animation_feuille_1.png');
        this.load.image('feuille2', 'assets/particles/animation_feuille_2.png');
        this.load.image('feuille3', 'assets/particles/animation_feuille_3.png');
        this.load.image('fog', 'assets/particles/animation_fog_1.png');
        //this.load.image('vent', 'assets/Animation_vent_1.png');

        // -----Effets-------------
        this.load.image('light', 'assets/elements/light.png');
        this.load.image('bougie','assets/elements/bougie.png');
        this.load.image('torche','assets/elements/torche.png');

        this.load.spritesheet('bougieAnime', 'assets/Spritesheet/bougieAnimate.png', { frameWidth: 16, frameHeight: 16 } );
        this.load.spritesheet('torcheAnime', 'assets/Spritesheet/torcheAnimate.png', { frameWidth: 64, frameHeight: 96 } );

        // -----Sons-------------
        this.load.audio('brkkk', 'assets/Sound/broke_sound.mp3');
        this.load.audio('bruitZombie', 'assets/Sound/bruitZombie.mp3');
        this.load.audio('welcome', 'assets/Sound/Piano_Sonata_no_14_SV.mp3');
        this.load.audio('AmbianceHalloween1', 'assets/Sound/Ambiance_halloween_1_SV.mp3');
        this.load.audio('openingGate', 'assets/Sound/Gate-barriere-metallique-ouverture_ID-2357.mp3');
        this.load.audio('allumageBougie', 'assets/Sound/Essence-prend-feu_ID-1341.mp3');
        this.load.audio('allumageTorche', 'assets/Sound/Essence-prend-feu_ID-1341.mp3');
 
        // -----Atlas de texture généré avec https://free-tex-packer.com/app/ -------------
        //on y trouve notre étoiles et une tête de mort
        this.load.atlas('particles', 'assets/particles/particlesM.png', 'assets/particles/particles.json'); // original 'particles.png'
    }
    create() 
    {
        super.create();

        /********** POUR COUPER LES MUSIQUES PRECEDENTE **********
        
        this.game.sound.stopAll();

        **********/

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

        // On en aura besoin...
        let ici=this;
        let hauteurSol = 64;
        let hauteurDif = 448;

        // Booleans
        this.passageMusic = false;
        this.passage = true
        this.passageCamera = false;

        //this.playerMoveStop = false;


        //------------------------------------------------ Chargement de la tile map & configuration de la scène ------------------------------------------------

        // Notre map
        this.map = this.make.tilemap({ key: 'map' });
        // Nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tableauTiledTilesetCimetiere2', 'tiles'); // original 'tableauTiledTilset'

        // On agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //------------------------------------------------ Plateformes simples ------------------------------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        //this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        //this.devant = this.map.createLayer('devant', this.tileset, 0, 0);
        
        // plateformes columbariums
        this.platforms = this.physics.add.group();

        this.platforms.create(15, 293+hauteurDif, 'platformStone');
        this.platforms.create(205, 293+hauteurDif, 'platformStone');
        this.platforms.create(1420, 293+hauteurDif, 'platformStone');
        this.platforms.create(1932, 293+hauteurDif, 'platformStone');
        this.platforms.create(2380, 293+hauteurDif, 'platformStone');
        this.platforms.create(2892, 293+hauteurDif, 'platformStone');
        this.platforms.create(4237, 293+hauteurDif, 'platformStone');
        this.platforms.create(4749, 293+hauteurDif, 'platformStone');
        this.platforms.create(5261, 293+hauteurDif, 'platformStone');
        this.platforms.create(5645, 293+hauteurDif, 'platformStone');
        this.platforms.create(6861, 293+hauteurDif, 'platformStone');
        this.platforms.create(7821, 293+hauteurDif, 'platformStone');

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true); // pour ne pas bouger quand il y a collision
            child.body.allowGravity=false; // on désactive l'effet de la gravité
            child.setCollideWorldBounds(false);
            child.setFriction(1); // pour que les éléments ne glissent sur cette plateforme
            child.setOrigin(0,0); // pour positionner plus facilement, repère en haut à gauche (descendant, vers la droite)
            child.setDisplaySize(103,7);
            //child.refreshBody();
        });

        // plateformes mausolés
        this.platforms2 = this.physics.add.group();

        this.platforms2.create(390, 183+hauteurDif, 'platformStone');
        this.platforms2.create(1671, 183+hauteurDif, 'platformStone');
        this.platforms2.create(2567, 183+hauteurDif, 'platformStone');
        this.platforms2.create(4487, 183+hauteurDif, 'platformStone');
        this.platforms2.create(4935, 183+hauteurDif, 'platformStone');
        this.platforms2.create(7047, 183+hauteurDif, 'platformStone');
        this.platforms2.create(7303, 183+hauteurDif, 'platformStone');
        this.platforms2.create(7559, 183+hauteurDif, 'platformStone');

        this.platforms2.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(179,11);
        });

        // plateformes crypte royale
        this.platforms3 = this.physics.add.group();

        this.platforms3.create(665, 124+hauteurDif, 'platformStone');

        this.platforms3.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(400,18);
        });

        // plateformes pierre
        this.platforms4 = this.physics.add.group();

        this.platforms4.create(3906, 880+hauteurDif, 'solFragilePierre');
        this.platforms4.create(3906, 768+hauteurDif, 'solFragilePierre');
        this.platforms4.create(3934, 612+hauteurDif, 'solFragilePierre');
        this.platforms4.create(3996, 500+hauteurDif, 'solFragilePierre');
        this.platforms4.create(4050, 736+hauteurDif, 'solFragilePierre');
        //this.platforms4.create(4832, 1328+hauteurDif, 'solFragilePierre');
        this.platforms4.create(4832, 1584+hauteurDif, 'solFragilePierre');
        this.platforms4.create(4896, 1520+hauteurDif, 'solFragilePierre');
        this.platforms4.create(4960, 1456+hauteurDif, 'solFragilePierre');
        this.platforms4.create(5248, 1168+hauteurDif, 'solFragilePierre');
        this.platforms4.create(5296, 1056+hauteurDif, 'solFragilePierre');
        this.platforms4.create(5344, 1232+hauteurDif, 'solFragilePierre');

        this.platforms4.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(32,16);
        });

        // plateformes antibug
        // joueur
        this.platforms5 = this.physics.add.group();

        this.platforms5.create(5040, 896+hauteurDif);
        this.platforms5.create(5440, 1280+hauteurDif);

        this.platforms5.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(16,64);
        });
        // monstre
        this.platforms6 = this.physics.add.group();

        this.platforms6.create(1516, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(2028, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(2380, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(2994, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(3964, 1280+hauteurDif, 'solFragilePierre');
        this.platforms6.create(4160, 1280+hauteurDif, 'solFragilePierre');
        this.platforms6.create(4848, 1280+hauteurDif, 'solFragilePierre');
        this.platforms6.create(4237, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(5349, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(5645, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(6100, 322+hauteurDif, 'solFragilePierre');



        this.platforms6.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(16,64);
        });


        //------------------------------------------------ On définit les collisions (plusieurs méthodes existent) ------------------------------------------------

        // 1 La méthode que je préconise (il faut définir une propriété dans tiled pour que ça marche)
        //permet de travailler sur un seul layer dans tiled et des définir les collisions en fonction des graphiques
        //exemple ici https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
        this.solides.setCollisionByProperty({ collides: true });
        //this.lave.setCollisionByProperty({ collides: true });

        // 2 manière la plus simple (là où il y a des tiles ça collide et sinon non)
        this.solides.setCollisionByExclusion(-1, true);
        //this.lave.setCollisionByExclusion(-1, true);

        // 3 Permet d'utiliser l'éditeur de collision de Tiled...mais ne semble pas marcher pas avec le moteur de physique ARCADE, donc oubliez cette option :(
        //this.map.setCollisionFromCollisionGroup(true,true,this.plateformesSimples);

        //------------------------------------------------ Les étoiles (objets) ------------------------------------------------

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
            let star = this.stars.create(starObject.x+48, starObject.y-64, 'particles','star');
        });


        //------------------------------------------------ Les monstres (objets tiled) ------------------------------------------------

        //let fonction1 = this;
        this.monstersContainer=this.add.container();

        // On crée des montres volants pour chaque objet rencontré
        this.flyingMonstersObjects = this.map.getObjectLayer('flyingMonsters')['objects'];
        this.flyingMonstersObjects.forEach(monsterObject => 
        {
            let monster=new MonsterFly(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            //this.physics.add.collider(monster, this.projectil);
        });

        // On crée des zombies pour chaque objet rencontré
        this.zombiesObjects = this.map.getObjectLayer('zombies')['objects'];
        this.zombiesObjects.forEach(monsterObject => 
        {
            let monster=new MonsterZombie(this,monsterObject.x,monsterObject.y-30);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
            this.physics.add.collider(monster, this.platforms6);
            //this.physics.add.collider(monster, this.projectil);
            //this.physics.add.collider(monster, this.solides); 
        });

        // On crée des squelettes pour chaque objet rencontré
        this.squelettesObjects = this.map.getObjectLayer('squelettes')['objects'];
        this.squelettesObjects.forEach(monsterObject => 
        {
            let monster=new MonsterSkeleton(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster); 
            this.physics.add.collider(monster, this.solides);
            this.physics.add.collider(monster, this.platforms4);
            this.physics.add.collider(monster, this.platforms6);
            //this.physics.add.collider(monster, this.projectil);
        });
        
        // On crée le boss
        this.bossSpectreObjects = this.map.getObjectLayer('bossSpectre')['objects'];
        this.bossSpectreObjects.forEach(monsterObject => 
        {
            let monster=new MonsterBossSpectre(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
            this.physics.add.collider(monster, this.platforms6);
            //this.physics.add.collider(monster, this.projectil);
        });


         //------------------------------------------------ Les elements interactifs (objets tiled) ------------------------------------------------

        // Elements cassables
        //this.escaliers = this.physics.add.staticGroup();
        this.vaseObjects = this.map.getObjectLayer('vase')['objects'];
        this.vaseObjects.forEach(monsterObject => 
        {
            let monster=new ElementVase(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
            this.physics.add.collider(monster, this.projectil);
            /*passage.blendMode=Phaser.BlendModes.COLOR_DODGE;
            passage.escaliersObject=escaliersObject;*/
        });

        this.solFragileObjects = this.map.getObjectLayer('solFragile')['objects'];
        this.solFragileObjects.forEach(monsterObject => 
        {
            let monster=new ElementSolFragile(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
            this.physics.add.collider(monster, this.solides);
        });

        this.solFragilePierreObjects = this.map.getObjectLayer('solFragilePierre')['objects'];
        this.solFragilePierreObjects.forEach(monsterObject => 
        {
            let monster=new ElementSolFragilePierre(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
        });

        // Elements movibles
        this.rocheQuiRouleObjects = this.map.getObjectLayer('rocheQuiRoule')['objects'];
        this.rocheQuiRouleObjects.forEach(monsterObject => 
        {
            let monster=new ElementRocheQuiRoule(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
        });

        /*
        // Elements collectibles
        this.bonus = this.physics.add.group({
            allowGravity: false,
            immovable: true,
            bounceY:0
        });
        this.bonusObjects = this.map.getObjectLayer('bonus')['objects'];
        this.bonusObjects.forEach(bonusObjects => {
            //this.rammasserBonusUn()
            let bonus = this.bonus.create(bonusObjects.x+32, bonusObjects.y+32 ,'bonus');   
        });*/

        //------------------------------------------------ Escaliers ------------------------------------------------

        this.escaliers = this.physics.add.staticGroup();
        this.escaliersObjects = this.map.getObjectLayer('escaliers')['objects'];
        //on crée des passages pour chaque objet rencontré
        this.escaliersObjects.forEach(escaliersObject => 
        {
            let passage=this.escaliers.create(escaliersObject.x+32,escaliersObject.y-16).setOrigin(0.5,1);
            passage.blendMode=Phaser.BlendModes.COLOR_DODGE;
            passage.escaliersObject=escaliersObject;
        });


        //------------------------------------------------ Check point ------------------------------------------------

        this.anims.create({
            key: 'cp',
            frames: this.anims.generateFrameNumbers('checkPoint', { start: 0, end: 13 }),
            frameRate: 6,
            repeat: -1
        });

        this.checkPoints = this.physics.add.staticGroup();
        this.checkPointsObjects = this.map.getObjectLayer('checkPoints')['objects'];
        //on crée des checkpoints pour chaque objet rencontré
        this.checkPointsObjects.forEach(checkPointObject => 
        {
            let point=this.checkPoints.create(checkPointObject.x+248,checkPointObject.y+183,'checkPoint').play('cp', true).setDepth(986).setDisplaySize(16,16).setBodySize(64,64)
            .setOrigin(14,12.4);
            point.blendMode=Phaser.BlendModes.COLOR_DODGE;
            point.checkPointObject=checkPointObject;
        });


        //------------------------------------------------ Eléments animés ------------------------------------------------

        //     bougies     //     
        this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('bougieAnime', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.bougies = this.physics.add.staticGroup();
        this.bougiesObjects = this.map.getObjectLayer('bougies')['objects'];
        //on crée des bougies pour chaque objet rencontré
        this.bougiesObjects.forEach(bougieObject => 
        {
            let bgLight=this.bougies.create(bougieObject.x+32,bougieObject.y-11,'bougie').setOrigin(0.5,1).setDepth(986)
            .setBodySize(bougieObject.width,bougieObject.height);
            bgLight.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight.bougieObject=bougieObject;
        });

        //      torches     // torcheAnime
        this.anims.create({
            key: 'tch',
            frames: this.anims.generateFrameNumbers('torcheAnime', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.torches = this.physics.add.staticGroup();
        this.torchesObjects = this.map.getObjectLayer('torches')['objects'];
        this.torchesObjects.forEach(torcheObject => 
        {
            let tchLight=this.torches.create(torcheObject.x,torcheObject.y,'torche').setOrigin(0,0).setDepth(986)
            .setBodySize(torcheObject.width,torcheObject.height);
            tchLight.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight.torcheObject=torcheObject;
        });
        

        //------------------------------------------------ Effet sur la lave (ou autre surface mortelle) ------------------------------------------------

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

        //------------------------------------------------ Effet sur les étoiles (ou autre collectible) ------------------------------------------------

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


        //------------------------------------------------ Débug ------------------------------------------------
        
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


        //----------------------------------------------- Parallax ciel (rien de nouveau) ------------------------------------------------

        // On change de ciel
        // On fait une tileSprite ce qui permet d'avoir une image qui se répète
        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night'
        );
        this.sky.setOrigin(0,0);
        this.sky.setScrollFactor(0); // Fait en sorte que le ciel ne suive pas la caméra
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
        this.sky3.setOrigin(0,0);
        this.sky3.setScrollFactor(0);
        
        this.sky4=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'colines'
        );
        this.sky4.setOrigin(0,0);
        this.sky4.setScrollFactor(0);
        
        this.sky5=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'grilleHerbe'
        );
        this.sky5.setOrigin(0,0);
        this.sky5.setScrollFactor(0);

        this.skyDevant=this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'ombresTombes'
        );
        this.skyDevant.setOrigin(0,0);
        this.skyDevant.setScrollFactor(0);


        //------------------------------------------------ Sources lumineuses ------------------------------------------------

        //     grandes torches     //
        /*this.pointLight1 = this.add.pointlight(50, 770, (0, 0, 0), 100, 0.05, 0.15);
        this.pointLight1.color.r = 255;
        this.pointLight1.color.g = 50;
        this.pointLight1.color.b = 0;    

        this.pointLight1B = this.add.pointlight(50, 770, (0, 0, 0), 80, 0.05, 0.15);
        this.pointLight1B.color.r = 255;
        this.pointLight1B.color.g = 250;
        this.pointLight1B.color.b = 0;*/

        /*this.pointLight2 = this.add.pointlight(1075, 770, (0, 0, 0), 100, 0.05, 0.15);
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
        })*/


        //------------------------------------------------ Effets particules ------------------------------------------------

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


        //------------------------------------------------ Collisions ------------------------------------------------

        //les solides
        this.physics.add.collider(this.player, this.solides);
        this.physics.add.collider(this.stars, this.solides);

        //joueur et étoiles
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        //quand on touche la lave (ou autre surface mortelle), on meurt
        this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);

        //plateformes
        this.physics.add.collider(this.player, this.platforms); // entre joueur et plateformes
        this.physics.add.collider(this.stars, this.platforms); // entre étoiles et plateformes

        this.physics.add.collider(this.player, this.platforms2);
        this.physics.add.collider(this.stars, this.platforms2);

        this.physics.add.collider(this.player, this.platforms3);
        this.physics.add.collider(this.stars, this.platforms3);

        this.physics.add.collider(this.player, this.platforms4);
        this.physics.add.collider(this.stars, this.platforms4);

        this.physics.add.collider(this.player, this.platforms5);
        this.physics.add.collider(this.stars, this.platforms5);

        //projectils
        //...


        //------------------------------------------------ Check points ------------------------------------------------

        //quand on touche un checkpoint
        
        this.physics.add.overlap(this.player, this.checkPoints, function(player, checkPoint)
        {
            ici.saveCheckPoint(checkPoint.checkPointObject.name);
        }, null, this);


        //------------------------------------------------ Escaliers ------------------------------------------------

        //quand on touche un Escaliers
        
        this.physics.add.overlap(this.player, this.escaliers, function(player, escaliers)
        {
            //ici.saveEscaliers(escaliers.escaliersObject.name);
            //this.player.setPosition(escaliersObject.x, escaliersObject.y-384);

            this.cameras.main.fadeOut(1000, 0, 0, 0)
            if(!this.passageCamera)
            {
                Tableau.current.playerMoveStop = true;
                player.stop();
                Tableau.current.invincible();
                this.player.setPosition(player.x-1024, player.y-1152);//384);
                this.passageMusic = true;
                console.log("passage   DEBUG");

                if(this.passageMusic)
                {
                    console.log("passageMusic   DEBUG   DEBUG");
                    player.anims.play('turn', true);
                    this.gate = this.sound.add('openingGate');
                    var musicConfig = 
                    {
                        mute: false,
                        volume: 0.5,
                        rate : 1,
                        detune: 0,
                        seek: 0,
                        loop: false,
                        delay:0,
                    }
                    this.gate.play(musicConfig);
    
                    this.passageMusic = false;
                    this.passage = false;

                    if(!this.passage)
                    {
                        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
                        {
                            console.log("cameras.main.fadeOut   DEBUG   DEBUG   DEBUG");
                            this.cameras.main.fadeIn(1000, 0, 0, 0);
                        })
                        this.passage = true;
                        //this.passageMusic = true;
                    }
                }
                Tableau.current.playerMoveStop = false;
            }

        }, null, this);

        //------------------------------------------------ Bougies ------------------------------------------------

        //quand on touche une bougie
        this.physics.add.overlap(this.player, this.bougies, function(player, bougie)
        {
            //this.add.sprite(bougieObject.x+32,bougieObject.y-32,'bougie').play('bg', true).setDepth(986);
            ici.allumerBougie(bougie.bougieObject.name);
            /*
            //this.add.sprite(bougiesObject.x+32,bougiesObject.y-32,'bougie').play('bg', true);
            let bougie1 = this.add.pointlight(player.x+32, player.y-32, 0, 200, 0.6);
            bougie1.attenuation = 0.05;
            bougie1.color.setTo(255, 200, 0);
            bougie1.setDepth(986);
            this.tweens.add(
            {
                targets:bougie1,
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
            })*/

        }, null, this);

        //quand on touche une torche
        this.physics.add.overlap(this.player, this.torches, function(player, torche)
        {
            ici.allumerTorche(torche.torcheObject.name);

        }, null, this);



        //--------------------------------- Z order -----------------------------------------------

        //on définit les z à la fin
        let z=1000; 
        //niveau Z qui a chaque fois est décrémenté.
        this.platforms5.setDepth(984);
        this.platforms6.setDepth(984);
        this.checkPoints.setDepth(997);
        this.infCtrl.setDepth(1000);
        //this.bougies.setDepth(986);
        //this.escaliers.setDepth(1000);
        debug.setDepth(z--);

        this.skyDevant.setDepth(z--);

        this.particles4.setDepth(z--);
        this.particles1.setDepth(z--);
        this.particles2.setDepth(z--);
        this.particles3.setDepth(z--);
        this.blood.setDepth(z--);
        this.blood2.setDepth(z--);

        /*torche1.setDepth(z--);
        torche1B.setDepth(z--);*/

        this.monstersContainer.setDepth(z--);
        this.stars.setDepth(z--);
        starsFxContainer.setDepth(z--);
        this.solides.setDepth(z--);
        //this.laveFxContainer.setDepth(z--);
        //this.lave.setDepth(z--);
        this.player.setDepth(z--);
        this.platforms4.setDepth(z--);
        this.derriere.setDepth(z--);

        this.sky5.setDepth(z--);
        this.sky4.setDepth(z--);
        this.sky3.setDepth(z--);
        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

        //Save & Restore checkpoint
        this.restoreCheckPoint();
        //this.allumerBougie();

    } //---------------------------------- FIN DE CREATE ----------------------------------


    // Ne pas oublier de nommer chaques checkpoints sur Tiled
    saveCheckPoint(checkPointName)
    {
        //this.unique = false;
        if (localStorage.getItem("checkPoint") !== checkPointName)
        {
            console.log("on atteint le checkpoint", checkPointName);
            localStorage.setItem("checkPoint", checkPointName);

            /******* tentative de leur permettre un unique fonctionnenent par chargement de tableau
            if (this.unique === false)
            {
                this.add.sprite(checkPointObject.x,checkPointObject.y-16,'checkPoint').play('cp', true).setOrigin(0.5,0.5).setDepth(986).setBodySize(64,64);
                //.setDisplaySize(16,16);
                this.unique = true;
            }
            */
        }
    } //---------------------------------- FIN DE SAVECHECKPOINT ----------------------------------


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
    } //---------------------------------- FIN DE RESTORECHECKPOINT ----------------------------------


    allumerBougie(bougieName, player)
    {
        let storedBougie=localStorage.getItem("bougie")
        if (storedBougie !== bougieName)
        {
            console.log("on allume la bougie", bougieName);
            localStorage.setItem("bougie", bougieName);
            this.unSeul = true;
        }
        else if (storedBougie === bougieName)
        {
            this.bougiesObjects.forEach(bougieObject => 
                {
                    
                    if(bougieObject.name === storedBougie && this.unSeul === true)
                    {
                            this.allumeBougie = this.sound.add('allumageBougie');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.2,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeBougie.play(musicConfig);
    
                            let bougieSprite = this.add.sprite(bougieObject.x+32,bougieObject.y-20,'bougieAnime').play('bg', true).setDepth(986);
                            let bougie2 = this.add.pointlight(bougieObject.x+33, bougieObject.y-24, 0, 200, 0.3).setDepth(986);
                            bougie2.attenuation = 0.05;
                            bougie2.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie2,
                                duration:1,
                                //yoyo: true,
                                //repeat:-1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul = false;
                            let bougie1 = this.add.pointlight(bougieObject.x+33, bougieObject.y-24, 0, 10, 0.2).setDepth(986);
                            bougie1.attenuation = 0.05;
                            bougie1.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie1,
                                duration:200,//4000,
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

                        this.unSeul = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERBOUGIE ----------------------------------


    allumerTorche(torcheName, player)
    {
        let storedTorche=localStorage.getItem("torche")
        if (storedTorche !== torcheName)
        {
            console.log("on allume la torche", torcheName);
            localStorage.setItem("torche", torcheName);
            this.unSeul2 = true;
        }
        else if (storedTorche === torcheName)
        {
            this.torchesObjects.forEach(torcheObject => 
                {
                    
                    if(torcheObject.name === storedTorche && this.unSeul2 === true)
                    {
                            this.allumeTorche = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.2,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche.play(musicConfig);
    
                            let torcheSprite = this.add.sprite(torcheObject.x,torcheObject.y,'torcheAnime').play('tch', true).setDepth(986);
                            let torche2 = this.add.pointlight(torcheObject.x+32, torcheObject.y+38, 0, 200, 0.3).setDepth(986);
                            torche2.attenuation = 0.05;
                            torche2.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche2,
                                duration:1,
                                //yoyo: true,
                                //repeat:-1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul2 = false;
                            let torche1 = this.add.pointlight(torcheObject.x+32, torcheObject.y+38, 0, 10, 0.2).setDepth(986);
                            torche1.attenuation = 0.05;
                            torche1.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche1,
                                duration:200,//4000,
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

                        this.unSeul2 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERBOUGIE ----------------------------------


/*
    // Ne pas oublier de nommer chaques checkpoints sur Tiled
    saveEscaliers(escaliersName)
    {
        if (localStorage.getItem("escaliers") !== escaliersName)
        {
            console.log("on atteint le escaliers", escaliersName);
            localStorage.setItem("escaliers", escaliersName);
        }
    }*/


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

    } //---------------------------------- FIN DE OPTIMIZEDISPLAY ----------------------------------


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

    } //---------------------------------- FIN DE MOVEPARALLAX ----------------------------------

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

    }//---------------------------------- FIN DE UPDATE ----------------------------------
}

