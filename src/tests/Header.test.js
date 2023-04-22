import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Teste do componente Header', () => {
  it('Verificar se o elemento com o email do usuário logado é exibido', () => {
    renderWithRouterAndRedux(<Wallet />);
    const userEmail = screen.getByTestId('email-field');
    expect(userEmail).toBeInTheDocument();
    // expect(userEmail.innerHTML).not.toBe('');
    // expect(userEmail).toContainHTML(store.renderWithRedux().user.email);
  });

  it('Verificar se o elemento com as despesas totais é exibido', () => {
    renderWithRouterAndRedux(<Wallet />);
    const totalExpenses = screen.getByTestId('total-field');
    expect(totalExpenses).toBeInTheDocument();
  });

  it('Verificar se o elemento com o câmbio é exibido', () => {
    renderWithRouterAndRedux(<Wallet />);
    const currencyField = screen.getByTestId('header-currency-field');
    expect(currencyField).toBeInTheDocument();
  });
});
