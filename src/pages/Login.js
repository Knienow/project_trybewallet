import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import userData from '../actions/user';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validationInput);
  };

  validationInput = () => {
    const { email, password } = this.state;
    const MINLENGTHPASSWORD = 6;
    const expValidationEmail = /\S+@\S+\.\S+/;
    // const validationEmail = expValidationEmail.test(email);
    // const validationPassword = password.length >= MINLENGTHPASSWORD;
    if (expValidationEmail.test(email) && password.length >= MINLENGTHPASSWORD) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  handleClick = () => {
    // const { getInfo } = this.props;
    const { getInfo, history } = this.props;
    const { email, password } = this.state;
    // const userInfo = ({ email, password });
    // getInfo(userInfo);
    getInfo(email, password);
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div>
        <form>
          <header>
            <h1>Login</h1>
          </header>
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              type="password"
              name="password"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getInfo: (state) => dispatch(userData(state)),
});

Login.propTypes = {
  getInfo: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
