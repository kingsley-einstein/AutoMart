import { carsTable } from '../models';
import { associations } from '../helpers';

export class CarController {
  async create(req, res) {
    try {
      const { body } = req;
      body.owner = req.query.owner;
      body.status = 'Available';
      const car = await carsTable.create(body);
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        message: err.message
      });
    }
  }

  async markSold(req, res) {
    try {
      const { car_id } = req.params;
      const car = await carsTable.update(car_id, {
        status: 'Sold'
      });
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async updatePrice(req, res) {
    try {
      const { car_id } = req.params;
      const { price } = req.body;
      const car = await carsTable.update(car_id, {
        price
      });
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCar(req, res) {
    try {
      const { car_id } = req.params;
      const car = await carsTable.getCarById(car_id);
      await associations.car_user(car);

      res.status(200).json({
        status: 200,
        data: car
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCarsByStatus(req, res) {
    try {
      const {
        status, min_price, max_price, state, manufacturer
      } = req.query;
      let cars = null;
      cars = min_price && max_price
        ? await carsTable.getCarsByStatusAndPriceRange(status, min_price, max_price)
        : state
          ? await carsTable.getCarsByStatusAndState(status, state)
          : manufacturer
            ? await carsTable.getCarsByStatusAndManufacturer(status, manufacturer)
            : await carsTable.getCarsByStatus(status);
      cars.forEach(async (car) => {
        await associations.car_user(car);
      });

      res.status(200).json({
        status: 200,
        data: cars
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCarsByBodyType(req, res) {
    try {
      const { body_type } = req.query;
      const cars = await carsTable.getCarsByBodyType(body_type);

      res.status(200).json({
        status: 200,
        data: cars
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async deleteCar(req, res) {
    try {
      const { car_id } = req.params;
      const isDeleted = await carsTable.delete(car_id);
      res.status(200).json({
        status: 200,
        data: isDeleted
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCars(req, res) {
    try {
      const cars = await carsTable.getCars();
      res.status(200).json({
        status: 200,
        data: cars
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCarsByStatusOrBodyType(req, res) {
    try {
      const { status, body_type } = req.query;
      if (status) this.getCarsByStatus(req, res);
      else if (body_type) {
        this.getCarsByBodyType(body_type);
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
}
