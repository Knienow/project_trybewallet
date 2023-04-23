import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import { testTableData } from './helpers/mockData';

describe('Teste do componente Table', () => {
  it('Verificar se o cabeçalho da tabela é exibido', () => {
    renderWithRouterAndRedux(<Wallet />);

    const descriptionField = screen.getByText(/descrição/i);
    expect(descriptionField).toBeInTheDocument();

    const tagField = screen.getByText(/tag/i);
    expect(tagField).toBeInTheDocument();

    const methodField = screen.getByText(/método de pagamento/i);
    expect(methodField).toBeInTheDocument();

    const valueField = screen.getByText(/valor/i);
    expect(valueField).toBeInTheDocument();

    const coinField = screen.getByText(/moeda/i);
    expect(coinField).toBeInTheDocument();

    const exchangeField = screen.getByText(/câmbio utilizado/i);
    expect(exchangeField).toBeInTheDocument();

    const convertedValue = screen.getByText(/valor convertido/i);
    expect(convertedValue).toBeInTheDocument();

    const conversionCurrency = screen.getByText(/moeda de conversão/i);
    expect(conversionCurrency).toBeInTheDocument();

    const editDelete = screen.getByText(/editar/i);
    expect(editDelete).toBeInTheDocument();
  });

  it('Verificar se os elementos do tbody são exibidos e atualizados de acordo com os dados do estado da aplicação', () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira', testTableData);

    expect(screen.getByText(/vinte dólares/i).toBeInTheDocument);
    expect(screen.getByText(/alimentação/i).toBeInTheDocument);
    expect(screen.getByText(/dinheiro/i).toBeInTheDocument);
    expect(screen.getByText(/dólar americano/i).toBeInTheDocument);
    expect(screen.getByText(/20.00/i).toBeInTheDocument);
    expect(screen.getByText(/5.05/i).toBeInTheDocument);
    expect(screen.getByText(/101.00/i).toBeInTheDocument);
    expect(screen.getByText(/real/i).toBeInTheDocument);

    expect(screen.getByText(/quinze euros/i).toBeInTheDocument);
    expect(screen.getByText(/lazer/i).toBeInTheDocument);
    expect(screen.getByText(/cartão de crédito/i).toBeInTheDocument);
    expect(screen.getByText(/euro/i).toBeInTheDocument);
    expect(screen.getByText(/15.00/i).toBeInTheDocument);
    expect(screen.getByText(/5.55/i).toBeInTheDocument);
    expect(screen.getByText(/83.26/i).toBeInTheDocument);
    expect(screen.getByText(/real/i).toBeInTheDocument);

    const btnEdit = screen.getByRole('button', { name: /editar/i });
    expect(btnEdit).toBeInTheDocument();

    const btnDelete = screen.getByRole('button', { name: /excluir/i });
    expect(btnDelete).toBeInTheDocument();
  });
});
