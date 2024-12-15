import { useSelector } from "react-redux";

const LoginForm = (props) => {
  const {
    loginSubmitHandler,
    username,
    setUsername,
    password,
    setPassword,
    // user,
  } = props;
  const user = useSelector(state => state.user)
  if (user) return;
  return (
    <>
      <h1>Log in to application</h1>
      <form onSubmit={(event) => loginSubmitHandler(event)}>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
          value={username}
        />
        <br />
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
          value={password}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginForm;
