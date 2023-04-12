import { USER_DATA } from '.';

const userData = ({ email, pass }) => ({
  type: USER_DATA,
  email,
  pass,
});

export default userData;
