// import { orderTable } from '../models';
// import { associations } from '../helpers';
import { pool } from '../db/config';

export class OrderController {
  async create(req, res) {
    try {
      const { body } = req;
      // body.status = 'Pending';
      const order = await new Promise((resolve, reject) => {
        pool
          .query(
            'INSERT INTO orders (car_id, buyer, amount, status, seller) VALUES ($1, $2, $3, $4, $5) returning *',
            [body.car_id, body.buyer, body.amount, body.status, body.seller]
          )
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.order_car(order);
      // await associations.order_user(order);

      res.status(200).json({
        status: 200,
        data: order
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getOrderById(req, res) {
    try {
      const { order_id } = req.params;
      const order = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM orders WHERE id = $1', [order_id])
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.order_car(order);
      // await associations.order_user(order);

      res.status(200).json({
        status: 200,
        data: order
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getOrdersByUser(req, res) {
    try {
      const { user_id } = req.params;
      const orders = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM orders WHERE user_id = $1', [user_id])
          .then((result) => {
            const { rows } = result;
            resolve(rows);
          })
          .catch(err => reject(err));
      });
      //   orders.forEach(async (value) => {
      //     await associations.order_car(value);
      //     await associations.order_user(value);
      //   });

      res.status(200).json({
        status: 200,
        data: orders
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getOrdersBySeller(req, res) {
    try {
      const { seller_id } = req.params;
      const orders = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM orders WHERE seller = $1', [seller_id])
          .then((result) => {
            const { rows } = result;
            resolve(rows);
          })
          .catch(err => reject(err));
      });

      res.status(200).json({
        status: 200,
        data: orders
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
      const { order_id } = req.params;
      const { price } = req.body;
      // await pool.query('ALTER orders DROP COLUMN IF EXISTS new_price_ordered');
      // await pool.query('ALTER orders DROP COLUMN IF EXISTS old_price_ordered');
      await pool.query('ALTER orders ADD COLUMN new_price_offered FLOAT, ADD COLUMN old_price_offered FLOAT');
      const order = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM orders WHERE id = $1', [order_id])
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      const updatedOrder = await new Promise((resolve, reject) => {
        pool
          .query('UPDATE orders SET new_price_offered = $1, old_price_offered = $2, amount = $3 WHERE id = $4 returning *', [
            price, order.amount, price, order_id
          ])
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.order_car(order);
      // await associations.order_user(order);

      res.status(200).json({
        status: 200,
        data: updatedOrder
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async updateStatus(req, res) {
    try {
      const { order_id } = req.params;
      const { status } = req.body;
      const order = await new Promise((resolve, reject) => {
        pool
          .query('UPDATE orders SET status = $1 WHERE id = $2 returning *', [status, order_id])
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.order_car(order);
      // await associations.order_user(order);

      res.status(200).json({
        status: 200,
        data: order
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
          .query('SELECT * FROM orders WHERE user_id = $1', [user_id])
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

  async countBySeller(req, res) {
    try {
      const { seller_id } = req.params;
      const count = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM orders WHERE seller = $1', [seller_id])
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
