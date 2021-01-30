import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from 'react-router';
import { AUTH_TOKEN } from '../../constants';
import useToken from '../../components/App/useToken';


const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const history = useHistory();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });
  const { token, setToken } = useToken();

  const [login, { loginData, loginLoading, loginError }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onError: (loginError) => {
      console.log('here? ')
      NotificationManager.error(loginError.graphQLErrors[0].message, 'Error!', 5000)
    },
    onCompleted: ({ login }) => {
      console.log('maybe hbere')
      // NotificationManager.success('Login Successful', 'Success!', 5000);
      // localStorage.setItem(AUTH_TOKEN, login.token);
      setToken(login.token)
      history.push('/');
    }
  });

  const [signup, { signupData, signupLoading, signupError }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onError: (signupError) => {
      NotificationManager.error(signupError.graphQLErrors[0].message, 'Error!', 5000)
    },
    onCompleted: ({ signup }) => {
      NotificationManager.success('Account created', 'Success!', 5000);
      // localStorage.setItem(AUTH_TOKEN, signup.token);
      setToken(signup.token)
      history.push('/');
    }
  });
  return (
    <div>
      <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value
            })
          }
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Login;
