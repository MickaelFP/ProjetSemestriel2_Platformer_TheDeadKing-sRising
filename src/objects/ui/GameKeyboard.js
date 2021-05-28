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
                            if(!Tableau.current.isMobile){
                            Tableau.current.player.directionX = 1;
                            Tableau.current.arrowRightPressed = true;
                            }
                            break;
        
                        case "ArrowLeft":
                            if(!Tableau.current.isMobile){
                            Tableau.current.player.directionX = -1;
                            Tableau.current.arrowLeftPressed = true;
                            }
                            break;
        
                        case "ArrowUp":
                            if(!Tableau.current.isMobile){
                            //console.log("je presse arrowUp");
                            Tableau.current.arrowUpPressed = true;
                            Tableau.current.keyboardArrowUp = true;
                            }
                            break;
        
                        case "ArrowDown":
                            if(!Tableau.current.isMobile){
                            Tableau.current.arrowDownPressed = true;
                            Tableau.current.player.directionX = 0;
                            Tableau.current.player.directionY = 1;
                            Tableau.current.tJAfterPressArrowDown();
                            }
                            break;
        
                        case "a":
                            if(!Tableau.current.isMobile){
                            Tableau.current.player.directionX = 0;
                            //Tableau.current.player.directionY = 0;
                            Tableau.current.aPressed = true;
                            //console.log("attackOn");
                            }
                            break;
                        
                        case "i":
                            if(!Tableau.current.isMobile){
                            Tableau.current.iPressed = true;
                            //console.log("ShowInfosCtrl");
                            }
                            break;
        
                        case "Control":
                            if(!Tableau.current.isMobile){
                            //console.log("checkPoint disable");
                            console.log("reset checkpoint");
                            //Tableau.current.ControlPressed = true;
                            }
                            break;
        
                        case "e":
                            //console.log("heal");
                            Tableau.current.ePressed = true;
                            break;
        
                        case "d":
                            if(!Tableau.current.isMobile){
                            //console.log("Tableau.current.dPressed = true");
                            Tableau.current.dPressed = true;
                            }
                            break;
            
                        case "p":
                            if(!Tableau.current.isMobile){
                            //console.log("temps mort");
                            Tableau.current.pPressed = true;
                            }
                            break;
                        
                        /*case "f":
                            Tableau.current.escapePressed = true;
                            break;*/

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
                            if(!Tableau.current.isMobile){
                            //Tableau.current.player.directionX = 1;
                            Tableau.current.arrowRightUnpressed = true;
                            Tableau.current.arrowRightPressed = false;
                            Tableau.current.JumpRetomber();
                            }
                            break;
        
                        case "ArrowLeft":
                            if(!Tableau.current.isMobile){
                            //Tableau.current.player.directionX = -1;
                            Tableau.current.arrowLeftUnpressed = true;
                            Tableau.current.arrowLeftPressed = false;
                            Tableau.current.JumpRetomber();
                            }
                            break;
        
                        case "ArrowUp":
                            if(!Tableau.current.isMobile){
                            //console.log("je relêche arrowUp");
                            Tableau.current.keyboardArrowUp = false;
                            Tableau.current.player.directionY = 0;
                            Tableau.current.arrowUpPressed = false;
                            Tableau.current.firstJump = true;
                            }
                            break;
        
                        case "ArrowDown":
                            if(!Tableau.current.isMobile){
                            Tableau.current.player.directionY = 0;
                            Tableau.current.arrowDownPressed = false;
                            }
                            break;
        
                        case "a":
                            if(!Tableau.current.isMobile){
                            Tableau.current.player.directionX = 0;
                            }
                            break;
                        
                        case "i":
                            if(!Tableau.current.isMobile){
                            //console.log("plus besoin");
                            Tableau.current.iPressed = false;
                            Tableau.current.infosTime = true;
                            }
                            break;
                            
                        case "Control":
                            if(!Tableau.current.isMobile){
                            Tableau.current.ControlPressed = false;
                            }
                            break;
        
                        case "e":
                            if(!Tableau.current.isMobile){
                            Tableau.current.ePressed = false;
                            Tableau.current.oneHeal = false;
                            }
                            break;
        
                        case "d":
                            if(!Tableau.current.isMobile){
                            //console.log("Tableau.current.dPressed = false");
                            Tableau.current.dPressed = false;
                            Tableau.current.timingDash = true;
                            }
                            break;

                        case "p":
                            if(!Tableau.current.isMobile){
                            //console.log("c'est reparti");
                            Tableau.current.pPressed = false;
                            Tableau.current.pauseTime = true;
                            }
                            break;
                            
                        /*case "f":
                            Tableau.current.escapePressed = false;
                            break;*/

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