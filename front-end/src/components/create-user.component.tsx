import { Component, ChangeEvent } from "react";
import UserDataService from "../services/user.service.ts";
import IUserData from '../types/user.type.ts';
import React from "react";

type Props = {};

type State = IUserData & {
  submitted: boolean
};

export default class AddUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      username: "",
      submitted: false
    };
  }

  onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      username: e.target.value
    });
  }

  saveUser() {
    const data: IUserData = {
      username: this.state.username
    };

    UserDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          username: response.data.username,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      username: "",
      submitted: false
    });
  }

  render() {
    const { submitted, username} = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Create
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}