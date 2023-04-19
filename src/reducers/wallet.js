import { RETURN_API, QUOTATION_API, UPDATE_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RETURN_API:
    return {
      ...state,
      currencies: action.currencies,
    };
  case QUOTATION_API:
    return {
      ...state,
      currencies: Object.keys(action.payload).filter((coin) => coin !== 'USDT'),
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
      // total: state.total + (
      //   Number(action.payload.quotes[action.payload.currency].ask)
      //   * Number(action.payload.value)),
    };
  default:
    return state;
  }
};

export default wallet;
