import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { userEmail, totalExpenses } = this.props;
    return (
      <header>
        <h1>Trybewallet</h1>
        <p>
          Usuário:
          {' '}
          <span data-testid="email-field">{ userEmail }</span>
        </p>
        <p>
          Despesas totais:
          <span
            data-testid="total-field"
          >
            {totalExpenses.toFixed(2)}
          </span>
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = ({ userEmail: { email },
  totalExpenses: { total } }) => (
  { email, total }
);

Header.propTypes = {
  userEmail: PropTypes.string,
  totalExpenses: PropTypes.number,
}.isRequired;

export default connect(mapStateToProps)(Header);
