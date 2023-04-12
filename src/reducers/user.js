import { USER_DATA } from '../actions';

const INITIAL_STATE = {
  email: '',
  pass: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_DATA:
    return {
      ...state,
      email: action.email,
      pass: action.password,
    };
  default:
    return state;
  }
};

export default user;
