// import { flagsTable } from '../models';
// import { associations } from '../helpers';
import { pool } from '../db/config';

export class FlagController {
  async create(req, res) {
    try {
      const { body } = req;
      const flag = await new Promise((resolve, reject) => {
        pool
          .query(
            'INSERT INTO flags(car_id, created_on, reason, description) values($1, $2, $3, $4)',
            [body.car_id, new Date(), body.reason, body.description]
          )
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      // await associations.flag_car(flag);

      res.status(200).json({
        status: 200,
        data: flag
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getAllFlags(req, res) {
    try {
      const flags = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM flags')
          .then((result) => {
            const { rows } = result;
            resolve(rows);
          })
          .catch(err => reject(err));
      });
      //   flags.forEach(async (flag) => {
      //     await associations.flag_car(flag);
      //   });

      res.status(200).json({
        status: 200,
        data: flags
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async getFlag(req, res) {
    try {
      const { flag_id } = req.params;
      const flag = await new Promise((resolve, reject) => {
        pool
          .query('SELECT * FROM flags WHERE id = $1', [flag_id])
          .then((result) => {
            const { rows } = result;
            resolve(rows[0]);
          })
          .catch(err => reject(err));
      });
      //   await associations.flag_car(flag);

      res.status(200).json({
        status: 200,
        data: flag
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  async deleteFlag(req, res) {
    try {
      const { flag_id } = req.params;
      await pool
        .query('DELETE FROM flags WHERE id = $1', [flag_id])
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
}
