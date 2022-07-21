import React, { useState } from "react";
import userService from "../../services/userService";
import toastr from "toastr";

function LogInForm(props) {
  const [userData, setUserData] = useState({
    email: " ",
    password: " ",
    tenantId: "BootCamp1236",
  });

  const handleInputChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUserData((prevState) => {
      console.log("upDater on Change");

      const newUserObj = {
        ...prevState,
      };

      newUserObj[name] = value;
      return newUserObj;
    });
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    userService.login(userData).then(onSucess).catch(onError);
  };

  const onSucess = (response) => {
    toastr.success("Bingo!");
    console.log("reg is ok", response);
  };

  const onError = (err) => {
    toastr.error("Try Again");
    console.log("reg error", err);
  };

  return (
    <React.Fragment>
      <h1>Login {props.name}</h1>
      <form id="loginform" onSubmit={onSucess}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={handleInputChange}
          />

          <small id="emailHelp" className="text-danger form-text">
            {onError}
          </small>

          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={handleInputChange}
          />
          <small id="passworderror" className="text-danger form-text">
            {onError}
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={onClickSubmit}
        >
          Submit
        </button>
      </form>
    </React.Fragment>
  );
}

export default LogInForm;
