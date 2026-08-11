import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const result = await login(email, password);

      //allow a browser to keep a value even after page refresh
      console.log("Login result: ", result);
      localStorage.setItem("token", result.token);
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="loginPage">
      <div className="loginCard">
        <h1>Welcome to StockHQ</h1>

        <form onSubmit={handleSubmit}>
          <div className="formField">
            <input
              className="formInput"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="formField">
            <input
              className="formInput"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button className="submit-btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
