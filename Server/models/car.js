let id = 1;

export const carsTable = {
  cars: [{
    id,
    owner: 1,
    created_on: new Date(),
    state: 'new',
    status: 'available',
    price: 145.0,
    manufacturer: 'Toyota',
    model: 'Camry',
    body_type: 'car'
  }],
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
  /**
   *
   * @param {number} car_id
   */
  getCarById(car_id) {
    let car = {};
    this.cars.forEach((value) => {
      if (value.id == car_id) {
        car = value;
      }
    });

    return car;
  },
  /**
   *
   * @param {string} status
   */
  getCarsByStatus(status) {
    const arr = this.cars.filter(value => value.status === status);
    return arr;
  },
  /**
   *
   * @param {string} status
   * @param {number} min_price
   * @param {number} max_price
   */
  getCarsByStatusAndPriceRange(status, min_price, max_price) {
    const arr = this.cars.filter(
      value => value.status === status && value.price >= min_price && value.price <= max_price
    );
    return arr;
  },
  /**
   *
   * @param {string} status
   * @param {string} state
   */
  getCarsByStatusAndState(status, state) {
    const arr = this.cars.filter(value => value.status === status && value.state === state);
    return arr;
  },
  /**
   *
   * @param {string} status
   * @param {string} manufacturer
   */
  getCarsByStatusAndManufacturer(status, manufacturer) {
    const arr = this.cars.filter(
      value => value.status === status && value.manufacturer === manufacturer
    );
    return arr;
  },
  /**
   *
   * @param {string} body_type
   */
  getCarsByBodyType(body_type) {
    const arr = this.cars.filter(value => value.body_type === body_type);
    return arr;
  },
  /**
   *
   * @param {number} car_id
   * @param {*} param1
   */
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
  /**
   *
   * @param {number} car_id
   */
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
