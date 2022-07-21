import React, { useState, useEffect } from "react";
import friendsService from "../../services/friendsService";
import toastr from "toastr";
import Person from "./Person";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";

//import frindOne from "./FriendOne";
function Friends() {
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

  const [count, setCount] = useState(0); // FOR COUNT TOP OF PAGE

  const mapFriends = (aFriends) => {
    // MAPPING OF FRIENDS
    console.log("mapping", aFriends);
    return (
      <Person
        person={aFriends}
        key={"List A-" + aFriends.id}
        onPersonClick={clickDeleteCard}
      ></Person>
    );
  };

  console.log(mapFriends);

  useEffect(() => {
    console.log("firing use for friends");
    friendsService
      .getFriends(pageData.pageIndex, pageData.pageSize)
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
    console.log(pageData.id);
    const idToBeDeleted = pageData.id;
    console.log(idToBeDeleted);

    friendsService.deleteFriend(idToBeDeleted).then().catch();

    setPageData((prevState) => {
      //SET PAGE DATE FOR DELEATE
      const pd = { ...prevState };
      pd.arrayFriends = [...pd.arrayFriends];
      pd.peopleComponents = pd.arrayFriends.map(mapFriends);
      const idxOf = pd.arrayFriends.findIndex((aFriends) => {
        let result = false;

        if (aFriends.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });
      if (idxOf >= 1) {
        pd.arrayFriends.splice(idxOf, 0);
        pd.peopleComponents = pd.arrayFriends.map(mapFriends);
      }
      return pd;
    });
  };

  const onGetFriendsError = (err) => {
    console.log(err);
  };

  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };

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

    friendsService
      .getFriends(pageData.pageIndex, pageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  };

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);

    friendsService
      .getFriends(pageData.pageIndex, pageData.pageSize)
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
      <div className="container">
        <div class="container-fluid">
          {" "}
          <h5 style={{ fontFamily: "sans-serif" }}> Search Friends </h5>
        </div>
        <div class="input-group mb-3 ">
          <input type="text" onChange={(e) => searchItems(e.target.value)} />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Search
          </button>
        </div>

        <h1 onClick={onHeaderClicked} style={{ fontFamily: "sans-serif" }}>
          Friends {count}
        </h1>
        <button onClick={clickToggle} className="btn btn-warning" type="button">
          {showFriends ? "Hide" : "Show"}
        </button>
        <Link
          to="/friends/addFriends"
          type="button"
          data-page=""
          className="btn btn-success me-2"
          href="#"
          onClick={addFriendClick}
        >
          Add Friend
        </Link>

        <div className="row">{showFriends && pageData.peopleComponents}</div>
        <footer>
          <div className="container-xxl">
            <Pagination
              current={pageData.pageIndex + 1}
              pageSize={pageData.pageSize}
              total={7}
              onChange={onChange}
            />
          </div>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Friends;
