class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
    }
    preload(){
        this.load.image('ui/full-screen-icon', 'assets/ui/full-screen.png');
    }
    create (){
        console.log("create Ui")

        /*****LIST DE FONT TEXTE ( ils ne fonctionnes pas tous malheureusement :'[ )*****
        
        //  Hanalei Fill*  //  Courrier  //  Verdana  //  Georgia  //  Arial*  //  Tahoma  //  Marlett*  //  Lucida Console*  //  Trebuchet MS*
        //  Webdings*  //  Impact*  //  visitor  //  ...

        */

        /********** ON DEFINIT L'AFFICHAGE DU TEXT ET DE L'UI A L'ECRAN **********/

        this.score=0;
        /**
         * Le champ texte du score
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._scoreText = this.add.text(16, 16, '', {
            font:'32px "visitor"',
            fill: '#fff'
        });

        /**
         * Le champ texte avec la clé du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauText = this.add.text(this.sys.canvas.width-16, 16, '', {
            font:'32px "visitor"',
            align: 'right',
            fill: '#fff'
        })

        /**
         * Le champ texte avec la classe du tableau
         * @type {Phaser.GameObjects.Text}
         * @private
         */
        this._tableauTextClass = this.add.text(this.sys.canvas.width-16, 16+32, '', {
            font:'24px "visitor"',
            align: 'right',
            fill: '#fff',
        }).setAlpha(0.5)

        this._tableauText.originX=1;
        this._tableauTextClass.originX=1;

        this._tableauText.setInteractive();
        this._tableauText.on('pointerdown', function () {
            Tableau.suivant();
        })

        //met l'ui au dessus du tableau
        this.scene.bringToTop();
        //lance le tableau
        this.scene.launch(this.game.scene.scenes[0].scene.key);


        let me=this;
        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne(0)
        },100)

        setTimeout(function(){
            me.tableau="Hello World";
            me.perdre(0)
        },100)

        //let pad=new GamePad(this,0,0);
        let pad=new GamePadButtons(this,0,0);
        pad.x=this.sys.canvas.width-pad.size-32;
        pad.y=this.sys.canvas.height-pad.size-32;



        let btFs=this.add.image(0,0,'ui/full-screen-icon');
        btFs.setInteractive();
        btFs.on('pointerup', function () {

            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            }else{
                this.scale.startFullscreen();
            }

        }, this);
        btFs.setOrigin(1,1)
        btFs.setDisplaySize(48,48)
        btFs.x=this.sys.canvas.width;
        btFs.y=this.sys.canvas.height;

    }

    /********** QUAND ON GAGNE DES POINTS **********/
    gagne(points=10)
    {
        let me=this;
        me.score+=points;
        if (me.score > 0)
        {
            me._scoreText.setText('Ossements: ' + me.score);
        }
        else if (me.score < 0)
        {
            me.score = 0;
            me.score+=points;
            me._scoreText.setText('Ossements: ' + me.score);
        }
        else
        {
            me.score = 0;
        }
    }

    /********** QUAND ON PERD DES POINTS **********/
    perdre(points=30)
    {
        let me=this;
        me.score-=points;
        if (me.score > 0)
        {
            me._scoreText.setText('Ossements: ' + me.score);
        }
        else if (me.score < 0)
        {
            me.score = 0;
            me._scoreText.setText('Ossements: ' + me.score);
        }
        else
        {
            me.score = 0;
        }
    }

    update(){
        if(Tableau.current){
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
