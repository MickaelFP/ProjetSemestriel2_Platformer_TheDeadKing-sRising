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
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=1;
                    break;

                case "a":
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    Tableau.current.projectil = true;
                    console.log("attackOn");
                    break;
                
                case "i":
                    Tableau.current.iPressed = true;
                    //Tableau.current.showInfos = true;
                    console.log("ShowInfosCtrl");
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
                    break;

                case "ArrowDown":
                    Tableau.current.player.directionY=0;
                    break;

                case "a":
                    Tableau.current.player.directionX=0;
                    Tableau.current.player.directionY=0;
                    //Tableau.current.projectil = false;
                    console.log("attackOff");
                    break;
                
                case "i":
                    Tableau.current.iPressed=false;
                    console.log("HideInfosCtrl");
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