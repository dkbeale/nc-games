import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/Auth";
import { getCategories, postNewReview } from "../utils/api";

const WriteReview = () => {
  const { user } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [designerInput, setDesignerInput] = useState("");
  const [bodyInput, setBodyInput] = useState("");
  const [chosenCategory, setChosenCategory] = useState("Choose Category");
  const [newReview, setNewReview] = useState(false);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res.data.categories);
    });
  }, [chosenCategory, newReview]);

  const submitReview = (e) => {
    e.preventDefault();
    postNewReview({
      title: titleInput,
      designer: designerInput,
      owner: user.username,
      review_body: bodyInput,
      category: chosenCategory,
    })
      .then(() => {
        setTitleInput("");
        setDesignerInput("");
        setBodyInput("");
        setChosenCategory("Choose Category");
      }).then(() => {
          setNewReview(true);
      })
      .catch((err) => {
        console.dir(err);
      });
  };

  if (!user) {
    return (
      <section>
        <div className="box">Please Sign In</div>
      </section>
    );
  }

  if (newReview) {
    return (
      <section>
        <div className="block is-large">
          <span className="tag is-success">
            Review Submitted!
            <button className="delete is-small" onClick={() => setNewReview(false)}></button>
          </span>
        </div>
      </section>
    );
  }

  return (
    <div>
      <form className="box" onSubmit={submitReview}>
        <div className="field">
          <label className="label">Title</label>
          <div className="control">
            <input
              required
              className="input"
              placeholder="Title of the game being reviewed"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Designer</label>
          <div className="control">
            <input
              required
              className="input"
              placeholder="Game Designer"
              value={designerInput}
              onChange={(e) => setDesignerInput(e.target.value)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="label">Review Body</label>
            <textarea
              required
              className="textarea is-medium"
              placeholder="Write your review here"
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="dropdown is-hoverable" required>
          <div className="dropdown-trigger">
            <button
              type="button"
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{chosenCategory}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {categories.map((category) => {
                return (
                  <>
                    <option
                      key={category.slug}
                      className="dropdown-item"
                      value={category.slug}
                      onClick={(e) =>
                        setChosenCategory(e.target.value)
                      }
                    >
                      {category.slug}
                    </option>
                    <hr className="dropdown-divider" />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <button className="button is-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
