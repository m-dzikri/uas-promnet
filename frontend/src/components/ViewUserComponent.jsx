import React, { Component } from "react";
import UserService from "../services/UserService";

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      user: {},
    };
  }

  componentDidMount() {
    UserService.getUserById(this.state.id).then((res) => {
      this.setState({ user: res.data });
    });
  }

  cancel() {
    this.props.history.push("/users");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-11 offset-md-3" style={{ marginLeft: "3.5em", marginTop: "-80px" }}>
              <h3 className="text-center">View Transaction Details</h3>
              <div className="card-body">
                <div className="row d-flex justify-content-center align-content-center">
                  <div className="col-auto">
                    <table className="table table-borderless table-responsive">
                      <thead>
                        <tbody>
                          <tr>
                            <th>Date</th>
                            <div className="vr" />
                            <td>{this.state.user.date}</td><th />
                            <th>Receiver</th>
                            <div className="vr" />
                            <td>{this.state.user.receiver}</td>
                          </tr>
                          <tr>
                            <th>Description</th>
                            <div className="vr" />
                            <td>{this.state.user.description}</td><th />
                            <th>Gender</th>
                            <div className="vr" />
                            <td>{this.state.user.jk}</td>
                          </tr>
                          <tr>
                            <th>Amount</th>
                            <div className="vr" />
                            <td>{this.state.user.amount}</td><th />
                            <th>Phone</th>
                            <div className="vr" />
                            <td>{this.state.user.no_telp}</td>
                          </tr>
                          <tr>
                            <th>Status</th>
                            <div className="vr" />
                            <td>{this.state.user.status}</td><th />
                            <th>Address</th>
                            <div className="vr" />
                            <td>{this.state.user.address}</td>
                          </tr>
                        </tbody>
                      </thead>
                    </table>
                    <button className="btn btn-outline-primary"
                      style={{marginLeft:"11px"}}
                      onClick={this.cancel.bind(this)}>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17"
                          fill="currentColor" class="bi bi-arrow-left" viewBox="0 2 15 15">
                          <path fill-rule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
