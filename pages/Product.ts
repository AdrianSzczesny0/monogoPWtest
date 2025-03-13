export class Product{
    public name:string | null;
    public quantity:string | null;
    public price:string | null;

    constructor(name:string | null, quantity:string | null, price:string | null){
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}