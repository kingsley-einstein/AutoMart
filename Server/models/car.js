let id = 0;

export const carsTable = {
  cars: [],
  create(obj) {
    id++;
    const item = obj;
    item.id = id;
    item.created_on = new Date();
    this.cars.push(item);

    return item;
  },
  getCars() {
    return this.cars;
  },
  getCarById(car_id) {
    let car = {};
    this.cars.forEach((value) => {
      if (value.id == car_id) {
        car = value;
      }
    });

    return car;
  },
  getCarsByStatus(status) {
    const arr = this.cars.filter(value => value.status === status);
    return arr;
  },
  getCarsByStatusAndPriceRange(status, min_price, max_price) {
    const arr = this.cars.filter(
      value => value.status === status && value.price >= min_price && value.price <= max_price
    );
    return arr;
  },
  getCarsByStatusAndState(status, state) {
    const arr = this.cars.filter(value => value.status === status && value.state === state);
    return arr;
  },
  getCarsByStatusAndManufacturer(status, manufacturer) {
    const arr = this.cars.filter(
      value => value.status === status && value.manufacturer === manufacturer
    );
    return arr;
  },
  getCarsByBodyType(body_type) {
    const arr = this.cars.filter(value => value.body_type === body_type);
    return arr;
  },
  update(car_id, { status, price }) {
    let car = {};
    this.cars.forEach((value) => {
      if (value.id == car_id) {
        car = value;
      }
    });
    car.status = status || car.status;
    car.price = price || car.price;

    this.cars.forEach((value, index) => {
      if (value.id == car.id) {
        this.cars.splice(index, 1, car);
      }
    });

    return car;
  },
  delete(car_id) {
    if (!car_id) this.cars.shift();
    else {
      this.cars.forEach((value, index) => {
        if (value.id == car_id) {
          this.cars.splice(index, 1);
        }
      });
    }

    return true;
  }
};