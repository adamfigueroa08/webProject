import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Person(props, index) {
  console.log("person", props.person);
  const currentFriend = props.person;

  const onLocalclickdeleteCard = (e) => {
    console.log("working d btn", e);
    props.onPersonClick(props.person);
  };

  const navigate = useNavigate();
  const onLocalEditCard = (e) => {
    e.preventDefault();
    console.log(currentFriend);
    navigate("/friends/addFriends/" + currentFriend.id, {
      state: { person: currentFriend, type: "update" },
    });
    //Navigate(e.currentTarget.dataset.page);
  };

  return (
    <div className="col-md-4">
      <div className="card h-100 shadow border border-secondary">
        <header></header>
        <img
          src={currentFriend.primaryImage.imageUrl}
          className="card-img-top img-thumbnail  rounded-circle rounded mx-auto d-block "
          alt="This pic is cool"
          style={{ height: 180, width: 180 }}
        />
        <div className="card-body ">
          <h1
            className="card-title text-center "
            style={{ fontFamily: "sans-serif", fontSize: 27 }}
          >
            {currentFriend.title}
          </h1>
          <p className="card-text text-center">{currentFriend.bio} </p>
          <p className="card-text text-center">{currentFriend.summary}</p>
          <p className="card-text text-center">{currentFriend.headline}</p>
          <div className="footer"></div>
        </div>
        <footer>
          <div className="d-grid gap-2 col-6 mx-auto">
            <Link
              to="/friends/addFriends"
              type="button"
              data-page=""
              className="btn btn-success me-2"
              href="#"
              onClick={onLocalEditCard}
            >
              Edit
            </Link>
            <button
              className="btn btn-danger"
              type="button"
              key={`${currentFriend.id}_${index}`}
              currentFriend={currentFriend}
              onClick={onLocalclickdeleteCard}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default React.memo(Person);
