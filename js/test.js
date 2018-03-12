class Rectangle {
    constructor(hauteur, largeur) {
        this.hauteur = hauteur;
        this.largeur = largeur;
        this.amount = 0;
    }

    get area() {
        return this.amount;
    }

    calcArea() {
        this.amount = this.largeur * this.hauteur;
        this.displayArea();
    }

    displayArea(){
        console.log(this.amount + "Lol");
    }


}

//const carre = new Rectangle(10, 10);

//carre.calcArea();
