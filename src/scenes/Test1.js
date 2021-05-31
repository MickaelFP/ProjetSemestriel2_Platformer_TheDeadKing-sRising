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

                this.unSeul21 = false;
            }

        });
    }
} //---------------------------------- FIN DE ALLUMERTORCHE1 ----------------------------------