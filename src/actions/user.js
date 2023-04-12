import { USER_DATA } from '.';

const userData = ({ email, password }) => ({
  type: USER_DATA,
  email,
  password,
});

export default userData;
