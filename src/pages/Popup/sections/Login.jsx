import React, { useState } from 'react';
import UserClient from '../../../clients/UserClient';
import JWTHelper from '../../../util/JWTHelper';

function Login({ error, setSteps, setStatus }) {
  const userClient = new UserClient();
  const [user, setUser] = useState({
    username: '',
    password: '',
  });
  const handleForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setStatus({
      loading: true,
      error: false,
    });

    userClient
      .login(user.username, user.password)
      .then(
        (token) => {
          JWTHelper.storeToken(token);
          setStatus({
            error: false,
            loading: false,
          });
          setSteps('PROJECTS');
        },
        (err) => {
          console.error(err);
          setStatus({
            error: true,
            loading: false,
          });
        }
      )
      .catch((err) => console.log(error.response));
  };
  return (
    <div className="login-form">
      <div className="input-form">
        <div className="flex-1">
          <div className="right-column">
            <input type="text" name="username" onChange={handleForm} />
          </div>
        </div>
        <div className="input-row last-row">
          <div className="right-column">
            <input type="password" name="password" onChange={handleForm} />
          </div>
        </div>
        <div className="flex">
          <button onClick={onLogin} className="sign-in">
            Sign In
          </button>
        </div>
        {error && <p className="error">Wrong credentials</p>}
        {/* <p>Forgot password</p> */}
      </div>
    </div>
  );
}

export default Login;
