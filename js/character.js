class Character {
    constructor(hp, maxHp, energy) {
        this.hp = hp;
        this.maxHp = maxHp;
        this.hpDisplay = $('.healthBar > progress-bar');
        this.energy = energy;

    }

    setHp (amount){
        this.hp += amount;
        this.hpDisplay.css("width", this.hp/this.maxHp*100).html(this.hp + " / " + this.maxHp + " hp");
    }

}