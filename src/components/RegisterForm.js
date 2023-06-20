import React, { useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login, token, logout } = useAuth();
  const [nameInput, setNameInput] = useState("");
  const [registerUsernameInput, setRegisterUsernameInput] = useState("");
  const [registerPasswordInput, setRegisterPasswordInput] = useState("");
  const [confirmRegisterPasswordInput, setConfirmRegisterPasswordInput] =
    useState("");
  const handleRegisterButton = async (e) => {
    e.preventDefault();
    if (registerPasswordInput !== confirmRegisterPasswordInput) {
      return alert("Plese check your password");
    }
    try {
      const res = await fetch("https://api.learnhub.thanayut.in.th/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: registerUsernameInput,
          name: nameInput,
          password: registerPasswordInput,
        }),
      });
      const data = await res.json();
      if (data.statusCode === 409) {
        throw new Error(data.message);
      }
      alert("ID Registered");
      navigate("/login");
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="flex justify-center mt-24">
      <form
        className="flex flex-col m-8 w-64 gap-1"
        onSubmit={handleRegisterButton}
      >
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          className="bg-slate-200"
          id="name"
          name="name"
          onChange={(e) => {
            console.log(e.target.value);
            setNameInput(e.target.value);
          }}
        />
        <br />
        <label htmlFor="registerUsername">Username</label>
        <input
          required
          type="text"
          className="bg-slate-200"
          id="registerUsername"
          name="registerUsername"
          onChange={(e) => {
            console.log(e.target.value);
            setRegisterUsernameInput(e.target.value);
          }}
        />
        <label htmlFor="registerPassword">Password</label>
        <input
          required
          type="password"
          className="bg-slate-200"
          id="registerPassword"
          name="registerPassword"
          onChange={(e) => {
            console.log(e.target.value);
            setRegisterPasswordInput(e.target.value);
          }}
        />
        <label htmlFor="confirmRegisterPassword">Confirm Password</label>
        <input
          required
          type="password"
          className="bg-slate-200 mb-4"
          id="confirmRegisterPassword"
          name="confirmRegisterPassword"
          onChange={(e) => {
            console.log(e.target.value);
            setConfirmRegisterPasswordInput(e.target.value);
          }}
        />

        <input type="submit" value="Register" className="button-grey" />
      </form>
    </div>
  );
};

export default RegisterForm;
