import React, { useState } from "react";
//import { useContext } from "react/cjs/react.development";
//import { UserContext } from "../context/Auth";
import { postNewUser } from "../utils/api";

const SignUp = () => {
  const [modal, setModal] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  //const value = useContext(UserContext);

  const clicker = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFailedLogin(false);
    postNewUser({
      username: userNameInput,
      name: nameInput,
      avatar_url: imgUrlInput,
    }).then((user) => {
        setFailedLogin(false);
        setIsLoading(false);
        //value.setUser(user.data.user)
    }).then(() => {
        setUserNameInput("");
        setNameInput("");
        setImgUrlInput("");
        setModal(false);
    }).catch(() => {
        setFailedLogin(true);
    });
  };

  return (
    <div>
      <button id="sign_up_button" onClick={() => clicker()}>
        Sign Up
      </button>
      <div class={`modal ${modal && "is-active"}`}>
        <div class="modal-background" onClick={() => clicker()}></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Sign In</p>
            <button
              class="delete"
              aria-label="close"
              onClick={() => clicker()}
            ></button>
          </header>
          <form onSubmit={submitSignUp}>
            <section class="modal-card-body">
              <div class={`control ${isLoading && "is-loading"}`}>
                <input
                  class={`input ${!failedLogin ? "is-primary" : "is-danger"}`}
                  type="text"
                  placeholder="Username"
                  required
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                />
                <input
                  class={`input ${!failedLogin ? "is-primary" : "is-danger"}`}
                  type="text"
                  placeholder="Name"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <input
                  class={`input ${!failedLogin ? "is-primary" : "is-danger"}`}
                  type="text"
                  placeholder="URL for your profile picture"
                  required
                  value={imgUrlInput}
                  onChange={(e) => setImgUrlInput(e.target.value)}
                />
              </div>
              {failedLogin && <p>Login Failed</p>}
            </section>
            <button
              class="modal-close is-large"
              aria-label="close"
              onClick={() => clicker()}
            ></button>
            <footer class="modal-card-foot">
              <button class="button is-success" type="submit">
                Sign in
              </button>
              <button class="button" onClick={() => clicker()}>
                Cancel
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
