import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import companiesServices from "../../services/companiesServices";
import toastr from "toastr";

function AddCompanies(props) {
  // const [setNewPageData, newFriendData] = useState();
  const [userData, setUserData] = useState({
    // techCompany
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: "",
    statusId: "Active",
    images: [
      {
        imageTypeId: 1,
        imageUrl: "",
      },
    ],
    urls: ["string"], // input ==> "url1, url 2 ,url 3" ==> input.join(", ") ==> ["url2", "url2"]
    tags: ["string"],
    friendIds: [0],
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

    setUserData((prevstate) => {
      console.log("updater on change");

      const newUserObj = {
        ...prevstate,
      };
      if (name === "imageUrl") {
        newUserObj.images[0].imageUrl = value;
      } else {
        newUserObj[name] = value;
      }
      if (name === "urlSite") {
        // newUserObj.urls[0].url = value;
      } else {
        newUserObj[name] = value;
      }
      return newUserObj;
    });
  };

  const onClickSubmitAdd = (e) => {
    // add just like user effect but with service calls
    e.preventDefault();

    console.log("on submit data ->", userData);

    // userData.contactInformation = userData.contactInformation.data;

    if (location.state) {
      companiesServices
        .editCompanies(userData, userData.id)
        .then(onUpDateSucess)
        .catch(onUpdateError);
    } else {
      companiesServices
        .postCompanies(userData)
        .then(onAddSucess)
        .catch(onAddError);
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
      console.log("TESTING STATE", location.state);
      setUserData(() => {
        // let pd = { ...prevState };
        let pd = { ...location.state.person };
        pd.urls = pd.urls.map((url) => url.url);
        pd.tags = pd.tags.map((tag) => tag.tagName);
        pd.primaryImage = pd.images[0].imageUrl;
        pd.urlSite = pd.urls[0].url;
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
      <h1 style={{ fontFamily: "sans-serif" }}>Add Companies </h1>
      <div className="container mt-5 fs-2 col-lg6 offset-lg-4">
        <div className="row">
          <div className="col-md-5">
            <div className="form">
              <form>
                <div className="form-body">
                  <div className="name">
                    <label className="form__label " htmlFor="name">
                      Name
                    </label>

                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      value={userData.name}
                      onChange={handleInputChange}
                      id="name"
                      name="name"
                      placeholder="name"
                      style={{ fontFamily: "sans-serif" }}
                    />
                  </div>
                  <div className="summary">
                    <label className="form__label" htmlFor="summary">
                      Summary
                    </label>
                    <input
                      type="text"
                      id="summary"
                      name="summary"
                      value={userData.summary}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="summary"
                    />
                  </div>
                  <div className="contactInformation">
                    <label className="form__label" htmlFor="contactInformation">
                      Contact Information
                    </label>
                    <input
                      type="text"
                      id="contactInformation"
                      name="contactInformation"
                      value={userData.contactInformation}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="contactInformation"
                    />
                  </div>

                  <div className="profile">
                    <label className="form__label" htmlFor="profile">
                      ProFile
                    </label>
                    <input
                      type="text"
                      id="profile"
                      name="profile"
                      className="form__input form-control form-control-sm "
                      value={userData.profile}
                      onChange={handleInputChange}
                      placeholder="profile"
                    />
                  </div>
                  <div className="headline">
                    <label className="form__label" htmlFor="headline">
                      HeadLine
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
                  <div className="imageUrl">
                    <label className="form__label" htmlFor="imageUrl">
                      Image Url
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      id="imageUrl"
                      name="imageUrl"
                      value={userData.images[0].imageUrl}
                      onChange={handleInputChange}
                      placeholder="imageUrl"
                    />
                  </div>
                  {/* <div className="urlSite">
                    <label className="form__label" htmlFor="urlSite">
                      Site Url
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      id="urlSite"
                      name="urlSite"
                      value={userData.urls[0].url}
                      onChange={handleInputChange}
                      placeholder="urlSite"
                    />
                  </div> */}
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

export default AddCompanies;
