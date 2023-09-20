import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;

      setToken(token);

      window.localStorage.setItem('booksUserToken', token);
    }
  }, [result.data]); //eslint-disable-line

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    login({ variables: { username, password } });

    navigate('/authors');
  };

  return (
    <div>
      <h2>Log in</h2>

      <form onSubmit={submit}>
        <div>
          username:
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            value={password}
            autoComplete="currentPassword"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
