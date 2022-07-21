import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import { Navigate } from "react-router-dom";
import eventsServices from "../../services/eventsService";
import { Link } from "react-router-dom";
import EventsCards from "../events/EventsCard";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
//import Accordion from "react-bootstrap/Accordion";

function Events() {
  const containerStyle = {
    width: 450,
    height: 450,
  };

  const center = {
    lat: 33.666143322726,
    lng: -116.2816209997,
  };

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [filteredResults, setFilteredResults] = useState();
  const [searchInput, setSearchInput] = useState("");

  const [pageData, setPageData] = useState({
    current: 1,
    pageIndex: 0,
    pageSize: 2,
    total: 0,
    arrayEvents: [], // friends cards
    peopleComponents: [],
  });

  console.log(filteredResults);
  console.log(pageData);

  const mapEvents = (event) => {
    return (
      <EventsCards
        event={event}
        key={"List A-" + event.id}
        // onPersonClick={clickDeleteCard}
      />
    );
  };

  useEffect(() => {
    console.log("firing use for friends");
    eventsServices
      .getEvents(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  }, []);

  const onGetFriendsSuccess = (response) => {
    //  console.log(data);
    let arrayOne = response.data.item.pagedItems;
    console.log({ arrayOne });

    setPageData((prevState) => {
      // SET PAGE DATA
      const pd = { ...prevState };
      pd.arrayFriends = arrayOne;
      pd.peopleComponents = arrayOne.map(mapEvents);
      return pd;
    }, []);
  };

  // const clickDeleteCard = (pageData) => {
  //   console.log("on submit data ->", pageData);
  //   //console.log(pageData.id);
  //   const idToBeDeleted = pageData.id;
  //   const pdStatusId = (pageData.statusId = "Deleted");

  //   console.log(pdStatusId);

  //   eventsServices.deleteEvent(idToBeDeleted, pdStatusId).then().catch();

  //   setPageData((prevState) => {
  //     //SET PAGE DATE FOR DELEATE
  //     const pd = { ...prevState };
  //     pd.statusId = "Deleted";
  //     pd.arrayFriends = [...pd.arrayFriends];
  //     pd.peopleComponents = pd.arrayFriends.map(mapFriends);
  //     const idxOf = pd.arrayFriends.findIndex((aFriends) => {
  //       let result = true;

  //       if (aFriends.statusId === "Active") {
  //         result = aFriends.statusId = "Deleted";
  //       }
  //       return result;
  //     });
  //     if (idxOf >= 0) {
  //       pd.arrayFriends.splice(idxOf, 1);
  //       pd.peopleComponents = pd.arrayFriends.map(mapFriends);
  //     }
  //     return pd;
  //   });
  // };

  const onGetFriendsError = (err) => {
    console.log(err);
  };

  const addFriendClick = (e) => {
    Navigate(e.currentTarget.dataset.page);
  };

  const onChange = (page) => {
    console.log(page);
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page - 1;
      return pd;
    });

    eventsServices
      .getEvents(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch();
  };
  console.log(onChange);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    eventsServices
      .getEvents(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
    if (searchInput !== "") {
      const filteredData = pageData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(setPageData);
    }
  };

  return (
    <React.Fragment>
      <nav className="navbar bg-warning">
        <div className="container-fluid">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShzzNdsTNzqmd9g9536V-sc74o1W7aglUdKw&usqp=CAU"
            alt=""
            width="250"
            height="110"
            className="d-inline-block align-text-top"
          />
          <div className="navbar-brand">
            <h1>Top Golf Courses Tours</h1>
            {/* <img
              className=" col-2 position-absolute top-50 start-25  translate-middle-y"
              style={{ width: 170, hight: 100 }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShzzNdsTNzqmd9g9536V-sc74o1W7aglUdKw&usqp=CAU" 
              alt=""
            /> */}
          </div>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => searchItems(e.target.value)}
            />
            <button className="btn btn-outline-dark" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <h1>Southern California</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="card ">
              <img
                src="https://www.linksmagazine.com/wp-content/uploads/2021/01/SilverRock.jpg"
                className="card-img-top rounded "
                alt="..."
              />
              <div className="card-body">
                <p
                  className="card-text"
                  style={{ fontSize: 12, fontFamily: "Roboto" }}
                >
                  SilverRock Resort
                </p>
                <p
                  className="card-text card d-block p-1 bg-warning text-dark text-center "
                  style={{ fontSize: 21, fontFamily: "Roboto" }}
                >
                  SilverRock Resort's Arnold Palmer Classic Course is a
                  challenging 7,239 yards, sprawling over 200 acres with massive
                  native bunkers and stunning water features. Set against the
                  backdrop and natural beauty of the Santa Rosa Mountains
                </p>
                <div className="container">
                  <div className="row ">
                    <div className="col-8">
                      <span className="d-block p-1 bg-white text-white"></span>

                      <div>
                        <span className="d-block p-1 bg-white text-white "></span>
                        <div>
                          <LoadScript googleMapsApiKey="AIzaSyCMR-9jqnIbymGQWD0UFGuRMZZL7qZm5xI">
                            <GoogleMap
                              mapContainerStyle={containerStyle}
                              center={center}
                              zoom={13}
                            >
                              {/* Child components, such as markers, info windows, etc. */}
                              <></>
                              <Marker position={center} />
                            </GoogleMap>
                          </LoadScript>
                        </div>
                      </div>
                      <div className="col-4 position-absolute bottom-0 end-0 translate-middle-y ">
                        <div className="card-body">
                          <h4 className="card-title">Location</h4>
                          <p
                            className="card-text"
                            style={{
                              fontSize: 18,
                              fontFamily: "Roboto",
                            }}
                          >
                            79179 Ahmanson Ln, La Quinta, CA 92253
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5 w-70 ">
            <div className="row">
              <div className="card text-center">
                <div className="card-body ">
                  <h5 className="card-title">Search for Dates</h5>
                  <div className=" ">
                    <div className="text-start position-absolute  start-25 ">
                      <DatePicker
                        className="text-center rounded"
                        placeholderText="Select Start Date"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart // tells this DatePicker that it is part of a range*
                        startDate={startDate}
                      />
                    </div>

                    <div className="text-end">
                      <DatePicker
                        className="text-center rounded"
                        placeholderText="Select End Date"
                        selected={endDate}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        onChange={(date) => setEndDate(date)}
                      />
                    </div>
                  </div>

                  <p className="card-text-center "></p>
                  <button href="#" className="btn btn-outline-primary ">
                    Search
                  </button>
                </div>
              </div>
              <span className="d-block p-1 bg-white text-white">d-block</span>
              <div className=" container  ">
                <span className="d-block p-1 bg-white text-white">d-block</span>
                <div className=" card container border-white ">
                  <div className="  position-absolute  end-0 text-end d-grid gap-5 col-4 mx-auto">
                    <div className=" text-center">
                      {" "}
                      <div className=" position-absolute  end-0">
                        <Link
                          to="/events/addevnts"
                          type="button"
                          data-page=""
                          className="btn btn-outline-dark me-2 "
                          href="#"
                          onClick={addFriendClick}
                          style={{ fontFamily: "sans-serif", fontSize: 20 }}
                        >
                          New Events
                        </Link>
                      </div>
                      <span className="d-block p-1 bg-white text-white">
                        d-block
                      </span>
                    </div>
                    <div className=" text-end  ">
                      <button href="#" className="btn btn-outline-success">
                        View All On Map
                      </button>
                    </div>
                  </div>

                  <div className="card-body margin-top">
                    <h3 className="card-title "> </h3>

                    <p className="card-text margin-top"></p>
                    <span className="d-block p-1 bg-white text-white"></span>
                    <div
                      className=" text end position-absolute  top-0 start-25"
                      style={{ fontFamily: "sans-serif", fontSize: 20 }}
                    >
                      <h3> Upcoming Events</h3>
                      <span className="d-block p-2 bg-white text-white"> </span>
                    </div>
                    <Pagination
                      className=" text end position-absolute  bottom-0 end-50"
                      current={pageData.pageIndex + 1}
                      pageSize={pageData.pageSize}
                      total={7}
                      onChange={onChange}
                    />
                    <span className="d-block p-4 bg-white text-white"> </span>
                    <div className=" d-inlined-grid gap-2 d-md-block">
                      <div className=" text-start position-absolute  start-25"></div>

                      <div className="text-end"></div>
                    </div>
                  </div>
                </div>
                <div> {pageData.peopleComponents}</div>
              </div>
              {/* <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Accordion Item #1</Accordion.Header>
                  <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Events;
