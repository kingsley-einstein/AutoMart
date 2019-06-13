import { environment } from '../environment';

const { secretOrKey } = environment;

export const authObj = {
  options: {
    secretOrKey
  }
};
