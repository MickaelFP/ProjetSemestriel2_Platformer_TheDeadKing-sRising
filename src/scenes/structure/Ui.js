class Ui extends Phaser.Scene{
    constructor ()
    {
        super({ key: 'ui', active: true });
        window.ui=this;
        this.hp = 3;
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
        * Le champ texte des points de vie
        * @type {Phaser.GameObjects.Text}
        * @private
        */
        this._hpText = this.add.text(16, 16+80, '', {
            font:'16px "visitor"',
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
            me.gagne1(0)
        },100)

        setTimeout(function(){
            me.tableau="Hello World";
            me.gagne2(0)
        },100)

        setTimeout(function(){
            me.tableau="Hello World";
            me.perdre(0)
        },100)

        setTimeout(function(){
            me.tableau="Hello World";
            me.perdre1(0)
        },100)

        setTimeout(function(){
            me.tableau="Hello World";
            me.perdre2(0)
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

    //------------------------------------------------ Gestion des points de score ---------------------------------

    /********** QUAND ON GAGNE DES POINTS **********/
    // Simple
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
            me._scoreText.setText('Ossements: ' + me.score);
        }
        else
        {
            me.score = 0;
        }
    }
    // Moyen
    gagne1(points=20)
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
            me._scoreText.setText('Ossements: ' + me.score);
        }
        else
        {
            me.score = 0;
        }
    }
    // Elevé
    gagne2(points=100)
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
            me._scoreText.setText('Ossements: ' + me.score);
        }
        else
        {
            me.score = 0;
        }
    }

    /********** QUAND ON PERD DES POINTS **********/
    // Jeter des os
    perdre(points=2)
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
    // Se faire blesser
    perdre1(points=20)
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
    // Mourrir
    perdre2(points=500)
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
    

    //------------------------------------------------ Gestion des points de vie ---------------------------------
    //
    /********** QUAND ON RECUPERE DES POINTS DE VIE **********/

    gagnePV(points=1)
    {
        let me = this;
        me.hp += points;
        if (me.hp > 3)
        {
            this.hp = 3;
        }
    }
    //
    /********** QUAND ON PERD DES POINTS DE VIE **********/
    losePV(points=1)
    {
        let me = this;
        me.hp -= points;
        this._hpText.setText('Status : ');
        if(me.hp < 1)
        {
            me.hp = 3;
            //this._hpText.setText('Status : ');
        }
    }
    //
    //---------------------------------

    update(){
        if(Tableau.current){
            this._tableauText.setText(Tableau.current.scene.key);
            this._tableauTextClass.setText(Tableau.current.constructor.name);
        }
    }
}
