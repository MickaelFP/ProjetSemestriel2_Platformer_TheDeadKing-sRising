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
        this.load.image('etoffe', 'assets/elements/etoffes.png');
        this.load.image('os', 'assets/elements/ossement.png');
        this.load.image('platformStone', 'assets/elements/platformStone.png');
        this.load.image('plate', 'assets/elements/petitePlateformePierre.png');
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTilesetCimetiere3.png');
        this.load.image('tutoBox1', 'assets/elements/TutoBox1_2.png');
        this.load.image('tutoBox2', 'assets/elements/TutoBox2_2.png');
        this.load.image('tutoBox3', 'assets/elements/TutoBox4_2.png');
        this.load.image('tutoBox4', 'assets/elements/TutoBox3_2.png');
        this.load.image('tutoBox5', 'assets/elements/TutoBox5.png');
        this.load.image('tutoBox6', 'assets/elements/TutoBox6_2.png');

        // les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/TheDeadKingRisingBeta8.json'); // -> 'TheDeadKingRisingAlpha9-3.json'

        // -----Decors-------------
        this.load.image('night', 'assets/backgrounds/nuit_etoile_turquoise.png'); // sky_plan_nuitEtoileCarre.png');
        // this.load.image('night1', 'assets/backgrounds/sky_plan_aurore.png');//aurore2.png'); // nuitEtoileCarre_5
        this.load.image('chateauLoin', 'assets/backgrounds/cinquieme_plan_chateauLoin.png'); // chateauLoin_x896_2.png');
        this.load.image('grilleHerbe', 'assets/backgrounds/second_plan_grille_remastered.png'); // grille_x896_2.png');
        this.load.image('colines', 'assets/backgrounds/colinesForet_Remastered.png'); // quatrieme_plan_colinesForet2.png');
        //this.load.image('ombresTombes', 'assets/backgrounds/ombres_plan_surface_l_flou.png'); // ombres_plan_surface/l/.png

        // -----Elements interactifs-------------
        this.load.image('vase', 'assets/elements/vase.png');
        this.load.image('solFragile', 'assets/elements/sol_fragile.png'); // solFragile.png / sol-terre
        this.load.image('solFragilePierre', 'assets/elements/roche_devant1.jpg'); // solFragilePierre.png');
        this.load.image('rocheQuiRoule', 'assets/elements/roche_devant3_4.jpg'); // solFragilePierre1.png');
        this.load.image('rocheQuiRoule2', 'assets/elements/roche_devant3_2.jpg');
        this.load.image('infCtrl', 'assets/elements/infos_controls3.png');

        this.load.spritesheet('checkPoint', 'assets/Spritesheet/corbeauAnimation1.png', { frameWidth: 448, frameHeight: 448 } );

        // -----Monstres-------------
        //this.load.image('monster-fly', 'assets/entities/chauve-souris.png'); // original 'monster-fly'
        this.load.image('bossSpectre', 'assets/entities/bossSpectre_Remastered.png');

        //this.load.spritesheet('zombie2', 'assets/Spritesheet/zombie_remastered2.png', { frameWidth: 32, frameHeight: 56 } );       
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
        this.load.audio('welcome', 'assets/Sound/Piano_Sonata_no_14_SV.mp3');
        this.load.audio('AmbianceHalloween1', 'assets/Sound/Ambiance_halloween_1_SV.mp3');
        this.load.audio('openingGate', 'assets/Sound/Gate-barriere-metallique-ouverture_ID-2357.mp3');
        this.load.audio('allumageBougie', 'assets/Sound/Essence-prend-feu_ID-1341.mp3');
        this.load.audio('allumageTorche', 'assets/Sound/Essence-prend-feu_ID-1341.mp3');
        this.load.audio('criCorbeau', 'assets/Sound/sf_corbeau_01.mp3');

        if(this.scene.sys.game.device.os.desktop)
        {
            this.load.audio('CalmeGrotte', 'assets/Sound/Mourioche---passe-sous-silence_part2.mp3');
            this.load.audio('epicMusic', 'assets/Sound/Dark-Hero-3.mp3');
            this.load.audio('pousserRoche', 'assets/Sound/roche_pousser.mp3');
            this.load.audio('splashZomb', 'assets/Sound/mort_zombie.mp3');
            this.load.audio('zombAttract', 'assets/Sound/zombie_attract.wav');
            this.load.audio('crackSkull', 'assets/Sound/sf_os_broye_01.mp3');
            this.load.audio('skullAttract', 'assets/Sound/sf_os_broye_02.mp3');
            this.load.audio('splashChauveSourie', 'assets/Sound/feulement_chat_ID_1883.mp3');
            this.load.audio('chauveSourieAttract', 'assets/Sound/sf_souris_01.mp3');
        }

 
        // -----Atlas de texture généré avec https://free-tex-packer.com/app/ -------------
        //on y trouve notre étoiles et une tête de mort
        //this.load.atlas('particles', 'assets/particles/particlesM.png', 'assets/particles/particles.json'); // original 'particles.png'
        this.load.atlas('particles2', 'assets/particles/particles2.png', 'assets/particles/particles.json');
    }
    create() 
    {
        super.create();

        /********** POUR COUPER LES MUSIQUES PRECEDENTE **********
        
        this.game.sound.stopAll();

        if(this.scene.sys.game.device.os.desktop !== true && this.scene.sys.game.device.os.linux !== true && this.scene.sys.game.device.os.macOS !== true)

        **********/


        // On en aura besoin...
        let ici=this;
        let hauteurSol = 64;
        let hauteurDif = 448;

        // Booleans
        this.passageMusic = false;
        this.passage = true
        this.passageCamera = false;

        this.musicWelcomePermission = true;
        this.musicAmbPermission = true;
        this.musicEpicPermission = true;
        this.musicCalmeGPermission = true;

        this.musicMobilePlay = true;

        //this.playerMoveStop = false;


        //------------------------------------------------ Chargement de la tile map & configuration de la scène ------------------------------------------------

        // Notre map
        this.map = this.make.tilemap({ key: 'map' });
        // Nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tableauTiledTilesetCimetiere3', 'tiles'); // original 'tableauTiledTilset'

        // On agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1.5, 0, 128);
        this.cameras.main.setRoundPixels(true);
        //game.camera.flash(0xff0000, 500);
        //Tableau.current.player.body.fixedRotation = true;

        this.cameraBoolean0 = true;
        this.cameraBoolean64 = true;
        this.cameraBoolean128 = true;


        //------------------------------------------------ Plateformes simples ------------------------------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        //this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        
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

        this.platforms4.create(3904, 468+hauteurDif, 'plate');
        this.platforms4.create(4032, 532+hauteurDif, 'plate');
        this.platforms4.create(3936, 628+hauteurDif, 'plate');

        this.platforms4.create(5390, 976+hauteurDif, 'plate');
        this.platforms4.create(5374, 1104+hauteurDif, 'plate');
        this.platforms4.create(5248, 1216+hauteurDif, 'plate');
        this.platforms4.create(5392, 1262+hauteurDif, 'plate');

        this.platforms4.children.iterate(function (child) {
            child.setImmovable(true);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(64,16);
        });

        // plateformes antibug
        // joueur
        this.platforms5 = this.physics.add.group();

        this.platforms5.children.iterate(function (child) {
            child.setImmovable(false);
            child.body.allowGravity=false;
            child.setCollideWorldBounds(false);
            child.setFriction(1);
            child.setOrigin(0,0);
            child.setDisplaySize(64,64);
        });

        // monstre
        this.platforms6 = this.physics.add.group();

        this.platforms6.create(2304, 66 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(2944, 66 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(4224, 66 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(5312, 66 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(5184, 194 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(5760, 194 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(3964, 1280 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(4160, 1280 + hauteurDif, 'solFragilePierre');
        this.platforms6.create(4848, 1280 + hauteurDif, 'solFragilePierre');

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

        //------------------------------------------------ Les collectibles (objets: star, ossements, equipement...) ------------------------------------------------
        //
        // OSSEMENTS

        this.starList = [];
        this.stars = this.physics.add.group(
        {
            allowGravity: false,
            immovable: false,
            bounceY:0
        });
        this.starsObjects = this.map.getObjectLayer('stars')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.starsObjects.forEach(starObject => 
        {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let star = this.stars.create(starObject.x+48, starObject.y-10/*, 'particles2'*/,'star');
            this.tweens.add({
                targets: [star],
                y: {
                    from: starObject.y-10,
                    to: starObject.y-12,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    yoyo: -1,
                    repeat:-1
                }
            });
            this.starList.push(star);
        });
        //
        // EQUIPEMENT
        this.etoffeList = [];
        this.etoffes = this.physics.add.group(
        {
            allowGravity: false,
            immovable: false,
            bounceY:0
        });

        this.etoffesObjects = this.map.getObjectLayer('etoffes')['objects'];
        // On crée des étoiles pour chaque objet rencontré
        this.etoffesObjects.forEach(etoffeObject => 
        {
            // Pour chaque étoile on la positionne pour que ça colle bien car les étoiles ne font pas 64x64
            let etoffe = this.etoffes.create(etoffeObject.x+48, etoffeObject.y-10, 'etoffe');
            this.tweens.add({
                targets: [etoffe],
                y: {
                    from: etoffeObject.y-10,
                    to: etoffeObject.y-12,
                    duration: 500,
                    ease: 'Sine.easeInOut',
                    yoyo: -1,
                    repeat:-1
                }
            });
            this.etoffeList.push(etoffe);
        });

        //------------------------------------------------ Les monstres (objets tiled) ------------------------------------------------

        //let fonction1 = this;
        this.monstersContainer=this.add.container();

        // On crée des montres volants pour chaque objet rencontré
        this.flyingMonstersObjects = this.map.getObjectLayer('flyingMonsters')['objects'];
        this.flyingMonstersObjects.forEach(monsterObject => 
        {
            this.chauvesouris = new MonsterFly(this,monsterObject.x,monsterObject.y);
            this.monstersContainer.add(this.chauvesouris);
            this.physics.add.collider(this.chauvesouris, this.platforms6);
            //this.physics.add.collider(monster, this.projectil);
        });

        // On crée des zombies pour chaque objet rencontré
        this.zombiesObjects = this.map.getObjectLayer('zombies')['objects'];
        this.zombiesObjects.forEach(monsterObject => 
        {
            this.zomb = new MonsterZombie(this,monsterObject.x,monsterObject.y-30);
            this.monstersContainer.add(this.zomb);
            this.physics.add.collider(this.zomb, this.solides);
            //this.physics.add.collider(monster, Tableau.current.shoot); //this.projectil //this.solides

            this.physics.add.overlap(this.zombiesObjects, this.shoot, function(zombiesObjects, shoot)
            {
                Tableau.current.destroyProjectil();
                console.log("Debug Debug Debug Debug Debug Debug Debug");

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
        this.bossSpectreObjects.forEach(miniBossObject => 
        {
            this.miniBoss=new MonsterBossSpectre(this,miniBossObject.x,miniBossObject.y);
            this.monstersContainer.add(this.miniBoss);
            //this.physics.add.collider(this.miniBoss, this.player);

            //this.physics.add.overlap(this.player, this.monster, monster.update(), null, this);
        });


        //------------------------------------------------ Les elements interactifs (objets tiled) ------------------------------------------------

        // Elements cassables
        this.vaseList = [];
        this.vaseObjects = this.map.getObjectLayer('vase')['objects'];
        this.vaseObjects.forEach(monsterObject => 
        {
            let monster=new ElementVase(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
            this.physics.add.collider(monster, this.projectil);
            this.vaseList.push(monster);
        });

        this.solFragileList = [];
        this.solFragileObjects = this.map.getObjectLayer('solFragile')['objects'];
        this.solFragileObjects.forEach(monsterObject => 
        {
            let monster=new ElementSolFragile(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
            this.physics.add.collider(monster, this.projectil);
            this.solFragileList.push(monster);
        });

        this.solFragilePierreList = [];
        this.solFragilePierreObjects = this.map.getObjectLayer('solFragilePierre')['objects'];
        this.solFragilePierreObjects.forEach(monsterObject => 
        {
            let monster=new ElementSolFragilePierre(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
            this.solFragilePierreList.push(monster);
        });

        // Elements movibles
        this.rocheQuiRouleList = [];
        this.rocheQuiRouleObjects = this.map.getObjectLayer('rocheQuiRoule')['objects'];
        this.rocheQuiRouleObjects.forEach(monsterObject => 
        {
            this.roule = new ElementRocheQuiRoule(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(this.roule);
            this.physics.add.collider(this.roule, this.solides);
            this.rocheQuiRouleList.push(this.roule);

            this.physics.add.overlap(this.player, this.roule, function(player, roule)
            {
                Tableau.current.player.body.velocity.y = 0;
    
            }, null, this);

        });

        this.rocheQuiRoule2List = [];
        this.rocheQuiRouleObjects2 = this.map.getObjectLayer('rocheQuiRoule2')['objects'];
        this.rocheQuiRouleObjects2.forEach(monsterObject => 
        {
            this.roule2 = new ElementRocheQuiRoule2(this,monsterObject.x+32,monsterObject.y-32);
            this.monstersContainer.add(this.roule2);
            this.physics.add.collider(this.roule2, this.solides);
            this.rocheQuiRoule2List.push(this.roule2);

            this.physics.add.overlap(this.player, this.roule2, function(player, roule2)
            {
                Tableau.current.player.body.velocity.y = 0;
    
            }, null, this);
        });

        // ------------------------------------------------ Boxes text ------------------------------------------------

        this.TutoBox1 = this.add.sprite(556-12, 1792 , 'tutoBox1').setDepth(1001).setDisplaySize(192+120,128+80);
        this.TutoBox1.alpha = 0;
        this.TutoBox1.visible = false;
        this.boxLight1 = this.add.pointlight(541, 1965, 0, 50, 0.2).setDepth(987+1);
        this.boxLight1.attenuation = 0.05;
        this.boxLight1.color.setTo(50, 255, 50);

        this.TutoBox2 = this.add.sprite(940-12, 1792 , 'tutoBox2').setDepth(1001).setDisplaySize(192+120,128+80);
        this.TutoBox2.alpha = 0;
        this.TutoBox2.visible = false;
        this.boxLight2 = this.add.pointlight(925, 1965, 0, 50, 0.2).setDepth(987+1);
        this.boxLight2.attenuation = 0.05;
        this.boxLight2.color.setTo(50, 255, 50);

        this.TutoBox3 = this.add.sprite(1324-12, 1792 , 'tutoBox3').setDepth(1001).setDisplaySize(192+120,128+80);
        this.TutoBox3.alpha = 0;
        this.TutoBox3.visible = false;
        this.boxLight3 = this.add.pointlight(1309, 1965, 0, 50, 0.2).setDepth(987+1);
        this.boxLight3.attenuation = 0.05;
        this.boxLight3.color.setTo(50, 255, 50);

        this.TutoBox4 = this.add.sprite(492-12, 640 , 'tutoBox4').setDepth(1001).setDisplaySize(192+120,128+80);
        this.TutoBox4.alpha = 0;
        this.TutoBox4.visible = false;
        this.boxLight4 = this.add.pointlight(482, 808, 0, 50, 0.2).setDepth(987+1);
        this.boxLight4.attenuation = 0.05;
        this.boxLight4.color.setTo(50, 255, 50);

        /*this.TutoBox5 = this.add.sprite(492, 376, 'tutoBox5').setDepth(1001).setDisplaySize(192+120,128+80);
        this.TutoBox5.alpha = 0;
        this.TutoBox5.visible = false;*/

        this.TutoBox6 = this.add.sprite(832+32, 376 , 'tutoBox6').setDepth(1001).setDisplaySize(192+120,128+80);
        this.TutoBox6.alpha = 0;
        this.TutoBox6.visible = false;
        this.boxLight6 = this.add.pointlight(817+48, 472, 0, 200, 0.3).setDepth(987+1);
        this.boxLight6.attenuation = 0.05;
        this.boxLight6.color.setTo(50, 255, 50);


        /*this.TutoBox7 = this.add.sprite(1280, 640 , 'tutoBox6').setDepth(1001).setDisplaySize(192+76.8,128+31.2);
        this.TutoBox7.alpha = 0;
        this.TutoBox7.visible = false;*/

        //this.TutoBox8 = this.add.sprite(556, 1792 , 'tutoBox7').setDepth(1001).setDisplaySize(192+76.8,128+31.2);
        //this.TutoBox9 = this.add.sprite(556, 1792 , 'tutoBox8').setDepth(1001).setDisplaySize(192+76.8,128+31.2);


        //------------------------------------------------ Escaliers ------------------------------------------------

        this.escalierList = [];
        this.escaliers = this.physics.add.staticGroup();
        this.escaliersObjects = this.map.getObjectLayer('escaliers')['objects'];
        //on crée des passages pour chaque objet rencontré
        this.escaliersObjects.forEach(escaliersObject => 
        {
            let passage=this.escaliers.create(escaliersObject.x+32,escaliersObject.y-16).setOrigin(0.5,1);
            passage.escaliersObject=escaliersObject;
            this.escalierList.push(passage);
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
            this.point=this.checkPoints.create(checkPointObject.x+248,checkPointObject.y+183,'checkPoint').play('cp', true).setDisplaySize(16,16).setBodySize(64,64)
            .setOrigin(14,12.4);
            /*point.blendMode=Phaser.BlendModes.COLOR_DODGE;*/
            this.point.checkPointObject=checkPointObject;
            if(this.scene.sys.game.device.os.desktop)
            {
                this.checkPointsLight = this.add.pointlight(checkPointObject.x+32, checkPointObject.y-8, 0, 75, 0.15).setDepth(987+1);
                this.checkPointsLight.attenuation = 0.05;
                this.checkPointsLight.color.setTo(255, 50, 255);
            }
        });


        //------------------------------------------------ Bougies ------------------------------------------------

        //     bougies     //     
        this.anims.create({
            key: 'bg',
            frames: this.anims.generateFrameNumbers('bougieAnime', { start: 0, end: 5 }),
            frameRate: 20,
            repeat: -1
        });

        this.bougie0List = [];
        this.bougies0 = this.physics.add.staticGroup();
        this.bougies0Objects = this.map.getObjectLayer('bougies')['objects'];
        this.bougies0Objects.forEach(bougieObject => 
        {
            let bgLight=this.bougies0.create(bougieObject.x+32,bougieObject.y-11,'bougie').setOrigin(0.5,1).setDepth(987+1)
            .setBodySize(bougieObject.width,bougieObject.height);
            bgLight.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight.bougieObject=bougieObject;
        });

        //     bougies 1     //    
        this.bougie0List = []; 
        this.bougies1 = this.physics.add.staticGroup();
        this.bougies1Objects = this.map.getObjectLayer('bougies1')['objects'];
        this.bougies1Objects.forEach(bougie1Object => 
        {
            let bgLight1=this.bougies1.create(bougie1Object.x+32,bougie1Object.y-11,'bougie').setOrigin(0.5,1).setDepth(987+1)
            .setBodySize(bougie1Object.width,bougie1Object.height);
            bgLight1.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight1.bougie1Object=bougie1Object;
        });
        //     bougies 2     //  
        this.bougie0List = [];   
        this.bougies2 = this.physics.add.staticGroup();
        this.bougies2Objects = this.map.getObjectLayer('bougies2')['objects'];
        this.bougies2Objects.forEach(bougie2Object => 
        {
            let bgLight2=this.bougies2.create(bougie2Object.x+32,bougie2Object.y-11,'bougie').setOrigin(0.5,1).setDepth(987+1)
            .setBodySize(bougie2Object.width,bougie2Object.height);
            bgLight2.blendMode=Phaser.BlendModes.COLOR_DODGE;
            bgLight2.bougie2Object=bougie2Object;
        });
        
        //     bougies 3     //    
        this.bougie0List = []; 
        this.bougies3 = this.physics.add.staticGroup();
        this.bougies3Objects = this.map.getObjectLayer('bougies3')['objects'];
        this.bougies3Objects.forEach(bougie3Object => 
        {
            let bgLight3=this.bougies3.create(bougie3Object.x+32,bougie3Object.y-11,'bougie').setOrigin(0.5,1).setDepth(987+1)
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

        this.torche0List = [];
        this.torches0 = this.physics.add.staticGroup();
        this.torches0Objects = this.map.getObjectLayer('torches')['objects'];
        this.torches0Objects.forEach(torcheObject => 
        {
            let tchLight = this.torches0.create(torcheObject.x+32,torcheObject.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torcheObject.width*4,torcheObject.height*4).setDisplaySize(48,64);
            tchLight.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight.torcheObject=torcheObject;
        });

        //      torches 1     //
        this.torche1List = [];
        this.torches1 = this.physics.add.staticGroup();
        this.torches1Objects = this.map.getObjectLayer('torches1')['objects'];
        this.torches1Objects.forEach(torche1Object => 
        {
            let tchLight1 = this.torches1.create(torche1Object.x+32,torche1Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche1Object.width*4,torche1Object.height*4).setDisplaySize(48,64);
            tchLight1.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight1.torche1Object=torche1Object;
        });

        //      torches 2     //
        this.torche2List = [];
        this.torches2 = this.physics.add.staticGroup();
        this.torches2Objects = this.map.getObjectLayer('torches2')['objects'];
        this.torches2Objects.forEach(torche2Object => 
        {
            let tchLight2 = this.torches2.create(torche2Object.x+32,torche2Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche2Object.width*4,torche2Object.height*4).setDisplaySize(48,64);
            tchLight2.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight2.torche2Object=torche2Object;
        });

        //      torches 3     //
        this.torche3List = [];
        this.torches3 = this.physics.add.staticGroup();
        this.torches3Objects = this.map.getObjectLayer('torches3')['objects'];
        this.torches3Objects.forEach(torche3Object => 
        {
            let tchLight3 = this.torches3.create(torche3Object.x+32,torche3Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche3Object.width*4,torche3Object.height*4).setDisplaySize(48,64);
            tchLight3.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight3.torche3Object=torche3Object;
        });

        //      torches 4     //
        this.torche4List = [];
        this.torches4 = this.physics.add.staticGroup();
        this.torches4Objects = this.map.getObjectLayer('torches4')['objects'];
        this.torches4Objects.forEach(torche4Object => 
        {
            let tchLight4 = this.torches4.create(torche4Object.x+32,torche4Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche4Object.width*4,torche4Object.height*4).setDisplaySize(48,64);
            tchLight4.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight4.torche4Object=torche4Object;
        });

        //      torches 5     //
        this.torche5List = [];
        this.torches5 = this.physics.add.staticGroup();
        this.torches5Objects = this.map.getObjectLayer('torches5')['objects'];
        this.torches5Objects.forEach(torche5Object => 
        {
            let tchLight5 = this.torches5.create(torche5Object.x+32,torche5Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche5Object.width*4,torche5Object.height*4).setDisplaySize(48,64);
            tchLight5.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight5.torche5Object=torche5Object;
        });

        //      torches 6     //
        this.torche6List = [];
        this.torches6 = this.physics.add.staticGroup();
        this.torches6Objects = this.map.getObjectLayer('torches6')['objects'];
        this.torches6Objects.forEach(torche6Object => 
        {
            let tchLight6 = this.torches6.create(torche6Object.x+32,torche6Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche6Object.width*4,torche6Object.height*4).setDisplaySize(48,64);
            tchLight6.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight6.torche6Object=torche6Object;
        });

        //      torches 7     //
        this.torche7List = [];
        this.torches7 = this.physics.add.staticGroup();
        this.torches7Objects = this.map.getObjectLayer('torches7')['objects'];
        this.torches7Objects.forEach(torche7Object => 
        {
            let tchLight7 = this.torches7.create(torche7Object.x+32,torche7Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche7Object.width*4,torche7Object.height*4).setDisplaySize(48,64);
            tchLight7.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight7.torche7Object=torche7Object;
        });

        //      torches 8     //
        this.torche8List = [];
        this.torches8 = this.physics.add.staticGroup();
        this.torches8Objects = this.map.getObjectLayer('torches8')['objects'];
        this.torches8Objects.forEach(torche8Object => 
        {
            let tchLight8=this.torches8.create(torche8Object.x+32,torche8Object.y-64,'torche').setOrigin(0.5,0).setDepth(987+1)
            .setBodySize(torche8Object.width*4,torche8Object.height*4).setDisplaySize(48,64);
            tchLight8.blendMode=Phaser.BlendModes.COLOR_DODGE;
            tchLight8.torche8Object=torche8Object;
        });


        //------------------------------------------------ Effet sur les étoiles (ou autre collectible) ------------------------------------------------
        //
        // OSSEMENTS

        let starsFxContainer=ici.add.container();
        this.stars.children.iterate(function(etoile) 
        {
            let particles=ici.add.particles("particles2","star");
            let emmiter=particles.createEmitter(
            {
                //tint:[  0xFFFFFF,0xE8E8E8,0xDBDBDB,0xCCCCCC ], // original [  0xFF8800,0xFFFF00,0x88FF00,0x8800FF ]
                tint:[  0x7BF44E,0x95F671,0xB0F895,0xCAFBB8 ],
                //rotate: {min:360,max:360},
                scale: {start: 0.2, end: 0.1},
                alpha: { start: 0.4, end: 0 },
                blendMode: Phaser.BlendModes.ADD, //MULTIPLY
                //lifespan:3000,
                speed:30
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
        this.sky = this.add.tileSprite(
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

        this.sky3 = this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'chateauLoin'
        );
        this.sky3.setOrigin(0,0);
        this.sky3.setScrollFactor(0);
        
        this.sky4 = this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'colines'
        );
        this.sky4.setOrigin(0,0);
        this.sky4.setScrollFactor(0);
        
        this.sky5 = this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'grilleHerbe'
        );
        this.sky5.setOrigin(0,0);
        this.sky5.setScrollFactor(0);

        /*this.skyDevant = this.add.tileSprite
        (
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'ombresTombes'
        );
        this.skyDevant.setOrigin(0,0);
        this.skyDevant.setScrollFactor(0);*/


        //------------------------------------------------ Sources lumineuses ------------------------------------------------
;


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
        this.emitter = this.particles4.createEmitter(
        {
            x: 1728, y: 812,
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
        this.emitter = this.particles4.createEmitter(
        {
            x: 2912, y: 812,
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
        this.emitter = this.particles4.createEmitter(
        {
            x: 4544, y: 812,
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
        //this.physics.add.collider(this.etoffes, this.solides);

        //joueur et étoiles(collectibles)
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);
        this.physics.add.overlap(this.player, this.etoffes, this.ramasserEtoffe, null, this);

        //quand on touche la lave (ou autre surface mortelle), on meurt
        //this.physics.add.collider(this.player, this.lave,this.playerDie,null,this);

        //plateformes
        this.physics.add.collider(this.player, this.platforms); // entre joueur et plateformes
        this.physics.add.collider(this.stars, this.platforms); // entre étoiles et plateformes
        //this.physics.add.collider(this.etoffes, this.platforms); // entre étoffes et plateformes

        this.physics.add.collider(this.player, this.platforms2);
        this.physics.add.collider(this.stars, this.platforms2);
        //this.physics.add.collider(this.etoffes, this.platforms2);

        this.physics.add.collider(this.player, this.platforms3);
        this.physics.add.collider(this.stars, this.platforms3);
        //this.physics.add.collider(this.etoffes, this.platforms3);

        this.physics.add.collider(this.player, this.platforms4);
        this.physics.add.collider(this.stars, this.platforms4);
        //this.physics.add.collider(this.etoffes, this.platforms4);

        this.physics.add.collider(this.player, this.platforms5);
        this.physics.add.collider(this.stars, this.platforms5);
        //this.physics.add.collider(this.etoffes, this.platforms5);

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

                this.passageMusic = true;
                this.passageCamera = true;
                //console.log("passageCamera   DEBUG");
                
            }
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

                this.passage = false;
                this.passageMusic = false;

            }
            
            if(!this.passage)
            {

                //console.log("cameras.main.fadeIn   DEBUG   DEBUG   DEBUG");
                this.cameras.main.fadeIn(3000, 0, 0, 0);
                this.player.setPosition(player.x-994, player.y-1152);//384);
                this.time.addEvent
                ({
                    delay: 2000,
                    callback: ()=>
                    {
                        Tableau.current.playerMoveStop = false;
                        //console.log("Marche, cours, plonge, mais ne vole pas !!!");
                    },
                    loop: false
                })

                
                /*this.musicAmb = this.sound.add('AmbianceHalloween1');

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
                this.musicAmb.play(musicConfig);*/

                this.passage = true;
                //this.tpFiniBouge = true;
                //this.passageMusic = true;
            }

            /*if(this.tpFiniBouge)
            {

            }*/

        }, null, this);

        //------------------------------------------------ Bougies ------------------------------------------------

        //quand on touche une bougie
        this.physics.add.overlap(this.player, this.bougies0, function(player, bougie)
        {
            //ici.allumerBougie(bougie.bougieObject.name);
            ici.allumerGroupeBougie(
                bougie.bougieObject.name,
                "bougie",
                "bougies0Objects",
                "unSeul0"
            );

            if(this.player.body.velocity.y === 0)// & !this.timingStopJump)
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
            //ici.allumerBougie1(bougie1.bougie1Object.name);
            ici.allumerGroupeBougie(
                bougie1.bougie1Object.name,
                "bougie1",
                "bougies1Objects",
                "unSeul1"
            );

            if(Tableau.current.player.body.velocity.y === 0)
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
            //ici.allumerBougie2(bougie2.bougie2Object.name);
            ici.allumerGroupeBougie(
                bougie2.bougie2Object.name,
                "bougie2",
                "bougies2Objects",
                "unSeul2"
            );

            if(Tableau.current.player.body.velocity.y === 0)
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
            //ici.allumerBougie3(bougie3.bougie3Object.name);
            ici.allumerGroupeBougie(
                bougie3.bougie3Object.name,
                "bougie3",
                "bougies3Objects",
                "unSeul3"
            );

            if(Tableau.current.player.body.velocity.y === 0)
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
            //ici.allumerTorche(torche.torcheObject.name);
            ici.allumerGroupeTorche(
                torche.torcheObject.name,
                "torche",
                "torches0Objects",
                "unSeul"
            );

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
            //ici.allumerTorche1(torche1.torche1Object.name);
            ici.allumerGroupeTorche(
                torche1.torche1Object.name,
                "torche1",
                "torches1Objects",
                "unSeul21"
            );

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
            //ici.allumerTorche2(torche2.torche2Object.name);
            ici.allumerGroupeTorche(
                torche2.torche2Object.name,
                "torche2",
                "torches2Objects",
                "unSeul22"
            );

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
            //ici.allumerTorche3(torche3.torche3Object.name);
            ici.allumerGroupeTorche(
                torche3.torche3Object.name,
                "torche3",
                "torches3Objects",
                "unSeul23"
            );

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
            //ici.allumerTorche4(torche4.torche4Object.name);
            ici.allumerGroupeTorche(
                torche4.torche4Object.name,
                "torche4",
                "torches4Objects",
                "unSeul24"
            );

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
            //ici.allumerTorche5(torche5.torche5Object.name);
            ici.allumerGroupeTorche(
                torche5.torche5Object.name,
                "torche5",
                "torches5Objects",
                "unSeul25"
            );

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
            //ici.allumerTorche6(torche6.torche6Object.name);
            ici.allumerGroupeTorche(
                torche6.torche6Object.name,
                "torche6",
                "torches6Objects",
                "unSeul26"
            );

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
            //ici.allumerTorche7(torche7.torche7Object.name);
            ici.allumerGroupeTorche(
                torche7.torche7Object.name,
                "torche7",
                "torches7Objects",
                "unSeul27"
            );

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
            //ici.allumerTorche8(torche8.torche8Object.name);
            ici.allumerGroupeTorche(
                torche8.torche8Object.name,
                "torche8",
                "torches8Objects",
                "unSeul28"
            );
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

        this.infCtrl.setDepth(1002);
        this.checkPoints.setDepth(987+1);
        this.platforms5.setDepth(984+1);
        //this.platforms6.setDepth(984);
        //this.collectiblesContainer.setDepth(992+Tableau.current.depthConst);
        this.etoffes.setDepth(991);

        debug.setDepth(z--);

        //this.skyDevant.setDepth(z--);

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
            //console.log("on atteint le checkpoint", checkPointName);
            localStorage.setItem("checkPoint", checkPointName);

            this.checkpointSound = this.sound.add('criCorbeau');

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
            this.checkpointSound.play(musicConfig);
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
    allumerGroupeBougie(name, localStorageName, tiledObjectName, unseulname)
    {
        let ls = localStorage.getItem(localStorageName)
        if (ls !== name)
        {
            localStorage.setItem(localStorageName, name);
            this[unseulname] = true;
            //this.unSeul3 = true;
        }
        else if (ls === name)
        {
            this[tiledObjectName].forEach(obj =>
            {

                if(obj.name === ls && this[unseulname] === true)
                {
                    let sound = this.sound.add('allumageBougie');
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
                    sound.play(musicConfig);

                    this.add.sprite(obj.x+32,obj.y-20,'bougieAnime')
                        .play('bg', true)
                        .setDepth(987+1);
                    let b = this.add.pointlight(obj.x+33, obj.y-24, 0, 200, 0.3)
                        .setDepth(987+1);
                    b.attenuation = 0.05;
                    b.color.setTo(255, 200, 0);
                    this.tweens.add(
                        {
                            targets:b,
                            duration:1,
                            delay:Math.random()*1000,
                            alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                        })
                    this[unseulname] = false;
                    let b2 = this.add.pointlight(obj.x+33, obj.y-24, 0, 10, 0.2)
                        .setDepth(987+1);
                    b2.attenuation = 0.05;
                    b2.color.setTo(255, 200, 0);
                    this.tweens.add(
                        {
                            targets:b2,
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

                    this[unseulname] = false;
                }

            });
        }
    } //---------------------------------- FIN DE ALLUMERBOUGIE ----------------------------------

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
    
                            let bougieSprite = this.add.sprite(bougieObject.x+32,bougieObject.y-20,'bougieAnime').play('bg', true).setDepth(987+1);
                            let bougie2 = this.add.pointlight(bougieObject.x+33, bougieObject.y-24, 0, 200, 0.3).setDepth(987+1);
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
                            let bougie1 = this.add.pointlight(bougieObject.x+33, bougieObject.y-24, 0, 10, 0.2).setDepth(987+1);
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


    allumerGroupeTorche(name, localStorageName, tiledObjectName, unseulname)
    {
        let ls = localStorage.getItem(localStorageName)
        if (ls !== name)
        {
            localStorage.setItem(localStorageName, name);
            this[unseulname] = true;
            //this.unSeul21 = true;
        }
        else if (ls === name && this[unseulname] === true)
        {
            this[tiledObjectName].forEach(obj =>
            {
                if(obj.name === ls)
                {
                    let sound = this.sound.add('allumageTorche');
                    let musicConfig =
                        {
                            mute: false,
                            volume: 0.4,
                            rate : 1,
                            detune: 0,
                            seek: 0,
                            loop: false,
                            delay:0,
                        }
                    sound.play(musicConfig);
                    this.add.sprite(obj.x+32,obj.y-48,'torcheAnime')
                        .play('tch', true)
                        .setDepth(987+1)
                        .setDisplaySize(48,96);
                    let t = this.add.pointlight(obj.x+32, obj.y-49, 0, 200, 0.3)
                        .setDepth(987+1);
                    t.attenuation = 0.05;
                    t.color.setTo(255, 100, 0);

                    this.tweens.add(
                        {
                            targets:t,
                            duration:1,
                            delay:Math.random()*1000,
                            alpha:
                                {
                                    startDelay:Math.random()*5000,
                                    from:0,
                                    to:1,
                                }
                        })
                    this[unseulname] = false;
                    let t2 = this.add.pointlight(obj.x+32, obj.y-49, 0, 20, 0.2)
                        .setDepth(987+1);
                    t2.attenuation = 0.05;
                    t2.color.setTo(255, 50, 0);
                    this.tweens.add(
                        {
                            targets:t2,
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

                    this[unseulname] = false;
                }

            });
        }
    }


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
        /*this.skyDevant.tilePositionX=this.cameras.main.scrollX*10;//*0.6//0.15;
        this.skyDevant.tilePositionY=this.cameras.main.scrollY;//+0//*0.05;*/

    } //---------------------------------- FIN DE MOVEPARALLAX ----------------------------------


    storyBox() // Comme j'ai déjà surchargé mes assets Tiled, cette fois on essaye la méthode de position ( même si j'en raffole pas -_- ).
    {
        if(this.player.body.position.x >= 352-12  && this.player.body.position.y > 1920 && this.player.body.position.x <= 760-12 && this.player.body.position.y <= 1984)
        {
            this.TutoBox1.visible = true;

            if(this.player.body.position.x >= 502-12 && this.player.body.position.x <= 610-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox1,
                    alpha:1,
                    duration: 100,
                    ease: 'Sine.easeInOut',
    
                })
            }else if(this.player.body.position.x < 502-12 || this.player.body.position.x > 610-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox1,
                    alpha:0,
                    duration: 100,
                    ease: 'Sine.easeInOut',
    
                })
            }
        }
        else
        {
            this.TutoBox1.visible = false;
        }

        if(this.player.body.position.x >= 736-12 && this.player.body.position.y > 1920 && this.player.body.position.x <= 1144-12 && this.player.body.position.y <= 1984)
        {
            this.TutoBox2.visible = true;

            if(this.player.body.position.x >= 886-12 && this.player.body.position.x <= 994-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox2,
                    alpha:1,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }else if(this.player.body.position.x < 886-12 || this.player.body.position.x > 994-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox2,
                    alpha:0,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }
        }
        else
        {
            this.TutoBox2.visible = false;
        }

        if(this.player.body.position.x >= 1120-12  && this.player.body.position.y > 1920 && this.player.body.position.x <= 1528-12 && this.player.body.position.y <= 1984)
        {
            this.TutoBox3.visible = true;

            if(this.player.body.position.x >= 1270-12 && this.player.body.position.x <= 1378-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox3,
                    alpha:1,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }else if(this.player.body.position.x < 1270-12 || this.player.body.position.x > 1378-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox3,
                    alpha:0,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }
        }
        else
        {
            this.TutoBox3.visible = false;
        }

        if(this.player.body.position.x >= 288-12  && this.player.body.position.y > 768 && this.player.body.position.x <= 696-12 && this.player.body.position.y <= 832)
        {
            this.TutoBox4.visible = true;

            if(this.player.body.position.x >= 438-12 && this.player.body.position.x <= 546-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox4,
                    alpha:1,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }else if(this.player.body.position.x < 438-12 || this.player.body.position.x > 546-12){
                Tableau.current.tweens.add({
                    targets: this.TutoBox4,
                    alpha:0,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }
        }
        else
        {
            this.TutoBox4.visible = false;
        }

        /*if(this.player.body.position.x >= 288  && this.player.body.position.y > 504 && this.player.body.position.x <= 696 && this.player.body.position.y <= 570)
        {
            this.TutoBox5.visible = true;

            if(this.player.body.position.x >= 438 && this.player.body.position.x <= 546){
                Tableau.current.tweens.add({
                    targets: this.TutoBox5,
                    alpha:1,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }else if(this.player.body.position.x < 438 || this.player.body.position.x > 546){
                Tableau.current.tweens.add({
                    targets: this.TutoBox5,
                    alpha:0,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }
        }
        else
        {
            this.TutoBox5.visible = false;
        }*/

        if(this.player.body.position.x >= 628+32  && this.player.body.position.y > 504 && this.player.body.position.x <= 1036+32 && this.player.body.position.y <= 568)
        {
            this.TutoBox6.visible = true;

            if(this.player.body.position.x >= 778+32 && this.player.body.position.x <= 886+32){
                Tableau.current.tweens.add({
                    targets: this.TutoBox6,
                    alpha:1,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }else if(this.player.body.position.x < 778+32 || this.player.body.position.x > 886+32){
                Tableau.current.tweens.add({
                    targets: this.TutoBox6,
                    alpha:0,
                    duration: 100,
                    ease: 'Sine.easeInOut',

                })
            }
        }
        else
        {
            this.TutoBox6.visible = false;
        }

    } // FIN DE STORYBOX */


    musicHall()
    {
        this.musicConfigWel =
            {
                mute: false,
                volume: 1,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0,
            }
        this.musicConfigWelLow =
            {
                mute: false,
                volume: 0.4,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay: 0,
            }
        this.musicConfigAmb =
            {
                mute: false,
                volume: 0.5,
                rate : 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay:0,
            }
        this.musicConfigEpic =
            {
                mute: false,
                volume: 0.2,
                rate : 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay:0,
            }
        this.musicConfigCalmeG =
            {
                mute: false,
                volume: 0.3,
                rate : 1,
                detune: 0,
                seek: 0,
                loop: true,
                delay:0,
            }

        if(Tableau.current.player.body.position.x < 6592 - 64
            && Tableau.current.player.body.position.y < 832)
        {
            this.musicAmbWelcome();
        }
        else if(Tableau.current.player.body.position.x < 6592 - 64
            && Tableau.current.player.body.position.x < 2500
            && Tableau.current.player.body.position.y >= 832)
        {
            this.musicWelcome();
        }
        else if(Tableau.current.player.body.position.x >= 6592 - 64
            && Tableau.current.player.body.position.y <= 832)
        {
            this.musicEpic();
        }
        else if(Tableau.current.player.body.position.x < 6592 - 64
            && Tableau.current.player.body.position.x > 2500
            && Tableau.current.player.body.position.y > 832)
        {
            this.musicCalmeGrotte();
        }
    }


    musicWelcome()
    {
        if(this.musicWelcomePermission)
        {
            this.game.sound.stopAll();

            let welcome = this.sound.add('welcome');
            welcome.play(this.musicConfigWel);

            this.musicWelcomePermission = false;
            this.musicAmbPermission = true;
            this.musicEpicPermission = true;
            this.musicCalmeGPermission = true;
        }
    }

    musicAmbWelcome()
    {
        if(this.musicAmbPermission)
        {
            this.game.sound.stopAll();

            let welcome = this.sound.add('welcome');
            welcome.play(this.musicConfigWelLow);

            let ambiance = this.sound.add('AmbianceHalloween1');
            ambiance.play(this.musicConfigAmb);

            this.musicAmbPermission = false;
            this.musicWelcomePermission = true;
            this.musicEpicPermission = true;
            this.musicCalmeGPermission = true;
        }
    }


    musicEpic()
    {
        if(this.musicEpicPermission && !this.miniBoss.isDead)
        {
            this.game.sound.stopAll();

            let epic = this.sound.add('epicMusic');
            epic.play(this.musicConfigEpic);

            this.musicEpicPermission = false;
            this.musicWelcomePermission = true;
            this.musicAmbPermission = true;
            this.musicCalmeGPermission = true;
        }
        else if(!this.musicEpicPermission && this.miniBoss.isDead)
        {
            this.game.sound.stopAll();

            let ambiance = this.sound.add('AmbianceHalloween1');
            ambiance.play(this.musicConfigAmb);

            this.musicEpicPermission = true;
            this.musicWelcomePermission = true;
            this.musicAmbPermission = true;
            this.musicCalmeGPermission = true;
        }
    }


    musicCalmeGrotte()
    {
        if(this.musicCalmeGPermission)
        {
            this.game.sound.stopAll();

            this.calmeGrotte = this.sound.add('CalmeGrotte');
            this.calmeGrotte.play(this.musicConfigCalmeG);

            this.musicCalmeGPermission = false;
            this.musicAmbPermission = true;
            this.musicWelcomePermission = true;
            this.musicEpicPermission = true;
        }
    }


    cameraGestion()
    {
        if(Tableau.current.player.body.position.y < 768
            && Tableau.current.player.body.position.y > 654
            && Tableau.current.player.body.position.x > 6592
            && this.cameraBoolean64
            && Tableau.current.player.staticY)
        {
            this.cameras.main.startFollow(this.player, true, 1, 1.5, 0, 64);
            this.cameraBoolean64 = false;
            this.cameraBoolean0 = true;
            this.cameraBoolean128 = true;
        }
        else if(Tableau.current.player.body.position.y >= 768
            && this.cameraBoolean0)
        {
            this.cameras.main.startFollow(this.player, true, 1, 1.5, 0, 128);
            this.cameraBoolean0 = false;
            this.cameraBoolean64 = true;
            this.cameraBoolean128 = true;
        }
        else if(Tableau.current.player.body.position.y <= 654
            && Tableau.current.player.body.position.x > 6592
            && this.cameraBoolean128
            && Tableau.current.player.staticY)
        {
            this.cameras.main.startFollow(this.player, true, 1, 1.5, 0, 0);
            this.cameraBoolean128 = false;
            this.cameraBoolean0 = true;
            this.cameraBoolean64 = true;
        }
    }


    update()
    {
        super.update();
        this.moveParallax();
        this.cameraGestion();

        if(this.scene.sys.game.device.os.desktop)
        {
            this.storyBox();
            this.musicHall();
        }
        else if(!this.scene.sys.game.device.os.desktop && this.musicMobilePlay)
        {
            this.game.sound.stopAll();

            this.musicMobile = this.sound.add('welcome');
            this.musicConfigMobile =
                {
                    mute: false,
                    volume: 0.7,
                    rate: 1,
                    detune: 0,
                    seek: 0,
                    loop: true,
                    delay: 0,
                }
            this.musicMobile.play(this.musicConfigMobile);

            this.musicMobilePlay = false;
        }

        this.monstersContainer.each(function (child) {child.update();})

    }//---------------------------------- FIN DE UPDATE ----------------------------------

}

