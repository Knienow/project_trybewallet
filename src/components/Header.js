import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <h1>Trybewallet</h1>
        <p>
          Usuário:
          {' '}
          <span data-testid="email-field">{ email }</span>
        </p>
        <p>
          Despesas totais:
          <span
            data-testid="total-field"
          >
            { expenses.reduce((acc, curr) => (
              acc + (Number(curr.value) * Number(curr.quotes[curr.currency].ask))
            ), 0).toFixed(2) }
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.user.email,
//   expenses: state.wallet.total,
// });

const mapStateToProps = ({ user: { email },
  wallet: { expenses } }) => (
  { email, expenses }
);

Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default connect(mapStateToProps)(Header);
