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