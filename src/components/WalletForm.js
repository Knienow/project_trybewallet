import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './WalletForm.css';
import { fetchAṔI } from '../actions';

class WalletForm extends React.Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    // currencies: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAṔI());
  }

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  // handleClick

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form>
        <div>
          <label htmlFor="input-value">
            Valor:
            <input
              data-testid="value-input"
              value={ value }
              name="value"
              id="input-value"
              type="text"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="input-description">
            Descrição:
            <input
              data-testid="description-input"
              value={ description }
              name="description"
              id="input-description"
              type="text"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="select-currency">
            Moeda:
            <select
              data-testid="currency-input"
              value={ currency }
              name="currency"
              id="select-currency"
              onChange={ this.handleInput }
            >
              {/* Os valores da chave currencies no estado global devem ser puxados através de uma requisição à API no endpoint https://economia.awesomeapi.com.br/json/all;
Remova, das informações trazidas pela API, a opção 'USDT';
A chave currencies do estado global deve ser um array. */}
              { currencies.map((coin) => (
                <option
                  key={ coin }
                  value={ coin }
                >
                  { coin }
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="payment-method">
            Forma de pagamento:
            <select
              data-testid="method-input"
              id="payment-method"
              value={ method }
              name="method"
              onChange={ this.handleInput }
            >
              <option name="money">Dinheiro</option>
              <option name="credit-card">Cartão de crédito</option>
              <option name="debit-card">Cartão de débito</option>
            </select>
          </label>
          <label
            htmlFor="select-tag"
            className="dropdown"
          >
            Categoria:
            <select
              data-testid="tag-input"
              className="dropbtn"
              id="select-tag"
              name="tag"
              value={ tag }
              onChange={ this.handleInput }
            >
              <option name="food">Alimentação</option>
              <option name="leisure">Lazer</option>
              <option name="work">Trabalho</option>
              <option name="transport">Transporte</option>
              <option name="health">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            // onClick={}
          >
            Adicionar despesa
          </button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  value: PropTypes.string,
  description: PropTypes.string,
  currency: PropTypes.string,
  method: PropTypes.string,
  tag: PropTypes.string,
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
