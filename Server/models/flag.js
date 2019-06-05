let id = 1;

export const flagsTable = {
  flags: [
    {
      id,
      car_id: 1,
      created_on: new Date(),
      reason: 'Weird demands',
      description: 'No Description'
    }
  ],
  create(obj) {
    id++;
    const item = obj;
    item.id = id;
    item.created_on = new Date();
    this.flags.push(item);

    return item;
  },
  getFlagById(flag_id) {
    let flag = {};
    this.flags.forEach((value) => {
      if (value.id == flag_id) {
        flag = value;
      }
    });

    return flag;
  },
  getFlags() {
    return this.flags;
  },
  delete(flag_id) {
    if (!flag_id) this.flags.shift();
    else {
      this.flags.forEach((value, index) => {
        if (value.id == flag_id) {
          this.flags.splice(index, 1);
        }
      });
    }
    return 'Item successfully deleted';
  }
};
