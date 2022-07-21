import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import friendsService from "../../services/friendsService";
import toastr from "toastr";

function AddFriends(props) {
  // const [setNewPageData, newFriendData] = useState();
  const [userData, setUserData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "Active",
    primaryImage: "",
  });

  const location = useLocation();
  console.log(userData);
  console.log(props);
  console.log(location);

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

  const onClickSubmitAdd = (e) => {
    // add just like user effect but with service calls
    e.preventDefault();
    if (location.state) {
      friendsService
        .editFriend(userData, userData.id)
        .then(onUpDateSucess)
        .catch(onUpdateError);
    } else {
      friendsService.postFriend(userData).then(onAddSucess).catch(onAddError);
    }
  };

  // const onSucess = (response) => {
  //   toastr.success("New Friend");
  //   console.log("reg is ok", response);

  //   setNewPageData((prevState) => {
  //     // SET PAGE DATA
  //     const pd = { ...prevState };
  //     pd.newFriendData = { ...newFriendData };
  //     pd.id = response.data.items;
  //     pd.abool = false;
  //     return pd;
  //   });
  // };

  useEffect(() => {
    if (location.state) {
      console.log("TESTING STATE");
      setUserData((prevState) => {
        let pd = { ...prevState };
        pd = { ...location.state.person };
        pd.primaryImage = pd.primaryImage.imageUrl;
        return pd;
      });
    } else {
      console.log("im adding");
    }
  }, []);

  const onAddSucess = () => {
    toastr.success("You Add a Friend");
  };

  const onAddError = (err) => {
    toastr.error("Err");
    console.log("Sorry Try again", err);
  };

  const onUpdateError = (err) => {
    toastr.error("Err");
    console.log("Try again", err);
  };

  const onUpDateSucess = () => {
    toastr.success("update good");
  };

  return (
    <React.Fragment>
      <h1 style={{ fontFamily: "sans-serif" }}>Add Friend </h1>
      <div className="container mt-5 fs-2 col-lg6 offset-lg-4">
        <div className="row">
          <div className="col-md-5">
            <div className="form">
              <form>
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
                    onClick={onClickSubmitAdd}
                    type="submit"
                    className="btn btn-warning"
                  >
                    Submit
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

export default AddFriends;
