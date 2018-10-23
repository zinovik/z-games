import * as React from 'react';
import * as PropTypes from 'prop-types';

const Authorize = ({ onSignInClick, onSignUpClick }) => {
  let username;
  let password;

  return (
    <div>
      <input type="email" placeholder="Username" ref={node => (username = node)} />
      <input type="password" placeholder="Password" ref={node => (password = node)} />
      <button onClick={() => { onSignInClick(username.value, password.value); }}>Sign in</button>
      <button onClick={() => { onSignUpClick(username.value, password.value); }}>Sign up</button>
    </div>
  );
}

Authorize.propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  onSignUpClick: PropTypes.func.isRequired,
}

export default Authorize;
