import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import jobServices from "../../services/jobsServices";
import toastr from "toastr";

function AddJobs(props) {
  // const [setNewPageData, newFriendData] = useState();
  const [userData, setUserData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "Active",
    techCompanyId: 0,
    skills: ["string"],
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
    console.log("on submit data jobs ->", userData);
    e.preventDefault();
    if (location.state) {
      jobServices
        .editJobs(userData, userData.id)
        .then(onUpDateSucess)
        .catch(onUpdateError);
    } else {
      jobServices.postJobs(userData).then(onAddSucess).catch(onAddError);
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
      setUserData(() => {
        // let pd = { ...prevState };
        let pd = { ...location.state.person };
        pd.primaryImage = pd.techCompany.images[0].imageUrl;
        // pd.primaryImage = pd.skills[0].name;
        pd.skills = pd.skills.map((skill) => skill.name);
        //  pd.primaryImage = pd.primaryImage.map((imgComp) => imgComp.imageUrl);
        return pd;
      });
    } else {
      console.log("im adding");
    }
  }, []);

  const onAddSucess = () => {
    toastr.success("You Add a Job");
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
    toastr.success("Updated Job");
  };

  return (
    <React.Fragment>
      <h1 style={{ fontFamily: "sans-serif" }}>Add Job </h1>
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
                      style={{ fontFamily: "sans-serif" }}
                    />
                  </div>
                  <div className="description">
                    <label className="form__label" htmlFor="description">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      value={userData.description}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="description"
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
                      className="form__input form-control form-control-sm "
                      value={userData.summary}
                      onChange={handleInputChange}
                      placeholder="summary"
                    />
                  </div>
                  <div className="pay">
                    <label className="form__label" htmlFor="pay">
                      Pay
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      id="pay"
                      name="pay"
                      value={userData.pay}
                      onChange={handleInputChange}
                      placeholder="pay"
                    />
                  </div>
                  {/* <div className="slug">
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
                  </div> */}
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
                    <div className="techCompanyId">
                      <label className="form__label" htmlFor="techCompanyId">
                        Tech Company Id
                      </label>
                      <input
                        className="form__input form-control form-control-sm "
                        type="text"
                        id="techCompanyId"
                        name="techCompanyId"
                        value={userData.techCompanyId}
                        onChange={handleInputChange}
                        placeholder="techCompanyId"
                      />
                    </div>
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

export default AddJobs;
