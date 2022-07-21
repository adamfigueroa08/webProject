import React, { useState } from "react";
import userService from "../../services/userService";
import toastr from "toastr";

function RegisterForm() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "BootCamp1236",
  });
  console.log(userData);

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
    userService.postReigister(userData).then(onSucess).catch(onError);
  };

  const onSucess = (response) => {
    toastr.success("Hello Message");
    console.log("reg is ok", response);
  };

  const onError = (err) => {
    toastr.error("Err");
    console.log("reg error", err);
  };

  return (
    <React.Fragment>
      <h1>Register </h1>
      <div className="container mt-5 fs-2 col-lg6 offset-lg-4">
        <div className="row">
          <div className="col-md-5">
            <div className="form">
              <form>
                <div className="form-body">
                  <div className="username">
                    <label className="form__label " htmlFor="firstName">
                      First Name
                    </label>

                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      value={userData.firstName}
                      onChange={handleInputChange}
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="lastname">
                    <label className="form__label" htmlFor="lastName">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={userData.lastName}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="LastName"
                    />
                  </div>
                  <div className="email">
                    <label className="form__label" htmlFor="email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form__input form-control form-control-sm "
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                  <div className="password">
                    <label className="form__label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="password"
                      id="password"
                      name="password"
                      value={userData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                    />
                  </div>
                  <div className="confirm-password">
                    <label className="form__label" htmlFor="passwordConfirm">
                      Confirm Password
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="password"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      value={userData.passwordConfirm}
                      onChange={handleInputChange}
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="profileUrl">
                    <label className="form__label" htmlFor="avatarUrl">
                      Profile URL
                    </label>
                    <input
                      type="text"
                      id="avatarUrl"
                      name="avatarUrl"
                      value={userData.avatarUrl}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="url"
                    />
                  </div>
                </div>
                <div className="footer">
                  <button
                    onClick={onClickSubmit}
                    type="submit"
                    className="btn btn-warning"
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
}

export default RegisterForm;
