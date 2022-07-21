import React from "react";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
import "rc-pagination/assets/index.css";
//import Pagination from "rc-pagination";
//import eventsServices from "../../services/eventsService";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Navigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Provider, LikeButton } from "@lyket/react";
//import Geocode from "react-geocode";
import { format } from "date-fns";
import "animate.css";
import Accordion from "react-bootstrap/Accordion";

function EventCards(props) {
  const contentStyle = { background: "#F5DF4D", width: 600 };
  const overlayStyle = { background: "rgba(168, 167, 164,0.5)" };

  const containerStyle = {
    width: 350,
    height: 250,
  };

  const currentEvent = props.event;

  const navigate = useNavigate();
  const onLocalEditCard = (e) => {
    e.preventDefault();
    console.log(currentEvent);
    navigate("/events/addevnts", {
      state: { person: currentEvent, type: "update" },
    });

    const addEventsClick = (e) => {
      Navigate(e.currentTarget.dataset.page);
    };
    console.log(addEventsClick);
  };
  // const center = {
  //   // lat: currentEvent.lalatitude,
  //   lat: 36.5697,
  //   lng: -121.9498,
  // };
  // Geocode.setApiKey("AIzaSyCMR-9jqnIbymGQWD0UFGuRMZZL7qZm5xI");
  // Geocode.setLanguage("en");
  // Geocode.fromAddress(currentEvent.metaData.location.address).then(
  //   (response) => {
  //     const { lat, lng } = response.results[0].geometry.location;
  //     console.log(lat, lng);
  //   },
  //   (error) => {
  //     console.error(error);
  //   }
  // );

  return (
    <React.Fragment>
      <div className="col  ">
        <div className="row">
          <span className="d-block p-1 bg-white text-white">d-block</span>

          <div className="card text-center">
            <div className="card-body">
              <h3 className="card-title">{currentEvent.name}</h3>
              <p
                className="card-text "
                style={{ fontFamily: "Roboto", fontSize: 17 }}
              >
                {currentEvent.description}
              </p>
              <div className=" d-inlined-grid gap-2 d-md-block  ">
                <div className=" text-start position-absolute  start-25">
                  <div className=" mx-auto  ">
                    <Popup
                      __animate__fadeInDown__slow
                      style={{ width: 600 }}
                      position="Top "
                      trigger={
                        <button
                          className="btn rounded btn-outline-secondary ;"
                          style={{ fontFamily: "Roboto", fontSize: 20 }}
                        >
                          {" "}
                          More Info{" "}
                        </button>
                      }
                      {...{ contentStyle, overlayStyle }}
                    >
                      <span
                        className=" d-block p-1 bg-warning text-dark text-center"
                        style={{ fontFamily: "Roboto", fontSize: 25 }}
                      >
                        <div className="col"></div>
                        <h3 className="card-title">{currentEvent.name}</h3>
                        <p style={{ fontFamily: "Roboto", fontSize: 20 }}>
                          {format(
                            new Date(currentEvent.metaData.dateStart),
                            "PPPP"
                          )}
                        </p>
                      </span>

                      <span className="container text-center  ">
                        <div
                          className="ml-5 ml-lg-0"
                          style={{ fontSize: 18, fontFamily: "Roboto" }}
                        >
                          <div style={{ fontSize: 25, fontFamily: "Roboto" }}>
                            Address
                          </div>
                          {currentEvent.metaData?.location?.address}
                        </div>
                      </span>
                      <div>
                        {" "}
                        <Accordion defaultActiveKey="">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              Accordion Item #1
                            </Accordion.Header>
                            <Accordion.Body>
                              <LoadScript googleMapsApiKey="AIzaSyCMR-9jqnIbymGQWD0UFGuRMZZL7qZm5xI">
                                <GoogleMap
                                  mapContainerStyle={containerStyle}
                                  center={{
                                    lat: currentEvent.metaData.location
                                      .latitude,
                                    lng: currentEvent.metaData.location
                                      .longitude,
                                  }}
                                  zoom={13}
                                >
                                  {/* Child components, such as markers, info windows, etc. */}
                                  <></>
                                  <Marker
                                    position={{
                                      lat: 36.5697,
                                      lng: -121.9498,
                                    }}
                                  />
                                </GoogleMap>
                              </LoadScript>
                              <div className="col-3 container  position-absolute  end-0 bottom-0">
                                <header
                                  style={{ fontSize: 30, fontFamily: "Roboto" }}
                                >
                                  Love it!
                                </header>
                                <Provider
                                  apiKey="pt_d9d887534cc809bddacad358a46a78"
                                  theme={{
                                    colors: {
                                      background: "#b8fff3",
                                      text: "black",
                                      primary: "rgba(55, 224, 138, 0.4)",
                                    },
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 30,
                                      fontFamily: "Roboto",
                                    }}
                                  >
                                    <LikeButton
                                      namespace="my-blog-post"
                                      id="how-to-beat-me-at-chess"
                                      component={LikeButton.templates.Twitter}
                                    />
                                  </div>
                                </Provider>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>

                      <footer className=" d-block p-1 bg-warning text-dark text-center"></footer>
                    </Popup>
                  </div>
                </div>

                <div className="text-end">
                  <button
                    href="#"
                    className="btn btn-outline-secondary text-end"
                    onClick={onLocalEditCard}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EventCards;
