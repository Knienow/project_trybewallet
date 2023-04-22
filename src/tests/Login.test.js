import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import {
  TEST_ID_EMAIL_INPUT,
  TEST_ID_PASS_INPUT,
  TEST_VALID_EMAIL,
  TEST_VALID_PASSWORD,
  TEST_FAIL_EMAIL_1,
  TEST_FAIL_EMAIL_2,
  TEST_FAIL_EMAIL_3,
  TEST_FAIL_PASSWORD,
} from './helpers/constants';

describe('Teste da página de login', () => {
  it('Verificando se a rota da página é \'/\'', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verificandp se os elementos estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    // const title = screen.getByRole(
    //   'heading',
    //   { level: 2, name: /wallet/i },
    // );
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
  });

  it('Verificando se o elementos de input e button estão funcionando corretamente', () => {
    // const { history } = renderWithRouterAndRedux(<App />);
    renderWithRouterAndRedux(<App />);

    const btnLogin = screen.getByRole(
      'button',
      { name: /entrar/i },
    );
    expect(btnLogin).toBeDisabled();

    const inputEmail = screen.getByTestId(TEST_ID_EMAIL_INPUT);
    const inputPassword = screen.getByTestId(TEST_ID_PASS_INPUT);

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

    // userEvent.click(btnLogin);
    // expect(history.location.pathname).toBe('/carteira');
  });

  it('Verificando se e-mail e senha são salvos no estado após o click do botão "Entrar"', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const btnLogin = screen.getByRole(
      'button',
      { name: /entrar/i },
    );
    const inputEmail = screen.getByTestId(TEST_ID_EMAIL_INPUT);
    const inputPassword = screen.getByTestId(TEST_ID_PASS_INPUT);

    userEvent.type(inputEmail, TEST_VALID_EMAIL);
    userEvent.type(inputPassword, TEST_VALID_PASSWORD);
    fireEvent.click(btnLogin);

    expect(store.renderWithRedux().user.email).toBe(TEST_VALID_EMAIL);
    expect(store.renderWithRedux().user.pass).toBe(TEST_VALID_PASSWORD);
  });

  it('Verificando se o elementos de input e button estão funcionando corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const btnLogin = screen.getByRole(
      'button',
      { name: /entrar/i },
    );
    const inputEmail = screen.getByTestId(TEST_ID_EMAIL_INPUT);
    const inputPassword = screen.getByTestId(TEST_ID_PASS_INPUT);

    userEvent.type(inputEmail, TEST_VALID_EMAIL);
    userEvent.type(inputPassword, TEST_VALID_PASSWORD);
    fireEvent.click(btnLogin);

    expect(history.location.pathname).toBe('/carteira');
  });
});
