export const USER_DATA = 'USER_DATA';
export const UPDATE_CURRENCY = 'UPDATE_CURRENCY';
export const UPDATE_WALLET = 'UPDATE_WALLET';

export const userData = ({ email, pass }) => ({
  type: USER_DATA,
  email,
  pass,
});

export const updateCurrency = (payload) => ({
  type: UPDATE_CURRENCY,
  payload,
});

export const updateWallet = (payload) => ({
  type: UPDATE_WALLET,
  payload,
});

export const fetchCurrency = () => async (dispatch) => {
  const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const jsonAPI = await requestAPI.json();
  // const filterJson = Object.keys(jsonAPI).filter((element) => element !== 'USDT');
  dispatch(updateCurrency(jsonAPI));
};

export const quotationAPI = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const responseAPI = await fetch(URL);
  const dataAPI = await responseAPI.json();
  return dataAPI;
};
