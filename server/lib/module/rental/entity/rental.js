"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rental {
    constructor(id, fk_car, fk_client, price_per_day, date_from, date_until, total_price, payment_method, is_paid, status, Car, Client) {
        this.id = id;
        this.fk_car = fk_car;
        this.fk_client = fk_client;
        this.price_per_day = price_per_day;
        this.date_from = date_from;
        this.date_until = date_until;
        this.total_price = total_price;
        this.payment_method = payment_method;
        this.is_paid = is_paid;
        this.status = status;
        this.Car = Car;
        this.Client = Client;
        this.total_price = this.calculateTotalPrice();
    }
    calculateTotalPrice() {
        let from = new Date(this.date_from);
        let until = new Date(this.date_until);
        let differenceInTime = until.getTime() - from.getTime();
        let differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return (this.total_price = differenceInDays * Number(this.price_per_day));
    }
    setFinished() {
        if (this.is_paid !== true) {
            throw new Error("The rental isn't paid yet!");
        }
        this.status = 'finished';
        return this;
    }
}
exports.default = Rental;
//# sourceMappingURL=rental.js.map