import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      isLoading: false,
      invalidRegister: false,
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    this.setState({ isLoading: true });
    fetch("https://tranquil-dawn-70394.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          this.setState({ invalidRegister: true });
          throw new Error("Something went wrong when trying to register");
        }
      })
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      })
      .catch((error) => {
        this.setState({ isLoading: false });
      });
  };

  onEnter = (e) => {
    if (e.which === 13) {
      this.onSubmitRegister();
    }
  };

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 container center">
        <main className="pa4 white-70 w-80" onKeyPress={this.onEnter}>
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
              </div>
              <div>
                {this.state.invalidRegister && (
                  <span classname="dib">
                    {" "}
                    Invalid registration information, please try again{" "}
                  </span>
                )}
              </div>
            </fieldset>
            <div className="">
              <button
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black white-70 bg-transparent grow pointer f6 dib bg-navy"
              >
                {!this.state.isLoading && <span>Register</span>}
                {this.state.isLoading && <span>Registering...</span>}
              </button>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
