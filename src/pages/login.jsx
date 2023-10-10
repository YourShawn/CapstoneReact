import React from "react";
import Header from "../component/header";
import Footer from "../component/footer";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="login">
        <div className="login_card">
          <h4>Login</h4>
          <form>
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label">
                Email address
              </label>
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div class="mb-3">
              <label for="inputPassword5" class="form-label">
                Password
              </label>
              <input
                type="password"
                id="inputPassword5"
                class="form-control"
                aria-describedby="passwordHelpBlock"
              />
            </div>
            <button className="btn btn-secondary w-100">Login</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
