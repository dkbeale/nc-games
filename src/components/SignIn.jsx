import React, { useContext, useState } from "react";
import { UserContext } from "../context/Auth";
import { getSingleUser } from "../utils/api";

const SignIn = ({ setIsNavOpen }) => {
  const [modal, setModal] = useState(false);
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [failedLogin, setFailedLogin] = useState(false)
  const value = useContext(UserContext)

  const clicker = () => {
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
    }
  };

  const submitSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFailedLogin(false);
    getSingleUser(input)
      .then((user) => {
        setFailedLogin(false);
        setIsLoading(false);
        value.setUser(user.data.user);
      }).then(() => {
          setInput("");
          setModal(false)
      }).then(() => {
        setIsNavOpen(false);
      }).catch((err) => {
          setFailedLogin(true);
      })

  }
  // console.log(setIsNavOpen)

  return (
    <div>
      <button id="sign_in_button" onClick={() => clicker()}>
        Login
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
          <form onSubmit={submitSignIn}>
          <section className="modal-card-body">
            <div className={`control ${(isLoading) && "is-loading"}`}>  
            <input
              className={`input ${(!failedLogin) ? "is-primary" : "is-danger"}`}
              type="text"
              placeholder="Username"
              required
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            </div>
            {(failedLogin) && <p>Login Failed</p>}
          </section>
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={() => clicker()}
          ></button>
          <footer className="modal-card-foot">
            <button className="button is-success" type="submit">Sign in</button>
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

export default SignIn;
