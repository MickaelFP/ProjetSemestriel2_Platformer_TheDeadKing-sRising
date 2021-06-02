/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GamePadButtons extends GameKeyboard 
{
    constructor(scene, x, y, size = 100) 
    {
        super(scene, x, y)
        scene.add.existing(this);


        this.size = size;
        let w = this.size / 2;
        let pad2 = scene.add.container();

        let btnUP = scene.add.circle(0, 0, w / 2, 0xffffff, 0.3).setInteractive();
        let btnLEFT = scene.add.circle(0, 0, w / 2, 0xffffff, 0.3).setInteractive();
        let btnRIGHT = scene.add.circle(0, 0, w / 2, 0xffffff, 0.3).setInteractive();
        let btnDOWN = scene.add.circle(0, 0, w / 2, 0xffffff, 0.3).setInteractive();

        let btnA = scene.add.circle(0, 0, w / 2, 0xffffff, 0.3).setInteractive();
        let btnE = scene.add.circle(0, 0, w / 2, 0xffffff, 0.3).setInteractive();
        let btnD = scene.add.circle(0, 0, w / 2, 0xffffff, 0.3).setInteractive();


        this.add(btnUP);
        this.add(btnLEFT);
        this.add(btnRIGHT);
        this.add(btnDOWN);

        this.add(btnA);
        this.add(btnE);
        this.add(btnD);

        btnUP.x = w * 1;
        btnLEFT.x = w * 0;
        btnRIGHT.x = w * 2;
        btnLEFT.y = w;
        btnRIGHT.y = w;
        btnDOWN.x = w;
        btnDOWN.y = w * 2;

        btnA.x = scene.sys.canvas.width * -1 + w * 4;
        btnA.y = w * 1;
        btnE.x = scene.sys.canvas.width * -1 + w * 4.8;
        btnE.y = w * 2;
        btnD.x = scene.sys.canvas.width * -1 + w * 5.2;
        btnD.y = w * 0.8;

        // On appuie
        btnLEFT.on('pointerdown', function () {

            console.log("btnLEFT");
            Tableau.current.arrowRightPressed = false;
            Tableau.current.player.directionX = -1;
            Tableau.current.arrowLeftPressed = true;
            
        });
        btnRIGHT.on('pointerdown', function () 
        {
            console.log("btnRIGHT");
            Tableau.current.arrowLeftPressed = false;
            Tableau.current.player.directionX = 1;
            Tableau.current.player.directionX = 1;
            Tableau.current.arrowRightPressed = true;
        });
        btnUP.on('pointerdown', function () 
        {
            console.log("btnUP");
            Tableau.current.arrowUpPressed = true;
        });
        btnDOWN.on('pointerdown', function () 
        {
            console.log("btnDOWN");
            Tableau.current.arrowDownPressed = true;
            Tableau.current.player.directionX = 0;
            Tableau.current.player.directionY = 1;
            Tableau.current.tJAfterPressArrowDown();
        });

        // On relâche
        btnLEFT.on('pointerup', function () 
        {
            console.log("btnLEFT  off");
            Tableau.current.player.directionX = 0;
            Tableau.current.arrowLeftPressed = false;
            Tableau.current.JumpRetomber();
        });
        btnRIGHT.on('pointerup', function () 
        {
            console.log("btnRIGHT  off");
            Tableau.current.player.directionX = 0;
            Tableau.current.arrowRightPressed = false;
            Tableau.current.JumpRetomber();
        });
        btnUP.on('pointerup', function () 
        {
            console.log("btnUP  off");
            Tableau.current.player.directionY = 0;
            Tableau.current.arrowUpPressed = false;
            Tableau.current.firstJump = true;
        });
        btnDOWN.on('pointerup', function () 
        {
            console.log("btnDOWN  off");
            Tableau.current.player.directionY = 0;
            Tableau.current.arrowDownPressed = false;
        });


        btnA.on('pointerdown', function () 
        {
            Tableau.current.player.directionX = 0;
            //Tableau.current.player.directionY = 0;
            Tableau.current.aPressed = true;
        });
        btnA.on('pointerup', function () 
        {
            Tableau.current.player.directionX = 0;
            //Tableau.current.player.directionY = 0;
        });

        btnE.on('pointerdown', function () 
        {
            console.log("heal");
            Tableau.current.ePressed = false;
            Tableau.current.oneHeal = false;
            Tableau.current.ePressed = true;
        });
        btnE.on('pointerup', function () 
        {
            console.log("healNoMore");
            Tableau.current.ePressed = false;
            Tableau.current.oneHeal = false;
        });

        btnD.on('pointerdown', function () 
        {
            console.log("Tableau.current.dPressed = true");
            //Tableau.current.dPressed = false;
            Tableau.current.dPressed = true;
        });
        btnD.on('pointerup', function () 
        {
            console.log("Tableau.current.dPressed = false");
            Tableau.current.dPressed = false;
            Tableau.current.timingDash = true;
        });

    }

}