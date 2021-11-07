import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
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
        <div class="box">Please Sign In</div>
      </section>
    );
  }

  if (newReview) {
    return (
      <section>
        <div class="block is-large">
          <span class="tag is-success">
            Review Submitted!
            <button class="delete is-small" onClick={() => setNewReview(false)}></button>
          </span>
        </div>
      </section>
    );
  }

  return (
    <div>
      <form class="box" onSubmit={submitReview}>
        <div class="field">
          <label class="label">Title</label>
          <div class="control">
            <input
              required
              class="input"
              placeholder="Title of the game being reviewed"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Designer</label>
          <div class="control">
            <input
              required
              class="input"
              placeholder="Game Designer"
              value={designerInput}
              onChange={(e) => setDesignerInput(e.target.value)}
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label">Review Body</label>
            <textarea
              required
              class="textarea is-medium"
              placeholder="Write your review here"
              value={bodyInput}
              onChange={(e) => setBodyInput(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div class="dropdown is-hoverable" required>
          <div class="dropdown-trigger">
            <button
              type="button"
              class="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{chosenCategory}</span>
              <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              {categories.map((category) => {
                return (
                  <>
                    <a
                      key={category.slug}
                      href="#"
                      class="dropdown-item"
                      value={category.slug}
                      onClick={(e) =>
                        setChosenCategory(e.target.attributes[2].nodeValue)
                      }
                    >
                      {category.slug}
                    </a>
                    <hr class="dropdown-divider" />
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <button class="button is-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WriteReview;
