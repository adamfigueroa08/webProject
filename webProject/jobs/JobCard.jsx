import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function JobsCard(props, index) {
  console.log("person", props.person);
  const currentfriend = props.person;

  const onLocalclickdeleteCard = (e) => {
    console.log("on submit data ->", currentfriend);
    console.log("working d btn", e);

    props.onPersonClick(props.person);
  };

  const navigate = useNavigate();
  const onLocalEditCard = (e) => {
    e.preventDefault();
    console.log(currentfriend);
    navigate("/jobs/addjobs/", {
      state: { person: currentfriend, type: "update" },
    });
    //Navigate(e.currentTarget.dataset.page);
  };

  return (
    <div className="col-md-4   ">
      <div className="card bg-light h-100 border-dark ">
        <img
          src={currentfriend.techCompany.images[0].imageUrl}
          className="card-img-top img-thumbnail rounded rounded mx-auto d-block shadow border border-secondary"
          alt="This pic is cool"
          style={{ height: 180, width: 180 }}
        />
        <div className="card-body text-secondary">
          <h1 className="card-title text-center  ">{currentfriend.title}</h1>
          <p className="card-text text-center">{currentfriend.description}</p>
          <p
            className="card-text text-center"
            style={{ fontFamily: "sans-serif", fontSize: 25 }}
          >
            {" "}
            Pay {currentfriend.pay}
          </p>
          <p className="card-text text-center">{currentfriend.profile}</p>
          <div className="footer"></div>
        </div>
        <footer>
          <div className="d-grid gap-2 col-6 mx-auto">
            <Link
              to="/jobs/addJobs"
              type="button"
              data-page=""
              className="btn btn-success me-2"
              href="#"
              onClick={onLocalEditCard}
            >
              Edit
            </Link>
            <button
              className="btn btn-secondary"
              type="button"
              key={`${currentfriend.id}_${index}`}
              currentfriend={currentfriend}
              onClick={onLocalclickdeleteCard}
            >
              Delete
            </button>
          </div>
          <div className="App">
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default React.memo(JobsCard);
