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
        this.load.image('star', 'assets/elements/ossement.png');
        this.load.image('ossement', 'assets/elements/ossement.png');
        this.load.image('os', 'assets/elements/ossement.png');
        this.load.image('platformStone', 'assets/elements/platformStone.png');
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTilesetCimetiere2.png');

        // les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/TheDeadKingRisingAlpha5.json'); // -> 'TheDeadKingRisingAlpha1-3.json'

        // -----Decors-------------
        this.load.image('night', 'assets/backgrounds/nuit_etoile_turquoise.png'); // sky_plan_nuitEtoileCarre.png');
        // this.load.image('night1', 'assets/backgrounds/sky_plan_aurore.png');//aurore2.png'); // nuitEtoileCarre_5
        this.load.image('chateauLoin', 'assets/backgrounds/cinquieme_plan_chateauLoin.png'); // chateauLoin_x896_2.png');
        this.load.image('grilleHerbe', 'assets/backgrounds/second_plan_grille.png'); // grille_x896_2.png');
        this.load.image('colines', 'assets/backgrounds/quatrieme_plan_colinesForet2.png'); // colinesForet_x896.png');
        this.load.image('ombresTombes', 'assets/backgrounds/ombres_plan_surface_l_flou.png'); // ombres_plan_surface/l/.png

        // -----Elements interactifs-------------
        this.load.image('vase', 'assets/elements/vase.png');
        this.load.image('solFragile', 'assets/elements/sol_fragile.png'); // solFragile.png / sol-terre
        this.load.image('solFragilePierre', 'assets/elements/roche_devant.png'); // solFragilePierre.png');
        this.load.image('rocheQuiRoule', 'assets/elements/roche_devant2.jpg'); // solFragilePierre1.png');
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
        // this.load.image('vent', 'assets/Animation_vent_1.png');

        // -----Effets-------------
        this.load.image('light', 'assets/elements/light.png');
        this.load.image('bougie','assets/elements/bougie.png');
        this.load.image('torche','assets/elements/torche.png');

        this.load.spritesheet('bougieAnime', 'assets/Spritesheet/bougieAnimate.png', { frameWidth: 16, frameHeight: 16 } );
        this.load.spritesheet('torcheAnime', 'assets/Spritesheet/torcheAnimate4.png', { frameWidth: 64, frameHeight: 96 } );

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

        this.platforms.create(15, 286+hauteurDif, 'platformStone');
        this.platforms.create(205, 286+hauteurDif, 'platformStone');
        this.platforms.create(1420, 286+hauteurDif, 'platformStone');
        this.platforms.create(1932, 286+hauteurDif, 'platformStone');
        this.platforms.create(2380, 286+hauteurDif, 'platformStone');
        this.platforms.create(2892, 286+hauteurDif, 'platformStone');
        this.platforms.create(4237, 286+hauteurDif, 'platformStone');
        this.platforms.create(4749, 286+hauteurDif, 'platformStone');
        this.platforms.create(5261, 286+hauteurDif, 'platformStone');
        this.platforms.create(5645, 286+hauteurDif, 'platformStone');
        this.platforms.create(6861, 286+hauteurDif, 'platformStone');
        this.platforms.create(7821, 286+hauteurDif, 'platformStone');

        this.platforms.children.iterate(function (child) {
            child.setImmovable(true); // pour ne pas bouger quand il y a collision
            child.body.allowGravity=false; // on désactive l'effet de la gravité
            child.setCollideWorldBounds(false);
            child.setFriction(1); // pour que les éléments ne glissent sur cette plateforme
            child.setOrigin(0,0); // pour positionner plus facilement, repère en haut à gauche (descendant, vers la droite)
            child.setDisplaySize(103,14);
            //child.refreshBody();
        });

        // plateformes mausolés
        this.platforms2 = this.physics.add.group();

        this.platforms2.create(391, 170+hauteurDif, 'platformStone');
        this.platforms2.create(1672, 170+hauteurDif, 'platformStone');
        this.platforms2.create(2568, 170+hauteurDif, 'platformStone');
        this.platforms2.create(4488, 170+hauteurDif, 'platformStone');
        this.platforms2.create(4936, 170+hauteurDif, 'platformStone');
        this.platforms2.create(7048, 170+hauteurDif, 'platformStone');
        this.platforms2.create(7304, 170+hauteurDif, 'platformStone');
        this.platforms2.create(7560, 170+hauteurDif, 'platformStone');

        this.platforms2.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(179,24);
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
        this.platforms4.create(3938, 768+hauteurDif, 'solFragilePierre');
        this.platforms4.create(4050, 736+hauteurDif, 'solFragilePierre');
        this.platforms4.create(3934, 612+hauteurDif, 'solFragilePierre');
        this.platforms4.create(3996, 500+hauteurDif, 'solFragilePierre');

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

        /*this.platforms6.create(1516, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(2028, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(2380, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(2994, 322+hauteurDif, 'solFragilePierre');*/
        this.platforms6.create(3964, 1280+hauteurDif, 'solFragilePierre');
        this.platforms6.create(4160, 1280+hauteurDif, 'solFragilePierre');
        this.platforms6.create(4848, 1280+hauteurDif, 'solFragilePierre');
        /*this.platforms6.create(4237, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(5349, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(5645, 322+hauteurDif, 'solFragilePierre');
        this.platforms6.create(6100, 322+hauteurDif, 'solFragilePierre');*/



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
            //this.physics.add.collider(monster, Tableau.current.shoot); //this.projectil //this.solides

            this.physics.add.overlap(this.zombiesObjects, this.shoot, function(zombiesObjects, shoot)
            {
                Tableau.current.destroyProjectil();
                console.log("Debug Debug Debug Debug Debug Debug Debug")

            }, null, this);
    
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

        // ------------------------------------------------ Boxes text ------------------------------------------------

        /*this.firstTexteBoxe = new ElementBoxeTexte(this,0+480,0+1952).setDepth(996);//160//1200/1968
        this.physics.add.overlap(this.player, this.firstTexteBoxe, function(player, firstTexteBoxe)
        {
            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
                //console.log("jumpStop = true");
            }
            else
            {

                
            }
        }, null, this);*/


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
            let point=this.checkPoints.create(checkPointObject.x+248,checkPointObject.y+183,'checkPoint').play('cp', true).setDepth(987).setDisplaySize(16,16).setBodySize(64,64)
            .setOrigin(14,12.4);
            point.blendMode=Phaser.BlendModes.COLOR_DODGE;
            point.checkPointObject=checkPointObject;
        });


        //------------------------------------------------ Bougies ------------------------------------------------

        //     bougies     //     
        this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('bougieAnime', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.bougies0 = this.physics.add.staticGroup();
        this.bougies0Objects = this.map.getObjectLayer('bougies')['objects'];
        this.bougies0Objects.forEach(bougieObject => 
        {
            let bgLight=this.bougies0.create(bougieObject.x+32,bougieObject.y-11,'bougie').setOrigin(0.5,1).setDepth(987)
            .setBodySize(bougieObject.width,bougieObject.height);
            bgLight.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight.bougieObject=bougieObject;
        });

        //     bougies 1     //     
        this.bougies1 = this.physics.add.staticGroup();
        this.bougies1Objects = this.map.getObjectLayer('bougies1')['objects'];
        this.bougies1Objects.forEach(bougie1Object => 
        {
            let bgLight1=this.bougies1.create(bougie1Object.x+32,bougie1Object.y-11,'bougie').setOrigin(0.5,1).setDepth(987)
            .setBodySize(bougie1Object.width,bougie1Object.height);
            bgLight1.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight1.bougie1Object=bougie1Object;
        });
        //     bougies 2     //     
        this.bougies2 = this.physics.add.staticGroup();
        this.bougies2Objects = this.map.getObjectLayer('bougies2')['objects'];
        this.bougies2Objects.forEach(bougie2Object => 
        {
            let bgLight2=this.bougies2.create(bougie2Object.x+32,bougie2Object.y-11,'bougie').setOrigin(0.5,1).setDepth(987)
            .setBodySize(bougie2Object.width,bougie2Object.height);
            bgLight2.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight2.bougie2Object=bougie2Object;
        });
        
        //     bougies 3     //     
        this.bougies3 = this.physics.add.staticGroup();
        this.bougies3Objects = this.map.getObjectLayer('bougies3')['objects'];
        this.bougies3Objects.forEach(bougie3Object => 
        {
            let bgLight3=this.bougies3.create(bougie3Object.x+32,bougie3Object.y-11,'bougie').setOrigin(0.5,1).setDepth(987)
            .setBodySize(bougie3Object.width,bougie3Object.height);
            bgLight3.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight3.bougie3Object=bougie3Object;
        });
        

        //------------------------------------------------ Torches ------------------------------------------------

        //      torches     //
        this.anims.create({
            key: 'tch',
            frames: this.anims.generateFrameNumbers('torcheAnime', { start: 0, end: 8 }),
            frameRate: 20,
            repeat: -1
        });

        this.torches0 = this.physics.add.staticGroup();
        this.torches0Objects = this.map.getObjectLayer('torches')['objects'];
        this.torches0Objects.forEach(torcheObject => 
        {
            let tchLight = this.torches0.create(torcheObject.x+32,torcheObject.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torcheObject.width*4,torcheObject.height*4).setDisplaySize(48,64);
            tchLight.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight.torcheObject=torcheObject;
        });

        //      torches 1     //
        this.torches1 = this.physics.add.staticGroup();
        this.torches1Objects = this.map.getObjectLayer('torches1')['objects'];
        this.torches1Objects.forEach(torche1Object => 
        {
            let tchLight1 = this.torches1.create(torche1Object.x+32,torche1Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche1Object.width*4,torche1Object.height*4).setDisplaySize(48,64);
            tchLight1.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight1.torche1Object=torche1Object;
        });

        //      torches 2     //
        this.torches2 = this.physics.add.staticGroup();
        this.torches2Objects = this.map.getObjectLayer('torches2')['objects'];
        this.torches2Objects.forEach(torche2Object => 
        {
            let tchLight2 = this.torches2.create(torche2Object.x+32,torche2Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche2Object.width*4,torche2Object.height*4).setDisplaySize(48,64);
            tchLight2.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight2.torche2Object=torche2Object;
        });

        //      torches 3     //
        this.torches3 = this.physics.add.staticGroup();
        this.torches3Objects = this.map.getObjectLayer('torches3')['objects'];
        this.torches3Objects.forEach(torche3Object => 
        {
            let tchLight3 = this.torches3.create(torche3Object.x+32,torche3Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche3Object.width*4,torche3Object.height*4).setDisplaySize(48,64);
            tchLight3.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight3.torche3Object=torche3Object;
        });

        //      torches 4     //
        this.torches4 = this.physics.add.staticGroup();
        this.torches4Objects = this.map.getObjectLayer('torches4')['objects'];
        this.torches4Objects.forEach(torche4Object => 
        {
            let tchLight4 = this.torches4.create(torche4Object.x+32,torche4Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche4Object.width*4,torche4Object.height*4).setDisplaySize(48,64);
            tchLight4.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight4.torche4Object=torche4Object;
        });

        //      torches 5     //
        this.torches5 = this.physics.add.staticGroup();
        this.torches5Objects = this.map.getObjectLayer('torches5')['objects'];
        this.torches5Objects.forEach(torche5Object => 
        {
            let tchLight5 = this.torches5.create(torche5Object.x+32,torche5Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche5Object.width*4,torche5Object.height*4).setDisplaySize(48,64);
            tchLight5.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight5.torche5Object=torche5Object;
        });

        //      torches 6     //
        this.torches6 = this.physics.add.staticGroup();
        this.torches6Objects = this.map.getObjectLayer('torches6')['objects'];
        this.torches6Objects.forEach(torche6Object => 
        {
            let tchLight6 = this.torches6.create(torche6Object.x+32,torche6Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche6Object.width*4,torche6Object.height*4).setDisplaySize(48,64);
            tchLight6.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight6.torche6Object=torche6Object;
        });

        //      torches 7     //
        this.torches7 = this.physics.add.staticGroup();
        this.torches7Objects = this.map.getObjectLayer('torches7')['objects'];
        this.torches7Objects.forEach(torche7Object => 
        {
            let tchLight7 = this.torches7.create(torche7Object.x+32,torche7Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche7Object.width*4,torche7Object.height*4).setDisplaySize(48,64);
            tchLight7.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight7.torche7Object=torche7Object;
        });

        //      torches 8     //
        this.torches8 = this.physics.add.staticGroup();
        this.torches8Objects = this.map.getObjectLayer('torches8')['objects'];
        this.torches8Objects.forEach(torche8Object => 
        {
            let tchLight8=this.torches8.create(torche8Object.x+32,torche8Object.y-64,'torche').setOrigin(0.5,0).setDepth(987)
            .setBodySize(torche8Object.width*4,torche8Object.height*4).setDisplaySize(48,64);
            tchLight8.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight8.torche8Object=torche8Object;
        });


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

        /*this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'night1'
        );
        this.sky2.setOrigin(0,0);
        this.sky2.setScrollFactor(0);
        this.sky2.blendMode=Phaser.BlendModes.ADD;*/

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
            x: -200, y: 812,
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

        //joueur et étoiles(collectibles)
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
            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
                //console.log("jumpStop = true");
            }
            else
            {
                Tableau.current.jumpStop = false;
                //console.log("jumpStop = false");
            }
        }, null, this);

        //------------------------------------------------ Escaliers ------------------------------------------------

        //quand on touche un escalier
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
                this.player.setPosition(player.x-994, player.y-1152);//384);
                this.passageMusic = true;
                //console.log("passage   DEBUG");

                if(this.passageMusic)
                {
                    //console.log("passageMusic   DEBUG   DEBUG");
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
                            //console.log("cameras.main.fadeOut   DEBUG   DEBUG   DEBUG");
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
        this.physics.add.overlap(this.player, this.bougies0, function(player, bougie)
        {
            ici.allumerBougie(bougie.bougieObject.name);

            if(this.player.body.velocity.y == 0)// & !this.timingStopJump)
            {
                Tableau.current.jumpStop = false;
                //console.log("Niveau1.945-> jumpStop = false");

            }
            else
            {
                Tableau.current.jumpStop = true;
                //console.log("Niveau1.951 -> jumpStop = true");

            }

        }, null, this);
        this.physics.add.overlap(this.player, this.bougies1, function(player, bougie1)
        {
            ici.allumerBougie1(bougie1.bougie1Object.name);

            if(Tableau.current.player.body.velocity.y == 0)
            {
                Tableau.current.jumpStop = false;
            }
            else
            {
                Tableau.current.jumpStop = true;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.bougies2, function(player, bougie2)
        {
            ici.allumerBougie2(bougie2.bougie2Object.name);

            if(Tableau.current.player.body.velocity.y == 0)
            {
                Tableau.current.jumpStop = false;
            }
            else
            {
                Tableau.current.jumpStop = true;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.bougies3, function(player, bougie3)
        {
            ici.allumerBougie3(bougie3.bougie3Object.name);

            if(Tableau.current.player.body.velocity.y == 0)
            {
                Tableau.current.jumpStop = false;
            }
            else
            {
                Tableau.current.jumpStop = true;
            }

        }, null, this);

        //quand on touche une torche
        this.physics.add.overlap(this.player, this.torches0, function(player, torche)
        {
            ici.allumerTorche(torche.torcheObject.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
                //console.log("jumpStop = true");
            }
            else
            {
                Tableau.current.jumpStop = false;
                //console.log("jumpStop = false");
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches1, function(player, torche1)
        {
            ici.allumerTorche1(torche1.torche1Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches2, function(player, torche2)
        {
            ici.allumerTorche2(torche2.torche2Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches3, function(player, torche3)
        {
            ici.allumerTorche3(torche3.torche3Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches4, function(player, torche4)
        {
            ici.allumerTorche4(torche4.torche4Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches5, function(player, torche5)
        {
            ici.allumerTorche5(torche5.torche5Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches6, function(player, torche6)
        {
            ici.allumerTorche6(torche6.torche6Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches7, function(player, torche7)
        {
            ici.allumerTorche7(torche7.torche7Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);
        this.physics.add.overlap(this.player, this.torches8, function(player, torche8)
        {
            ici.allumerTorche8(torche8.torche8Object.name);

            if(!this.player.body.blocked.down || !this.player.body.touching.down)
            {
                Tableau.current.jumpStop = true;
            }
            else
            {
                Tableau.current.jumpStop = false;
            }

        }, null, this);

        //--------------------------------- Z order -----------------------------------------------

        //on définit les z à la fin. z-- = on décrémente par rapport à z ou à la valeur précédente qui décrémente de z.
        let z=1000; 
        this.platforms5.setDepth(984);
        //this.platforms6.setDepth(984);
        this.checkPoints.setDepth(997);
        this.infCtrl.setDepth(1000);
        debug.setDepth(z--);

        this.skyDevant.setDepth(z--);

        this.particles1.setDepth(z--);
        this.particles2.setDepth(z--);
        this.particles3.setDepth(z--);
        this.blood.setDepth(z--);
        this.blood2.setDepth(z--);

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
        this.particles4.setDepth(z--);
        this.sky4.setDepth(z--);
        this.sky3.setDepth(z--);
        //this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

        //Save & Restore checkpoint
        this.restoreCheckPoint();
        //this.allumerBougie() // allumerTorche()

    } //---------------------------------- FIN DE CREATE ----------------------------------


    // Ne pas oublier de nommer chaques checkpoints sur Tiled
    saveCheckPoint(checkPointName)
    {
        //this.unique = false;
        if (localStorage.getItem("checkPoint") !== checkPointName) // this.unique == false
        {
            console.log("on atteint le checkpoint", checkPointName);
            localStorage.setItem("checkPoint", checkPointName);
           //this.unique = true;
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


    // BOUGIES
    allumerBougie(bougieName, player)
    {
        let storedBougie = localStorage.getItem("bougie")
        if (storedBougie !== bougieName)
        {
            //console.log("on allume la bougie", bougieName);
            localStorage.setItem("bougie", bougieName);
            this.unSeul0 = true;
        }
        else if (storedBougie === bougieName)
        {
            this.bougies0Objects.forEach(bougieObject => 
                {
                    
                    if(bougieObject.name === storedBougie && this.unSeul0 === true)
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
    
                            let bougieSprite = this.add.sprite(bougieObject.x+32,bougieObject.y-20,'bougieAnime').play('bg', true).setDepth(987);
                            let bougie2 = this.add.pointlight(bougieObject.x+33, bougieObject.y-24, 0, 200, 0.3).setDepth(987);
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
                            this.unSeul0 = false;
                            let bougie1 = this.add.pointlight(bougieObject.x+33, bougieObject.y-24, 0, 10, 0.2).setDepth(987);
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

    allumerBougie1(bougie1Name, player)
    {
        let storedBougie1 = localStorage.getItem("bougie1")
        if (storedBougie1 !== bougie1Name)
        {
            localStorage.setItem("bougie1", bougie1Name);
            this.unSeul1 = true;
        }
        else if (storedBougie1 === bougie1Name)
        {
            this.bougies1Objects.forEach(bougie1Object => 
                {
                    
                    if(bougie1Object.name === storedBougie1 && this.unSeul1 === true)
                    {
                            this.allumeBougie1 = this.sound.add('allumageBougie');
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
                            this.allumeBougie1.play(musicConfig);
    
                            let bougieSprite1 = this.add.sprite(bougie1Object.x+32,bougie1Object.y-20,'bougieAnime').play('bg', true).setDepth(987);
                            let bougie21 = this.add.pointlight(bougie1Object.x+33, bougie1Object.y-24, 0, 200, 0.3).setDepth(987);
                            bougie21.attenuation = 0.05;
                            bougie21.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie21,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul1 = false;
                            let bougie11 = this.add.pointlight(bougie1Object.x+33, bougie1Object.y-24, 0, 10, 0.2).setDepth(987);
                            bougie11.attenuation = 0.05;
                            bougie11.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie11,
                                duration:200,
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

                        this.unSeul1 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERBOUGIE ----------------------------------

    allumerBougie2(bougie2Name, player)
    {
        let storedBougie2 = localStorage.getItem("bougie2")
        if (storedBougie2 !== bougie2Name)
        {
            localStorage.setItem("bougie2", bougie2Name);
            this.unSeul2 = true;
        }
        else if (storedBougie2 === bougie2Name)
        {
            this.bougies2Objects.forEach(bougie2Object => 
                {
                    
                    if(bougie2Object.name === storedBougie2 && this.unSeul2 === true)
                    {
                            this.allumeBougie2 = this.sound.add('allumageBougie');
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
                            this.allumeBougie2.play(musicConfig);
    
                            let bougieSprite2 = this.add.sprite(bougie2Object.x+32,bougie2Object.y-20,'bougieAnime').play('bg', true).setDepth(987);
                            let bougie22 = this.add.pointlight(bougie2Object.x+33, bougie2Object.y-24, 0, 200, 0.3).setDepth(987);
                            bougie22.attenuation = 0.05;
                            bougie22.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie22,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul2 = false;
                            let bougie12 = this.add.pointlight(bougie2Object.x+33, bougie2Object.y-24, 0, 10, 0.2).setDepth(987);
                            bougie12.attenuation = 0.05;
                            bougie12.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie12,
                                duration:200,
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

    allumerBougie3(bougie3Name, player)
    {
        let storedBougie3 = localStorage.getItem("bougie3")
        if (storedBougie3 !== bougie3Name)
        {
            localStorage.setItem("bougie3", bougie3Name);
            this.unSeul3 = true;
        }
        else if (storedBougie3 === bougie3Name)
        {
            this.bougies3Objects.forEach(bougie3Object => 
                {
                    
                    if(bougie3Object.name === storedBougie3 && this.unSeul3 === true)
                    {
                            this.allumeBougie3 = this.sound.add('allumageBougie');
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
                            this.allumeBougie3.play(musicConfig);
    
                            let bougieSprite3 = this.add.sprite(bougie3Object.x+32,bougie3Object.y-20,'bougieAnime').play('bg', true).setDepth(987);
                            let bougie23 = this.add.pointlight(bougie3Object.x+33, bougie3Object.y-24, 0, 200, 0.3).setDepth(987);
                            bougie23.attenuation = 0.05;
                            bougie23.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie23,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul3 = false;
                            let bougie13 = this.add.pointlight(bougie3Object.x+33, bougie3Object.y-24, 0, 10, 0.2).setDepth(987);
                            bougie13.attenuation = 0.05;
                            bougie13.color.setTo(255, 200, 0);
                            this.tweens.add(
                            {
                                targets:bougie13,
                                duration:200,
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

                        this.unSeul3 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERBOUGIE ----------------------------------


    // TORCHES
    allumerTorche(torcheName, player)
    {
        let storedTorche=localStorage.getItem("torche")
        if (storedTorche !== torcheName)
        {
            //console.log("on allume la torche", torcheName);
            localStorage.setItem("torche", torcheName);
            this.unSeul = true;

        }
        else if (storedTorche === torcheName && this.unSeul === true)
        {
            //console.log("torche allumée", torcheName);
            this.torches0Objects.forEach(torcheObject => 
            {
                    
                    if(torcheObject.name === storedTorche)
                    {
                            this.allumeTorche = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche.play(musicConfig);
    
                            let torcheSprite = this.add.sprite(torcheObject.x+32,torcheObject.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche2 = this.add.pointlight(torcheObject.x+32, torcheObject.y-49, 0, 200, 0.3).setDepth(987);
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
                            this.unSeul = false;
                            let torche1 = this.add.pointlight(torcheObject.x+32, torcheObject.y-49, 0, 20, 0.2).setDepth(987);
                            torche1.attenuation = 0.05;
                            torche1.color.setTo(255, 50, 0);
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

                        this.unSeul = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE ----------------------------------

    allumerTorche1(torche1Name, player)
    {
        let storedTorche1 = localStorage.getItem("torche1")
        if (storedTorche1 !== torche1Name)
        {
            localStorage.setItem("torche1", torche1Name);
            this.unSeul21 = true;
            //Tableau.current.destructionTorcheLight = false;
        }
        else if (storedTorche1 === torche1Name && this.unSeul21 === true)
        {
            this.torches1Objects.forEach(torche1Object => 
                {
                    
                    if(torche1Object.name === storedTorche1)
                    {
                            this.allumeTorche1 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche1.play(musicConfig);
    
                            let torcheSprite1 = this.add.sprite(torche1Object.x+32,torche1Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche21 = this.add.pointlight(torche1Object.x+32, torche1Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche21.attenuation = 0.05;
                            torche21.color.setTo(255, 100, 0);
                            //torche2.destroy(); //torche2.visible = false;
                            this.tweens.add(
                            {
                                targets:torche21,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul21 = false;
                            let torche11 = this.add.pointlight(torche1Object.x+32, torche1Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche11.attenuation = 0.05;
                            torche11.color.setTo(255, 50, 0);
                            //torche1.destroy();
                            this.tweens.add(
                            {
                                targets:torche11,
                                duration:200,
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
                            /*if(Tableau.current.destructionTorcheLight)
                            {
                                torcheSprite.destroy();
                                torche1.destroy();
                                torche2.destroy();
                            }
                            Tableau.current.destructionTorcheLight = true;*/

                        this.unSeul21 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE1 ----------------------------------

    allumerTorche2(torche2Name, player)
    {
        let storedTorche2 = localStorage.getItem("torche2")
        if (storedTorche2 !== torche2Name)
        {
            localStorage.setItem("torche2", torche2Name);
            this.unSeul22 = true;
        }
        else if (storedTorche2 === torche2Name && this.unSeul22 === true)
        {
            this.torches2Objects.forEach(torche2Object => 
                {
                    
                    if(torche2Object.name === storedTorche2)
                    {
                            this.allumeTorche2 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche2.play(musicConfig);
    
                            let torcheSprite2 = this.add.sprite(torche2Object.x+32,torche2Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche22 = this.add.pointlight(torche2Object.x+32, torche2Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche22.attenuation = 0.05;
                            torche22.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche22,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul22 = false;
                            let torche12 = this.add.pointlight(torche2Object.x+32, torche2Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche12.attenuation = 0.05;
                            torche12.color.setTo(255, 50, 0);
                            this.tweens.add(
                            {
                                targets:torche12,
                                duration:200,
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

                        this.unSeul22 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE2 ----------------------------------

    allumerTorche3(torche3Name, player)
    {
        let storedTorche3 = localStorage.getItem("torche3")
        if (storedTorche3 !== torche3Name)
        {
            localStorage.setItem("torche3", torche3Name);
            this.unSeul23 = true;
        }
        else if (storedTorche3 === torche3Name && this.unSeul23 === true)
        {
            this.torches3Objects.forEach(torche3Object => 
                {
                    
                    if(torche3Object.name === storedTorche3)
                    {
                            this.allumeTorche3 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche3.play(musicConfig);
    
                            let torcheSprite3 = this.add.sprite(torche3Object.x+32,torche3Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche23 = this.add.pointlight(torche3Object.x+32, torche3Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche23.attenuation = 0.05;
                            torche23.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche23,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul23 = false;
                            let torche13 = this.add.pointlight(torche3Object.x+32, torche3Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche13.attenuation = 0.05;
                            torche13.color.setTo(255, 50, 0);
                            this.tweens.add(
                            {
                                targets:torche13,
                                duration:200,
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

                        this.unSeul23 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE3 ----------------------------------

    allumerTorche4(torche4Name, player)
    {
        let storedTorche4=localStorage.getItem("torche4")
        if (storedTorche4 !== torche4Name)
        {
            console.log("on allume la torche", torche4Name);
            localStorage.setItem("torche4", torche4Name);
            this.unSeul24 = true;
        }
        else if (storedTorche4 === torche4Name && this.unSeul24 === true)
        {
            console.log("torche allumée", torche4Name);
            this.torches4Objects.forEach(torche4Object => 
                {
                    
                    if(torche4Object.name === storedTorche4)
                    {
                            this.allumeTorche4 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche4.play(musicConfig);
    
                            let torcheSprite4 = this.add.sprite(torche4Object.x+32,torche4Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche24 = this.add.pointlight(torche4Object.x+32, torche4Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche24.attenuation = 0.05;
                            torche24.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche24,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul24 = false;
                            let torche14 = this.add.pointlight(torche4Object.x+32, torche4Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche14.attenuation = 0.05;
                            torche14.color.setTo(255, 50, 0);
                            this.tweens.add(
                            {
                                targets:torche14,
                                duration:200,
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

                        this.unSeul24 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE4 ----------------------------------

    allumerTorche5(torche5Name, player)
    {
        let storedTorche5=localStorage.getItem("torche5")
        if (storedTorche5 !== torche5Name)
        {
            localStorage.setItem("torche5", torche5Name);
            this.unSeul25 = true;
        }
        else if (storedTorche5 === torche5Name && this.unSeul25 === true)
        {
            this.torches5Objects.forEach(torche5Object => 
                {
                    
                    if(torche5Object.name === storedTorche5)
                    {
                            this.allumeTorche5 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche5.play(musicConfig);
    
                            let torcheSprite5 = this.add.sprite(torche5Object.x+32,torche5Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche25 = this.add.pointlight(torche5Object.x+32, torche5Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche25.attenuation = 0.05;
                            torche25.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche25,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul25 = false;
                            let torche15 = this.add.pointlight(torche5Object.x+32, torche5Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche15.attenuation = 0.05;
                            torche15.color.setTo(255, 50, 0);
                            this.tweens.add(
                            {
                                targets:torche15,
                                duration:200,
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

                        this.unSeul25 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE5 ----------------------------------

    allumerTorche6(torche6Name, player)
    {
        let storedTorche6 = localStorage.getItem("torche6")
        if (storedTorche6 !== torche6Name)
        {;
            localStorage.setItem("torche6", torche6Name);
            this.unSeul26 = true;
        }
        else if (storedTorche6 === torche6Name && this.unSeul26 === true)
        {
            this.torches6Objects.forEach(torche6Object => 
                {
                    
                    if(torche6Object.name === storedTorche6)
                    {
                            this.allumeTorche6 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche6.play(musicConfig);
    
                            let torcheSprite6 = this.add.sprite(torche6Object.x+32,torche6Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche26 = this.add.pointlight(torche6Object.x+32, torche6Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche26.attenuation = 0.05;
                            torche26.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche26,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul26 = false;
                            let torche16 = this.add.pointlight(torche6Object.x+32, torche6Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche16.attenuation = 0.05;
                            torche16.color.setTo(255, 50, 0);
                            this.tweens.add(
                            {
                                targets:torche16,
                                duration:200,
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

                        this.unSeul26 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE6 ----------------------------------

    allumerTorche7(torche7Name, player)
    {
        let storedTorche7 = localStorage.getItem("torche7")
        if (storedTorche7 !== torche7Name)
        {
            localStorage.setItem("torche7", torche7Name);
            this.unSeul27 = true;
        }
        else if (storedTorche7 === torche7Name && this.unSeul27 === true)
        {
            this.torches7Objects.forEach(torche7Object => 
                {
                    
                    if(torche7Object.name === storedTorche7)
                    {
                            this.allumeTorche7 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche7.play(musicConfig);
    
                            let torcheSprite7 = this.add.sprite(torche7Object.x+32,torche7Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche27 = this.add.pointlight(torche7Object.x+32, torche7Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche27.attenuation = 0.05;
                            torche27.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche27,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul27 = false;
                            let torche17 = this.add.pointlight(torche7Object.x+32, torche7Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche17.attenuation = 0.05;
                            torche17.color.setTo(255, 50, 0);
                            this.tweens.add(
                            {
                                targets:torche17,
                                duration:200,
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

                        this.unSeul27 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE7 ----------------------------------

    allumerTorche8(torche8Name, player)
    {
        let storedTorche8 = localStorage.getItem("torche8")
        if (storedTorche8 !== torche8Name)
        {
            localStorage.setItem("torche8", torche8Name);
            this.unSeul28 = true;
        }
        else if (storedTorche8 === torche8Name && this.unSeul28 === true)
        {
            this.torches8Objects.forEach(torche8Object => 
                {
                    
                    if(torche8Object.name === storedTorche8)
                    {
                            this.allumeTorche8 = this.sound.add('allumageTorche');
                            var musicConfig = 
                            {
                                mute: false,
                                volume: 0.4,
                                rate : 1,
                                detune: 0,
                                seek: 0,
                                loop: false,
                                delay:0,
                            }
                            this.allumeTorche8.play(musicConfig);
    
                            let torcheSprite8 = this.add.sprite(torche8Object.x+32,torche8Object.y-48,'torcheAnime').play('tch', true).setDepth(987).setDisplaySize(48,96);
                            let torche28 = this.add.pointlight(torche8Object.x+32, torche8Object.y-49, 0, 200, 0.3).setDepth(987);
                            torche28.attenuation = 0.05;
                            torche28.color.setTo(255, 100, 0);
                            this.tweens.add(
                            {
                                targets:torche28,
                                duration:1,
                                delay:Math.random()*1000,
                                alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                            })
                            this.unSeul28 = false;
                            let torche18 = this.add.pointlight(torche8Object.x+32, torche8Object.y-49, 0, 20, 0.2).setDepth(987);
                            torche18.attenuation = 0.05;
                            torche18.color.setTo(255, 50, 0);
                            this.tweens.add(
                            {
                                targets:torche18,
                                duration:200,
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

                        this.unSeul28 = false;
                    }

                });
        }
    } //---------------------------------- FIN DE ALLUMERTORCHE8 ----------------------------------


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

        //this.sky2.tilePositionX=this.cameras.main.scrollX*0.03+100;
        //this.sky2.tilePositionY=this.cameras.main.scrollY*0.7+100;

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
        this.skyDevant.tilePositionX=this.cameras.main.scrollX*10;//*0.6//0.15;
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

