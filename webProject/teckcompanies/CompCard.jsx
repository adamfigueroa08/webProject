import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function CompCard(props, index) {
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
    navigate("/companies/addCompanies/", {
      state: { person: currentFriend, type: "update" },
    });
    //Navigate(e.currentTarget.dataset.page);
  };

  return (
    <div className="col-md-4 row  ">
      <div className="card bg-light shadow ">
        <img
          src={currentFriend.images[0].imageUrl}
          className=" card-img-top img-thumbnail rounded-circle rounded rounded mx-auto d-block shadow border padding-top border border-secondary"
          alt="This pic is cool"
          style={{ height: 180, width: 180 }}
        />
        <div className="card-body text-secondary ">
          <h1
            className="card-title text-center"
            style={{ fontFamily: "sans-serif", fontSize: 27 }}
          >
            {currentFriend.name}
          </h1>
          <p
            className="card-text text-center"
            style={{ fontFamily: "sans-serif" }}
          ></p>
          <p className="card-text text-center">{currentFriend.summary}</p>
          <p className="card-text text-center">{currentFriend.profile}</p>
          <div className="footer"></div>
        </div>
        <footer>
          <div className="d-grid gap-2 col-2 mx-auto">
            <Link
              to="/companies/addCompanies"
              type="button"
              data-page=""
              className="btn btn-outline-secondary me-2 "
              href="#"
              onClick={onLocalEditCard}
              style={{ fontFamily: "sans-serif", fontSize: 18 }}
            >
              Edit
            </Link>
            <button
              className="btn btn-outline-danger"
              type="button"
              key={`${currentFriend.id}_${index}`}
              currentFriend={currentFriend}
              onClick={onLocalclickdeleteCard}
              style={{ fontFamily: "sans-serif", fontSize: 18 }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default React.memo(CompCard);
