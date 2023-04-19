export const USER_DATA = 'USER_DATA';
export const RETURN_API = 'RETURN_API';
export const QUOTATION_API = 'QUOTATION_API';
export const UPDATE_EXPENSES = 'UPDATE_EXPENSES';

export const returnAPI = (payload) => ({
  type: 'RETURN_API',
  currencies: payload,
});

export const fetchAṔI = () => async (dispatch) => {
  const requestAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
  const jsonAPI = await requestAPI.json();
  const filterJson = Object.keys(jsonAPI).filter((element) => element !== 'USDT');
  dispatch(returnAPI(filterJson));
};

export const quotationAPI = async () => {
  const URL = 'https://economia.awesomeapi.com.br/json/all';
  const responseAPI = await fetch(URL);
  const dataAPI = responseAPI.json();
  return dataAPI;
};

export const fetchQuotationAPI = () => async (dispatch) => {
  try {
    dispatch(returnAPI());
    const dataQuotation = await quotationAPI();
    return dispatch(returnAṔI(dataQuotation));
  } catch (error) {
    console.log(error);
  }
};

export const updateTotalExpenses = (payload) => ({
  type: UPDATE_EXPENSES,
  payload,
});
