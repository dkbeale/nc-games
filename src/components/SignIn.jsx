import React, { useContext, useState } from "react";
import { UserContext } from "../context/Auth";
import { getSingleUser } from "../utils/api";

const SignIn = () => {
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
    setIsLoading(true)
    setFailedLogin(false)
    getSingleUser(input)
      .then((user) => {
        setFailedLogin(false)
        setIsLoading(false)
        value.setUser(user.data.user)
      }).then(() => {
          setInput("")
          setModal(false);
      }).catch((err) => {
          setFailedLogin(true)
      })

  }


  return (
    <div>
      <button id="sign_in_button" onClick={() => clicker()}>
        Login
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
          <form onSubmit={submitSignIn}>
          <section class="modal-card-body">
            <div class={`control ${(isLoading) && "is-loading"}`}>  
            <input
              class={`input ${(!failedLogin) ? "is-primary" : "is-danger"}`}
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
            class="modal-close is-large"
            aria-label="close"
            onClick={() => clicker()}
          ></button>
          <footer class="modal-card-foot">
            <button class="button is-success" type="submit">Sign in</button>
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

export default SignIn;
