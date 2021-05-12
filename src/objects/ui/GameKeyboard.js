/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GameKeyboard extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this);

        this.cursors = scene.input.keyboard.createCursorKeys();

        scene.input.keyboard.on('keydown', function(kevent){
            console.log(kevent.key);
            switch (kevent.key){
                case "ArrowRight":
                    Tableau.current.player.directionX=1;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=-1;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=-1;
                    Tableau.current.arrowUpPressed = true;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=1;
                    break;

                case "a":
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    Tableau.current.aPressed = true;
                    console.log("attackOn");
                    break;
                
                case "i":
                    Tableau.current.iPressed = true;
                    //Tableau.current.showInfos = true;
                    console.log("ShowInfosCtrl");
                    break;

                case "Control":
                    console.log("checkPoint disable");
                    Tableau.current.ControlPressed = true;
                    break;

                case "e":
                    console.log("heal");
                    Tableau.current.ePressed = true;
                    break;
    
                case "r":/*
                    Tableau.current.cameras.main.fadeOut(1000, 0, 0, 0)
                    Tableau.current.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
                    {
                        Tableau.current.game.scene.start(Welcome);
                        Tableau.current.scene.start("bootGame");
                    })
                    break;*/
            }
        });
        scene.input.keyboard.on('keyup', function(kevent){
            switch (kevent.key){
                case "ArrowRight":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowLeft":
                    Tableau.current.player.directionX=0;
                    break;

                case "ArrowUp":
                    Tableau.current.player.directionY=0;
                    Tableau.current.arrowUpPressed = false;
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=0;
                    break;

                case "a":
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    //Tableau.current.aPressed = false;
                    console.log("attackOff");
                    break;
                
                case "i":
                    Tableau.current.iPressed=false;
                    console.log("HideInfosCtrl");
                    break;
                    
                case "Control":
                    Tableau.current.ControlPressed = false;
                    break;

                case "e":
                    console.log("healNoMore");
                    Tableau.current.ePressed = false;
                    break;
                
                case "r":/*
                    Tableau.current.cameras.main.fadeOut(1000, 0, 0, 0)
                    Tableau.current.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => 
                    {
                        Tableau.current.game.scene.start(Welcome);
                        Tableau.current.scene.start("bootGame");
                    })
                    break;*/
            }
        });



    }


}