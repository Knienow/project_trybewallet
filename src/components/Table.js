import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends React.Component {
  render() {
    const { expenses, expenseDelete } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => {
              const {
                id,
                value,
                currency,
                method,
                tag,
                description,
                exchangeRates,
              } = expense;
              const convertion = (value * exchangeRates[currency].ask).toFixed(2);
              const nameCurrency = exchangeRates[currency].name;
              const exchange = exchangeRates[currency].ask;
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ Number(value).toFixed(2) }</td>
                  <td>{ nameCurrency }</td>
                  <td>{ Number(exchange).toFixed(2) }</td>
                  <td>{ convertion }</td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      id="btn-edit"
                    //  onClick={}
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      id="btn-delete"
                      onClick={ () => expenseDelete(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  expenseDelete: (expenseId) => dispatch(deleteExpense(expenseId)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.number,
  value: PropTypes.number,
  description: PropTypes.string,
  currency: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
  exchangeRates: PropTypes.object,
  expenseDelete: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
