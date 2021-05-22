/**
 * Un objet qui écoute les touches du clavier et mouvements sur le pad et qui influent le déplacement du joueur
 */
class GameKeyboard extends Phaser.GameObjects.Container{
    constructor(scene, x, y) {
        super(scene, x, y)
        scene.add.existing(this);

            this.cursors = scene.input.keyboard.createCursorKeys();

            scene.input.keyboard.on('keydown', function(kevent){
                if(Tableau.current && Tableau.current.player)
                {
                    console.log(kevent.key);
                    switch (kevent.key){
                        case "ArrowRight":
                            Tableau.current.player.directionX = 1;
                            Tableau.current.arrowRightPressed = true;
                            break;
        
                        case "ArrowLeft":
                            Tableau.current.player.directionX = -1;
                            Tableau.current.arrowLeftPressed = true;
                            break;
        
                        case "ArrowUp":
                            Tableau.current.player.directionY=-1;
                            Tableau.current.arrowUpPressed = true;
                            Tableau.current.jumpStop = false;
                            break;
        
                        case "ArrowDown":
                            Tableau.current.arrowDownPressed = true;
                            Tableau.current.player.directionX = 0;
                            Tableau.current.player.directionY = 1;
                            Tableau.current.tJAfterPressArrowDown();
                            break;
        
                        case "a":
                            Tableau.current.player.directionX = 0;
                            //Tableau.current.player.directionY = 0;
                            Tableau.current.aPressed = true;
                            //console.log("attackOn");
                            break;
                        
                        case "i":
                            Tableau.current.iPressed = true;
                            //Tableau.current.showInfos = true;
                            //console.log("ShowInfosCtrl");
                            break;
        
                        case "Control":
                            //console.log("checkPoint disable");
                            //Tableau.current.ControlPressed = true;
                            break;
        
                        case "e":
                            //console.log("heal");
                            Tableau.current.ePressed = true;
                            break;
        
                        case "d":
                            //console.log("Tableau.current.dPressed = true");
                            Tableau.current.dPressed = true;
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
                }
            });

            scene.input.keyboard.on('keyup', function(kevent){
                if(Tableau.current && Tableau.current.player)
                {
                    switch (kevent.key){
                        case "ArrowRight":
                            Tableau.current.player.directionX = 1;
                            Tableau.current.arrowRightPressed = false;
                            Tableau.current.JumpRetomber();
                            break;
        
                        case "ArrowLeft":
                            Tableau.current.player.directionX = -1;
                            Tableau.current.arrowLeftPressed = false;
                            Tableau.current.JumpRetomber();
                            break;
        
                        case "ArrowUp":
                            Tableau.current.player.directionY=0;
                            Tableau.current.arrowUpPressed = false;
                            break;
        
                        case "ArrowDown":
                            Tableau.current.player.directionY = 0;
                            Tableau.current.arrowDownPressed = false;
                            break;
        
                        case "a":
                            Tableau.current.player.directionX = 0;
                            break;
                        
                        case "i":
                            Tableau.current.iPressed = false;
                            break;
                            
                        case "Control":
                            Tableau.current.ControlPressed = false;
                            break;
        
                        case "e":
                            Tableau.current.ePressed = false;
                            Tableau.current.oneHeal = false;
                            break;
        
                        case "d":
                            //console.log("Tableau.current.dPressed = false");
                            Tableau.current.dPressed = false;
                            Tableau.current.timingDash = true;
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
                }

            });

        

    }


}