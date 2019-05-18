import {
  flagsTable, usersTable, orderTable, carsTable,
} from '../models';

export const associations = {
  car_user: (car) => {
    carsTable.getCars().forEach((value) => {
      if (value.id === car.id) {
        car.user = usersTable.getAllUsers().find(item => item.id == car.owner);
      }
    });
  },
  order_user: (order) => {
    orderTable.getOrders().forEach((value) => {
      if (value.id === order.id) {
        order.user = usersTable.getAllUsers().find(item => item.id == order.buyer);
      }
    });
  },
  order_car: (order) => {
    orderTable.getOrders().forEach((value) => {
      if (value.id === order.id) {
        order.car = carsTable.getCars().find(item => item.id == order.car_id);
      }
    });
  },
  flag_car: (flag) => {
    flagsTable.getFlags().forEach((value) => {
      if (value.id === flag.id) {
        flag.car = carsTable.getCars().find(item => item.id == flag.car_id);
      }
    });
  },
};
