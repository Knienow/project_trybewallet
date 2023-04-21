// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { UPDATE_CURRENCY, UPDATE_WALLET } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_CURRENCY:
    return {
      ...state,
      // currencies: action.currencies,
      currencies: Object.keys(action.payload).filter((coin) => coin !== 'USDT'),
    };
  case UPDATE_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
      total: state.total + (
        Number(action.payload.exchangeRates[action.payload.currency].ask)
          * Number(action.payload.value)),
    };
  default:
    return state;
  }
};

export default wallet;
