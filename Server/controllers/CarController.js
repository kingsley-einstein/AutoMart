/* eslint-disable indent */
// // import { carsTable } from '../models';
// import { associations } from '../helpers';
import { pool } from '../db/config';

export class CarController {
  async create(req, res) {
    try {
      const { body, query } = req;
      body.owner = query.owner;
      body.status = 'Available';
      // body.img_url = file.url;
      const car = await new Promise((resolve, reject) => {
        pool
          .query(
            'INSERT INTO cars (owner, created_on, state, price, manufacturer, model, body_type, status, img_url) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *',
            [
              body.owner,
              new Date(),
              body.state,
              body.price,
              body.manufacturer,
              body.model,
              body.body_type,
              body.status,
              body.img_url
            ]
          )
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.car_user(car);

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
      if (req.body.status) {
        res.status(400).json({
          status: 400,
          error: 'Bad request'
        });
      } else {
        const car = await new Promise((resolve, reject) => {
          pool
            .query('UPDATE cars SET status = $1 WHERE id = $2 returning *', ['Sold', car_id])
            .then((data) => {
              const { rows } = data;
              resolve(rows[0]);
            })
            .catch(err => reject(err));
        });
        // await associations.car_user(car);
        res.status(200).json({
          status: 200,
          data: car
        });
      }
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
      const car = await new Promise((resolve, reject) => {
        pool
          .query('UPDATE cars SET price = $1 WHERE id = $2 returning *', [price, car_id])
          .then((data) => {
            const { rows } = data;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.car_user(car);

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
    // console.log(this);
    // const self = this;
    // console.log(self);
    try {
      // console.log(this);
      const { car_id } = req.params;
      const car = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM cars WHERE id = $1', [car_id])
          .then((data) => {
            const { rows } = data;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.car_user(car);

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
          ? await new Promise((resolve, reject) => {
              pool
                .query('SELECT * FROM cars WHERE status = $1 AND price <= $2 AND price >= $3', [
                  status,
                  max_price,
                  min_price
                ])
                .then((data) => {
                  const { rows } = data;
                  resolve(rows);
                })
                .catch(err => reject(err));
            })
          : state
          ? await new Promise((resolve, reject) => {
              pool
                .query('SELECT * FROM cars WHERE status = $1 AND state = $2', [status, state])
                .then((data) => {
                  const { rows } = data;
                  resolve(rows);
                })
                .catch(err => reject(err));
            })
          : manufacturer
          ? await new Promise((resolve, reject) => {
              pool
                .query('SELECT * FROM cars WHERE status = $1 AND manufacturer = $2', [
                  status,
                  manufacturer
                ])
                .then((data) => {
                  const { rows } = data;
                  resolve(rows);
                })
                .catch(err => reject(err));
            })
          : await new Promise((resolve, reject) => {
              pool
                .query('SELECT * FROM cars WHERE status = $1', [status])
                .then((data) => {
                  const { rows } = data;
                  resolve(rows);
                })
                .catch(err => reject(err));
            });
      //   cars.forEach(async (car) => {
      //     await associations.car_user(car);
      //   });

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
      const cars = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM cars WHERE body_type = $1', [body_type])
          .then((data) => {
            const { rows } = data;
            resolve(rows);
          })
          .catch(err => reject(err));
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

  async deleteCar(req, res) {
    try {
      const { car_id } = req.params;
      await pool
        .query('DELETE FROM cars WHERE id = $1', [car_id])
        .then(() => {
          res.status(200).json({
            status: 200,
            data: 'Item successfully deleted'
          });
        })
        .catch((err) => {
          res.status(500).json({
            status: 500,
            error: err.message
          });
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
      const cars = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM cars')
          .then((result) => {
            const { rows } = result;
            resolve(rows);
          })
          .catch(err => reject(err));
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

  async getCarsByStatusOrBodyType(req, res) {
    try {
      const { status, body_type } = req.query;
      if (status) this.getCarsByStatus(req, res);
      else if (body_type) {
        this.getCarsByBodyType(req, res);
      }
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getCarsByUser(req, res) {
    try {
      const { user_id } = req.params;
      const cars = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM cars WHERE user_id = $1', [user_id])
          .then((result) => {
            const { rows } = result;
            resolve(rows);
          })
          .catch(err => reject(err));
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

  async count(req, res) {
    try {
      const { user_id } = req.params;
      const count = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM cars WHERE user_id = $1', [user_id])
          .then((result) => {
            const { rowCount } = result;
            resolve(rowCount);
          })
          .catch(err => reject(err));
      });

      res.status(200).json({
        status: 200,
        data: count
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
}
