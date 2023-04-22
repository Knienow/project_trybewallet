import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';
import App from '../App';
import Wallet from '../pages/Wallet';
import {
  TEST_ID_EMAIL_INPUT,
  TEST_ID_PASS_INPUT,
  TEST_ID_CURRENCY_INPUT,
  TEST_ID_VALUE_INPUT,
  TEST_ID_METHOD_INPUT,
  TEST_ID_TAG_INPUT,
  TEST_ID_DESCRIPTION,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
  TEST_FAIL_EMAIL_1,
  TEST_FAIL_EMAIL_2,
  TEST_FAIL_EMAIL_3,
  TEST_FAIL_PASSWORD,
  TEST_VALID_TAG,
  TEST_VALID_DESCRIPTION,
} from './helpers/constants';

describe('Teste da página de carteira', () => {
  const { history } = renderWithRouterAndRedux(<App />);
  renderWithRouterAndRedux(<Wallet />);

  it('Verificando os elementos da página de carteira', async () => {
    // const { history } = renderWithRouterAndRedux(<App />);
    // const title = screen.getAllByText(/wallet/i);
    // expect(title).toBeInTheDocument();

    const inputEmail = screen.getByTestId(TEST_ID_EMAIL_INPUT);
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByTestId(TEST_ID_PASS_INPUT);
    expect(inputPassword).toBeInTheDocument();

    const btnLogin = screen.getByRole(
      'button',
      { name: /entrar/i },
    );
    expect(btnLogin).toBeInTheDocument();

    userEvent.type(inputEmail, TEST_FAIL_EMAIL_1);
    userEvent.type(inputPassword, TEST_VALID_PASSWORD);
    expect(btnLogin).toBeDisabled();

    userEvent.type(inputEmail, TEST_FAIL_EMAIL_2);
    userEvent.type(inputPassword, TEST_VALID_PASSWORD);
    expect(btnLogin).toBeDisabled();

    userEvent.type(inputEmail, TEST_FAIL_EMAIL_3);
    userEvent.type(inputPassword, TEST_VALID_PASSWORD);
    expect(btnLogin).toBeDisabled();

    userEvent.type(inputEmail, TEST_VALID_EMAIL);
    userEvent.type(inputPassword, TEST_FAIL_PASSWORD);
    expect(btnLogin).toBeDisabled();

    userEvent.type(inputEmail, TEST_VALID_EMAIL);
    userEvent.type(inputPassword, TEST_VALID_PASSWORD);
    expect(btnLogin).toBeEnabled();

    userEvent.click(btnLogin);
    expect(history.location.pathname).toBe('/carteira');

    const { pathname } = history.location;
    expect(pathname).toBe('/carteira');

    // const title2 = screen.getAllByText(/wallet/i);
    // expect(title2).toBeInTheDocument();

    const userEmail = screen.getByTestId(/usuário:/i);
    expect(userEmail).toBeInTheDocument();

    const expenses = screen.getByText(/despesas totais:/i);
    expect(expenses).toBeInTheDocument();

    const valueInput = screen.getByRole(
      'textbox',
      { name: /valor:/i },
    );
    expect(valueInput).toBeInTheDocument();

    const descriptionInput = screen.getByRole(
      'textbox',
      { name: /descrição:/i },
    );
    expect(descriptionInput).toBeInTheDocument();

    const selectCoin = screen.getByText(/moeda:/i);
    expect(selectCoin).toBeInTheDocument();

    const selectMethod = screen.getByText(/forma de pagamento:/i);
    expect(selectMethod).toBeInTheDocument();

    const dropdownCategory = screen.getByText(/categoria:/i);
    expect(dropdownCategory).toBeInTheDocument();

    const btnAddExpense = screen.getByRole(
      'button',
      { name: /adicionar despesa/i },
    );
    expect(btnAddExpense).toBeInTheDocument();
    userEvent.click(btnAddExpense);
  });

  it('Verificar se as informações inseridas no form são salvas no estado da aplicação e se o campo de despesas totais do Header é atualizado', async () => {
    const { store } = renderWithRouterAndRedux(<Wallet />);

    const btnAddExpenses = await screen.findByText(/Adicionar despesa/i);

    const currencyInput = await screen.findByTestId(TEST_ID_CURRENCY_INPUT);
    const valueInput = await screen.findByTestId(TEST_ID_VALUE_INPUT);
    const methodInput = await screen.findByTestId(TEST_ID_METHOD_INPUT);
    const tagInput = await screen.findByTestId(TEST_ID_TAG_INPUT);
    const descriptionInput = await screen.findByTestId(TEST_ID_DESCRIPTION);

    expect(btnAddExpenses).toBeInTheDocument();
    userEvent.type(valueInput, '20');
    userEvent.type(currencyInput, 'USD');
    userEvent.type(methodInput, 'Dinheiro');
    userEvent.type(tagInput, TEST_VALID_TAG);
    userEvent.type(descriptionInput, TEST_VALID_DESCRIPTION);
    userEvent.click(btnAddExpenses);

    const expectedStateExpense1 = [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: TEST_VALID_TAG,
        description: TEST_VALID_DESCRIPTION,
        exchangeRates: mockData,
      },
    ];

    await waitFor(() => {
      expect(valueInput.value === 0 || valueInput.value === '0' || valueInput.value === '').toBe(true);
    });
    expect(store.renderWithRedux().wallet.expenses).toStrictEqual(expectedStateExpense1);
    const totalField = screen.getByTestId(TOTAL_FIELD_TEST_ID);
    expect(totalField.innerHTML).toBe('101.00');

    userEvent.type(valueInput, '15');
    userEvent.type(currencyInput, 'EUR');
    userEvent.type(methodInput, 'Cartão de crédito');
    userEvent.type(tagInput, 'Lazer');
    userEvent.type(descriptionInput, 'quinze euros');
    userEvent.click(btnAddExpenses);

    const expectedStateExpense2 = [
      {
        id: 0,
        value: '20',
        currency: 'USD',
        method: 'Dinheiro',
        tag: TEST_VALID_TAG,
        description: TEST_VALID_DESCRIPTION,
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '15',
        currency: 'EUR',
        method: 'Cartão de crédito',
        tag: 'Lazer',
        description: 'quinze euros',
        exchangeRates: mockData,
      },
    ];

    await waitFor(() => {
      expect(valueInput.value === 0 || valueInput.value === '0' || valueInput.value === '').toBe(true);
    });
    expect(store.renderWithRedux().wallet.expenses).toStrictEqual(expectedStateExpense2);
    expect(totalField.innerHTML).toBe('184.26');
  });
});
