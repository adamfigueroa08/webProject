import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import eventsService from "../../services/eventsService";
import toastr from "toastr";
import Geocode from "react-geocode";

function AddEvents(props) {
  // const [setNewPageData, newFriendData] = useState();
  const [userData, setUserData] = useState({
    metaData: {
      dateStart: "",
      dateEnd: "",
      location: {
        latitude: 0,
        longitude: 0,
        zipCode: "",
        address: "",
      },
      name: "",
      headline: "",
      description: "",
      summary: "",
      slug: "",
      statusId: "Active",
    },
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

  const handleInputMetaChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUserData((prevState) => {
      console.log("upDater on Change");

      const newUserObj = {
        ...prevState,
      };

      newUserObj.metaData[name] = value;
      return newUserObj;
    });
  };

  const handleLocationChange = (e) => {
    e.preventDefault();

    const target = e.target;
    const value = target.value;
    const name = target.name;

    setUserData((prevState) => {
      console.log("upDater on Change");

      const newUserObj = {
        ...prevState,
      };

      newUserObj.metaData.location[name] = value;
      return newUserObj;
    });
  };

  const onClickSubmitAdd = (e) => {
    // add just like user effect but with service calls
    console.log("on submit data ->", userData);
    e.preventDefault();
    if (userData.id) {
      eventsService
        .editEvents(userData, userData.id)
        .then(onUpDateSucess)
        .catch(onUpdateError);
    } else {
      eventsService.postEvents(userData).then(onAddSucess).catch(onAddError);
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
        // pd.primaryImage = pd.primaryImage.imageUrl;
        // pd.name = pd.pd.metaData.name;
        //pd.address = pd.metaData.location.address;
        // pd.dateStart = pd.metaData.dateStart;
        // pd.dateEnd = pd.metaData.dateEnd;
        //   pd.name = pd.metaData.name;
        return pd;
      });
    } else {
      console.log("im adding");
    }
  }, []);

  const onAddSucess = () => {
    toastr.success("You Add a Event");
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
    toastr.success("updated Event");
    Geocode.setApiKey("AIzaSyCMR-9jqnIbymGQWD0UFGuRMZZL7qZm5xI");
    Geocode.setLanguage("en");
    Geocode.fromAddress(userData.metaData.location.address).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <React.Fragment>
      <h1 style={{ fontFamily: "sans-serif" }}>Add Events </h1>
      <div className="container mt-5 fs-2 col-lg6 offset-lg-4">
        <div className="row">
          <div className="col-md-5">
            <div className="form">
              <form>
                <div className="form-body">
                  <div className="username">
                    <label className="form__label " htmlFor="Name">
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
                      placeholder="Description"
                    />
                  </div>
                  <div className="headline">
                    <label className="form__label" htmlFor="headline">
                      Headline
                    </label>
                    <input
                      type="text"
                      id="headline"
                      name="headline"
                      value={userData.headline}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputChange}
                      placeholder="headline"
                    />
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
                  </div>
                  <div className="address">
                    <label className="form__label" htmlFor="address">
                      Address
                    </label>
                    <input
                      className="form__input form-control form-control-sm "
                      type="text"
                      id="address"
                      name="address"
                      value={userData.metaData.location.address}
                      onChange={handleLocationChange}
                      placeholder="address"
                    />
                  </div>

                  <div className="zipCode">
                    <label className="form__label" htmlFor="zipCode">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={userData.metaData.location.zipCode}
                      className="form__input form-control form-control-sm "
                      onChange={handleLocationChange}
                      placeholder="zipCode"
                    />
                  </div>
                  <div className="dataStart">
                    <label className="form__label" htmlFor="dateStart">
                      Start Date
                    </label>
                    <input
                      type="text"
                      id="dateStart"
                      name="dateStart"
                      value={userData.dateStart}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputMetaChange}
                      placeholder="dateStart"
                    />
                  </div>
                  <div className="dataEnd">
                    <label className="form__label" htmlFor="dateEnd">
                      End Date
                    </label>
                    <input
                      type="text"
                      id="dateEnd"
                      name="dateEnd"
                      value={userData.dateEnd}
                      className="form__input form-control form-control-sm "
                      onChange={handleInputMetaChange}
                      placeholder="dateStart"
                    />
                  </div>
                  <div className="slug">
                    <label className="form__label" htmlFor="slug">
                      Event Id
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

export default AddEvents;
