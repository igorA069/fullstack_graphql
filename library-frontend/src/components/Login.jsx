import { useState } from "react";

const Login = ({ show, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label>
            name
            <input
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              value={password}
              type="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
