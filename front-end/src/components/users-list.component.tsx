import { Component, ChangeEvent } from "react";
import UserDataService from "../services/user.service.ts";
import { Link } from "react-router-dom";
import IUserData from '../types/user.type.ts';
import React from "react";

type Props = {};

type State = {
  users: Array<IUserData>,
  currentUser: IUserData | null,
  currentIndex: number,
  searchUsername: string
};

export default class usersList extends Component<Props, State>{
  constructor(props: Props) {
    super(props);
    this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchUsername = this.searchUsername.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchUsername: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchUsername(e: ChangeEvent<HTMLInputElement>) {
    const searchUsername = e.target.value;

    this.setState({
      searchUsername: searchUsername
    });
  }

  //
  retrieveUsers() {
    UserDataService.get(this.state.searchUsername)
      .then((response: any) => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user: IUserData, index: number) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }
  //

  removeAllUsers() {
    UserDataService.deleteAll()
      .then((response: any) => {
        console.log(response.data);
        this.refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  searchUsername() {
    this.setState({
      currentUser: null,
      currentIndex: -1
    });

    UserDataService.get(this.state.searchUsername)
      .then((response: any) => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { searchUsername, users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchUsername}
              onChange={this.onChangeSearchUsername}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUsername}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user: IUserData, index: number) => (
                <li
                  key={index}
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveUser(user, index)}
                >
                  {user.username}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllUsers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUser.username}
              </div>
              <Link
                to={"/users/" + currentUser.id}//must be changed if using username
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}