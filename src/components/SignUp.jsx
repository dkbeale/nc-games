import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/Auth";
import { postNewUser } from "../utils/api";

const SignUp = ({ setIsNavOpen }) => {
  const [modal, setModal] = useState(false);
  const [userNameInput, setUserNameInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const value = useContext(UserContext); 

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
        value.setUser(user.data.user)
    }).then(() => {
        setUserNameInput("");
        setNameInput("");
        setImgUrlInput("");
        setModal(false);
    }).then(() => {
      setIsNavOpen(false)
    }).catch(() => {
        setFailedLogin(true);
    });
  };

  return (
    <div>
      <button id="sign_up_button" onClick={() => clicker()}>
        Register
      </button>
      <div className={`modal ${modal && "is-active"}`}>
        <div className="modal-background" onClick={() => clicker()}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Sign In</p>
            <button
              className="delete"
              aria-label="close"
              onClick={() => clicker()}
            ></button>
          </header>
          <form onSubmit={submitSignUp}>
            <section className="modal-card-body">
              <div className={`control ${isLoading && "is-loading"}`}>
                <input
                  className={`input ${!failedLogin ? "is-primary" : "is-danger"}`}
                  type="text"
                  placeholder="Username"
                  required
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                />
                <input
                  id="sign_up_name"
                  className={`input ${!failedLogin ? "is-primary" : "is-danger"}`}
                  type="text"
                  placeholder="Name"
                  required
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                />
                <input
                  className={`input ${!failedLogin ? "is-primary" : "is-danger"}`}
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
              className="modal-close is-large"
              aria-label="close"
              onClick={() => clicker()}
            ></button>
            <footer className="modal-card-foot">
              <button className="button is-success" type="submit">
                Sign in
              </button>
              <button className="button" onClick={() => clicker()}>
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
