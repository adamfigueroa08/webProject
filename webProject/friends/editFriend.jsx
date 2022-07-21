import React, { useState } from "react";
import friendsService from "../../services/friendsService";
import toastr from "toastr";

function EditFriends() {
  const [userData, setUserData] = useState({
    id: 0,
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    primaryImage: "",
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

  const onClickSubmitUpdate = () => {
    if (userData.id === "") {
      toastr.error("try again");
    } else {
      toastr.success("we did it");
      console.log("state Id:");

      friendsService.editFriend(userData).then(onSucess).catch(onError);
    }
  };

  const onSucess = (response) => {
    toastr.success("New Friend");
    console.log("reg is ok", response);
  };

  const onError = (err) => {
    toastr.error("Err");
    console.log("reg error", err);
  };

  return (
    <React.Fragment>
      <h1>Edit Friend </h1>
      <div className="container mt-5 fs-2 col-lg6 offset-lg-4">
        <div className="row">
          <div className="col-md-5">
            <div className="form">
              <form>
                <div className="id">
                  <label className="form__label" htmlFor="id">
                    ID
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={userData.id}
                    className="form__input form-control form-control-sm "
                    onChange={handleInputChange}
                    placeholder="Id"
                  />
                </div>
                <div className="form-body">
                  <div className="username">
                    <label className="form__label " htmlFor="firstName">
                      Title
                    </label>

                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      value={userData.title}
                      onChange={handleInputChange}
                      id="title"
                      name="title"
                      placeholder="title"
                    />
                  </div>
                  <div className="bio">
                    <label className="form__label" htmlFor="bio">
                      Bio
                    </label>
                    <input
                      type="text"
                      id="bio"
                      name="bio"
                      value={userData.bio}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="bio"
                    />
                  </div>

                  <div className="email">
                    <label className="form__label" htmlFor="summary">
                      Summary
                    </label>
                    <input
                      type="text"
                      id="summary"
                      name="summary"
                      className="form__input form-control form-control-sm "
                      value={userData.summary}
                      onChange={handleInputChange}
                      placeholder="summary"
                    />
                  </div>
                  <div className="headline">
                    <label className="form__label" htmlFor="password">
                      Headline
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      id="headline"
                      name="headline"
                      value={userData.headline}
                      onChange={handleInputChange}
                      placeholder="headline"
                    />
                  </div>
                  <div className="slug">
                    <label className="form__label" htmlFor="slug">
                      Slug
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      id="slug"
                      name="slug"
                      value={userData.slug}
                      onChange={handleInputChange}
                      placeholder="slug"
                    />
                  </div>
                  <div className="primaryImage">
                    <label className="form__label" htmlFor="primaryImage">
                      Profile URL
                    </label>
                    <input
                      type="text"
                      id="primaryImage"
                      name="primaryImage"
                      value={userData.primaryImage}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="url"
                    />
                  </div>
                </div>
                <div className="footer">
                  <button
                    onClick={onClickSubmitUpdate}
                    type="submit"
                    className="btn btn-warning"
                  >
                    Edit
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

export default EditFriends;
