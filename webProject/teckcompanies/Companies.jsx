import React, { useState, useEffect } from "react";
import companiesServices from "../../services/companiesServices";
import toastr from "toastr";
import CompCard from "./CompCard";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";

//import frindOne from "./FriendOne";
function Companies() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showFriends, showFriendsToggle] = useState(true); // for btns
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
      <CompCard
        person={aFriends}
        key={"List A-" + aFriends.id}
        onPersonClick={clickDeleteCard}
      ></CompCard>
    );
  };

  console.log(mapFriends);

  useEffect(() => {
    console.log("firing use for friends");
    companiesServices
      .getCompanies(pageData.pageIndex, pageData.pageSize)
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
      pd.peopleComponents = arrayOne.map(mapFriends);
      return pd;
    }, []);
  };

  const clickDeleteCard = (pageData) => {
    console.log("on submit data ->", pageData);
    //console.log(pageData.id);
    const idToBeDeleted = pageData.id;
    const pdStatusId = (pageData.statusId = "Deleted");

    console.log(pdStatusId);

    companiesServices.deleteCompanies(idToBeDeleted, pdStatusId).then().catch();

    setPageData((prevState) => {
      //SET PAGE DATE FOR DELEATE
      const pd = { ...prevState };
      pd.statusId = "Deleted";
      pd.arrayFriends = [...pd.arrayFriends];
      pd.peopleComponents = pd.arrayFriends.map(mapFriends);
      const idxOf = pd.arrayFriends.findIndex((aFriends) => {
        let result = true;

        if (aFriends.statusId === "Active") {
          result = aFriends.statusId = "Deleted";
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

  const clickToggle = () => {
    showFriendsToggle(!showFriends);
    toastr.success("oh YEAHAAAAA!");
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

    companiesServices
      .getCompanies(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    companiesServices
      .getCompanies(pageData.pageIndex, pageData.pageSize)
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
      <h1>Companies {}</h1>

      <div className="container">
        <div class="container-fluid">
          {" "}
          <h5> Search Companies </h5>
        </div>
        <div class="input-group mb-3">
          <input type="text" onChange={(e) => searchItems(e.target.value)} />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>

        {/* <h1 onClick={onHeaderClicked}>Friends {count}</h1> */}
        <button
          onClick={clickToggle}
          className="btn btn-outline-light"
          type="button"
        >
          {showFriends ? "Hide" : "Show"}
        </button>
        <Link
          to="/companies/addCompanies"
          type="button"
          data-page=""
          className="btn btn-outline-secondary me-2"
          href="#"
          onClick={addFriendClick}
        >
          + Companies
        </Link>

        <div className="row">{showFriends && pageData.peopleComponents}</div>
        <Pagination
          current={pageData.pageIndex + 1}
          pageSize={pageData.pageSize}
          total={19}
          onChange={onChange}
        />
      </div>
    </React.Fragment>
  );
}

export default Companies;

// import React from "react";
// function Companies(props) {

//   return (
//     <React.Fragment>
//       <h1>Companies {props.name}</h1>

//       <hr />
//     </React.Fragment>
//   );
// }

// export default Companies;
