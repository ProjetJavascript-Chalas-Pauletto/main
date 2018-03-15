class Job {
    constructor(name, exp) {
        this.name = name;
        this.exp = exp;
    }

    addExp(amount) {
        this.exp += amount;
    }

    displayJob() {

        $('.job1').css("width", this.exp + "%").html(this.exp + "%");
        console.log(this);

        /*for(let i= 0; i < this.resourceInventory.length; ++i){
            txt += this.resources[this.resourceInventory[i][0]][0] + " : " + this.resourceInventory[i][1] + " - ";
        }*/
    }

}