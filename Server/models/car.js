let id = 0;

export const carsTable = {
    cars: [],
    create(obj) {
        id++;
        obj.id = id;
        obj.created_on = new Date();
        this.cars.push(obj);

        return obj;
    },
    getCars() {
        return this.cars;
    },
    getCarById(id) {
        let car = {}
        this.cars.forEach(value => {
            if (value.id == id) 
                car = value;
        });

        return car;
    },
    getCarsByStatus(status) {
        let arr = this.cars.filter(value => value.status === status);
        return arr;
    },
    update(id, { status, price }) {
        let car = {};
        this.cars.forEach(value => {
            if (value.id == id) 
                car = value;
        });
        car.status = status ? status : car.status;
        car.price = price ? price : car.price;
        
        this.cars.forEach((value, index) => {
            if (value.id === car.id) 
                this.cars.splice(index, 1, car);
        });

        return car;
    },
    delete(id) {
        if(!id) this.cars.shift()
        else this.cars.forEach((value, index) => {
            if (value.id === id)
                this.cars.splice(index, 1);
        });

        return true;
    }
}