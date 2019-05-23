import { flagsTable } from '../models';
import { associations } from '../helpers';

export class FlagController {
  async create(req, res) {
    try {
      const flag = await flagsTable.create(req.body);
      await associations.flag_car(flag);

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
      const flags = await flagsTable.getFlags();
      flags.forEach(async (flag) => {
        await associations.flag_car(flag);
      });

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
      const flag = await flagsTable.getFlagById(flag_id);
      await associations.flag_car(flag);

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
      const deleted = await flagsTable.delete(flag_id);

      res.status(200).json({
        status: 200,
        data: deleted
      });
    } catch (err) {
      res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }
}
