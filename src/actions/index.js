export const USER_DATA = 'USER_DATA';
export const RETURN_API = 'RETURN_API';

export const returnAPI = (payload) => ({
  type: 'RETURN_API',
  currencies: payload,
});

export const fetchAṔI = () => async (dispatch) => {
  const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const jsonAPI = await requestAPI.json();
  const filterJson = Object.keys(jsonAPI).filter((element) => element !== 'USDT');
  console.log(filterJson);
  dispatch(returnAPI(filterJson));
};
