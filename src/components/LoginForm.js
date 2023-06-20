import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, token, logout } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handleLoginButton = async (e) => {
    e.preventDefault();
    try {
      login(usernameInput, passwordInput);
      console.log(token);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col m-8 items-center gap-12 mt-32">
      <form className="flex flex-col w-64 gap-1" onSubmit={handleLoginButton}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="bg-slate-200"
          id="username"
          name="username"
          onChange={(e) => {
            console.log(e.target.value);
            setUsernameInput(e.target.value);
          }}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="bg-slate-200 mb-4"
          id="password"
          name="password"
          onChange={(e) => {
            console.log(e.target.value);
            setPasswordInput(e.target.value);
          }}
        />
        <input type="submit" value="Login" className="button-grey" />
      </form>
      <p>
        Don&#39;t have an account yet?
        <a className="text-blue-500 underline" href="/register">
          {" "}
          Create an account
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
