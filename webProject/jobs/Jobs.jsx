import React, { useState, useEffect } from "react";
import jobServices from "../../services/jobsServices";
// import toastr from "toastr";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import JobCard from "../jobs/JobCard";
//import frindOne from "./FriendOne";
function Jobs() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // const [showFriends, showFriendsToggle] = useState(true); // for btns
  const [pageData, setPageData] = useState({
    current: 1,
    pageIndex: 0,
    pageSize: 3,
    total: 0,
    arrayFriends: [], // friends cards
    peopleComponents: [],
  });

  console.log(filteredResults);

  // const [count, setCount] = useState(0); // FOR COUNT TOP OF PAGE

  const mapFriends = (aFriends) => {
    // MAPPING OF FRIENDS
    console.log("mapping", aFriends);
    return (
      <JobCard
        person={aFriends}
        key={"List A-" + aFriends.id}
        onPersonClick={clickDeleteCard}
      ></JobCard>
    );
  };

  console.log(mapFriends);

  useEffect(() => {
    console.log("firing use for friends");
    jobServices
      .getJobs(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  }, []);

  const onGetFriendsSuccess = (response) => {
    //  console.log(data);
    let arrayOne = response.data.item.pagedItems;
    console.log({ arrayOne });

    setPageData(
      (prevState) => {
        // SET PAGE DATA
        const pd = { ...prevState };
        pd.arrayFriends = arrayOne;
        pd.peopleComponents = arrayOne.map(mapFriends);
        return pd;
      },
      [1]
    );
  };

  const clickDeleteCard = (pageData) => {
    console.log("pageData", pageData);
    const idToBeDeleted = pageData.id;
    console.log("idToBeDeleted", idToBeDeleted);

    pageData.techCompanyId = pageData.techCompany.id;
    pageData.techCompany = [];

    pageData.statusId = "Deleted";
    pageData.skills = pageData.skills.map((skill) => skill.name);
    jobServices.editJobs(pageData, idToBeDeleted).then().catch();

    setPageData((prevState) => {
      //SET PAGE DATE FOR DELEATE
      const pd = { ...prevState };
      pd.statusId = "Deleted";
      pd.arrayFriends = [...pd.arrayFriends];
      //   pd.peopleComponents = pd.arrayFriends.map(mapFriends);
      const idxOf = pd.arrayFriends.findIndex((aFriends) => {
        let result = true;

        if (aFriends.statusId === "Active") {
          result = aFriends.techCompany.statusId = "Deleted"; // next step is to set sattusid to array lime imges and skills.
        }
        return result;
      });
      if (idxOf >= 0) {
        pd.arrayFriends.splice(idxOf, 1);
        pd.peopleComponents = pd.arrayFriends.map(mapFriends);
      }
      return pd;
    });
  };

  const onGetFriendsError = (err) => {
    console.log(err);
  };

  // const onHeaderClicked = () => {
  //   setCount((prevState) => {
  //     return prevState + 1;
  //   });
  // };

  // const clickToggle = () => {
  //   showFriendsToggle(!showFriends);
  //   toastr.success("oh YEAHAAAAA!");
  // };

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

    jobServices
      .getJobs(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    jobServices
      .getJobs(pageData.pageIndex, pageData.pageSize)
      .then(setSearchInput)
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
      <h1 style={{ fontFamily: "sans-serif" }}>Jobs {}</h1>

      <div className="container">
        <div className="container-fluid">
          {" "}
          <h5 style={{ fontFamily: "sans-serif" }}> Search Jobs </h5>
        </div>
        <div className="input-group mb-3">
          <input type="text" onChange={(e) => searchItems(e.target.value)} />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>

        {/* <h1 onClick={onHeaderClicked}>Friends {count}</h1> */}
        {/* <button onClick={clickToggle} className="btn btn-warning" type="button">
          {showFriends ? "Hide" : "Show"}
        </button> */}
        <div>
          <Link
            to="/jobs/addJobs"
            type="button"
            data-page=""
            className="btn btn-success me-2 "
            href="#"
            onClick={addFriendClick}
            style={{ fontFamily: "sans-serif", fontSize: 25 }}
          >
            + Job
          </Link>
        </div>
        <div className="row">{pageData.peopleComponents}</div>
        <Pagination
          current={pageData.pageIndex + 1}
          pageSize={pageData.pageSize}
          total={6}
          onChange={onChange}
        />
      </div>
    </React.Fragment>
  );
}

export default Jobs;

// import React from "react";
// function Jobs(props) {
//   return (
//     <React.Fragment>
//       <h1>Jobs {props.name}</h1>

//       <hr />
//     </React.Fragment>
//   );
// }

// export default Jobs;
