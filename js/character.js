class Character {
    constructor(hp, maxHp, energy) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.regenHp = 1;
        this.hpDisplay = $('.healthBar > .progress-bar');
        this.hpDisplay.css("width", this.hp/this.maxHp*100 + "%").html(this.hp + " / " + this.maxHp + " hp");
        this.energy = energy;
        this.energyDisplay = $('.energyBar > .progress-bar');
        this.energyDisplay.css("width", this.energy + "%").html(this.energy + "%");

        this.regen = false;
        this.activity = false;
    }

    setEnergy (amount){
        this.energy += amount;

        if(this.energy >= 100){
            this.energy = 100;
        }
        else if(this.energy <= 0){
            this.energy = 0;
        }

        let energy = Tools.roundUp(this.energy,2);

        this.energyDisplay.css("width", energy + "%").html(energy + "%");
    }

    startActivity(){
        let self = this;
        this.activity = setInterval(function(){ self.setEnergy(-0.01/4)},1000);
        //console.log("Exhausted in " + (this.energy/(0.01/4))/60/60 + " hours");
    }



    setHp (amount){
        this.hp += amount;

        if (this.hp >= this.maxHp){
            this.stopRegen();
            this.hp = this.maxHp;
        }
        else if(this.hp <= 0){
            this.hp = 0;
            this.stopRegen();
            this.die();
        }
        else if (this.regen === false){
            this.startRegen();
        }
        this.hpDisplay.css("width", this.hp/this.maxHp*100 + "%").html(this.hp + " / " + this.maxHp + " hp");
    }

    startRegen(){
        console.log("Regen started");
        let self = this;
        this.regen = setInterval(function(){ self.setHp(self.regenHp)},500);
    }

    stopRegen(){
        console.log("Regen stopped");
        clearInterval(this.regen);
        this.regen = false;
    }

    die(){
        Game.log("You died...", "logMessageWarning");
    }

}