import React, { Component } from "react";
import UserService from "../services/UserService";
import Swal from 'sweetalert2';

class CreateUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // step 2
      id: this.props.match.params.id,
      date: "",
      description: "",
      amount: "",
      status: "",
      receiver: "",
      jk: "",
      no_telp: "",
      address: "",
    };
    this.changeDate = this.changeDate.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.changeReceiver = this.changeReceiver.bind(this);
    this.changeJK = this.changeJK.bind(this);
    this.changeNoTelp = this.changeNoTelp.bind(this);
    this.changeAddress = this.changeAddress.bind(this);
    this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
  }

  // step 3
  componentDidMount() {
    // step 4
    if (this.state.id === "_add") {
      return;
    } else {
      UserService.getUserById(this.state.id).then((res) => {
        let user = res.data;
        this.setState({
          date: user.date,
          description: user.description,
          amount: user.amount,
          status: user.status,
          receiver: user.receiver,
          jk: user.jk,
          no_telp: user.no_telp,
          address: user.address,
        });
      });
    }
  }
  saveOrUpdateUser = (e) => {
    e.preventDefault();
    if (
      !this.state.date ||
      !this.state.description ||
      !this.state.amount ||
      !this.state.status ||
      !this.state.receiver ||
      !this.state.jk ||
      !this.state.no_telp ||
      !this.state.address
    ) {
      this.showErrorNotification('Transaction data cannot be empty.');
      return;
    }

    let user = {
      date: this.state.date,
      description: this.state.description,
      amount: this.state.amount,
      status: this.state.status,
      receiver: this.state.receiver,
      jk: this.state.jk,
      no_telp: this.state.no_telp,
      address: this.state.address,
    };
    console.log("user => " + JSON.stringify(user));

    // step 5
    if (this.state.id === "_add") {
      UserService.createUser(user).then((res) => {
        this.props.history.push("/users");
        this.showSuccessNotification('Transaction data has been added.');
      });
    } else {
      UserService.updateUser(user, this.state.id).then((res) => {
        this.props.history.push("/users");
        this.showUpdateSuccessNotification();
      });
    }
  };

  changeDate = (event) => {
    this.setState({ date: event.target.value });
  };

  changeDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  changeAmount = (event) => {
    this.setState({ amount: event.target.value });
  };

  changeStatus = (event) => {
    this.setState({ status: event.target.value });
  };

  changeReceiver = (event) => {
    this.setState({ receiver: event.target.value });
  };

  changeJK = (event) => {
    console.log(event.target.value);
    this.setState({ jk: event.target.value });
  };

  changeNoTelp = (event) => {
    this.setState({ no_telp: event.target.value });
  };

  changeAddress = (event) => {
    this.setState({ address: event.target.value });
  };

  cancel() {
    this.props.history.push("/users");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Transaction</h3>;
    } else {
      return <h3 className="text-center">Update Transaction</h3>;
    }
  }

  showUpdateSuccessNotification() {
    Swal.fire(
      'Updated!',
      'Transaction data has been updated.',
      'success'
    );
  }

  showSuccessNotification = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  };

  showErrorNotification = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
    });
  };

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-11 offset-md-3" style={{ marginLeft: "3.5em", marginTop: "-80px" }}>
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-row">
                    <div className="form-group col-6">
                      {/* <label> Date </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-calendar-date-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                              <path
                                d="M16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 0 1 1.313-.805h.632z" />
                            </svg>
                          </span>
                        </div>
                        <input
                          type="date"
                          placeholder="Date"
                          name="date"
                          className="form-control"
                          value={this.state.date}
                          onChange={this.changeDate}
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      {/* <label> Receiver </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                            </svg>
                          </span>
                        </div>
                        <input
                          placeholder="Receiver"
                          name="receiver"
                          className="form-control"
                          value={this.state.receiver}
                          onChange={this.changeReceiver}
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      {/* <label> Description </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-card-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2M5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5M5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m0 2h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1" />
                            </svg>
                          </span>
                        </div>
                        <input
                          placeholder="Description"
                          name="description"
                          className="form-control"
                          value={this.state.description}
                          onChange={this.changeDescription}
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      {/* <label> Jenis Kelamin </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-gender-ambiguous-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M11.5 1a.5.5 0 0 1 0-1h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-3.45 3.45A4 4 0 0 1 8.5 10.97V13H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V14H6a.5.5 0 0 1 0-1h1.5v-2.03a4 4 0 1 1 3.471-6.648L14.293 1zm-.997 4.346a3 3 0 1 0-5.006 3.309 3 3 0 0 0 5.006-3.31z" />
                            </svg>
                          </span>
                        </div>
                        <select
                          name="jk"
                          className="form-control"
                          value={this.state.jk}
                          onChange={this.changeJK}
                        >
                          <option value="L">Male</option>
                          <option value="P">Female</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-6">
                      {/* <label> Amount </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-currency-dollar-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                            </svg>
                          </span>
                        </div>
                        <input
                          placeholder="Amount"
                          name="amount"
                          className="form-control"
                          value={this.state.amount}
                          onChange={this.changeAmount}
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      {/* <label> No Telepon </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                          </span>
                        </div>
                        <input
                          placeholder="Phone Number"
                          name="no_telp"
                          className="form-control"
                          value={this.state.no_telp}
                          onChange={this.changeNoTelp}
                        />
                      </div>
                    </div>
                    <div className="form-group col-6">
                      {/* <label> Status </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-credit-card-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1H0zm0 3v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zm3 2h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1" />
                            </svg>
                          </span>
                        </div>
                        <select
                          name="status"
                          className="form-control"
                          value={this.state.status}
                          onChange={this.changeStatus}
                        >
                          <option value="Debit">Debit</option>
                          <option value="Kredit">Kredit</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group col-6">
                      {/* <label> Address </label> */}
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd"
                                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293z" />
                              <path
                                d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z" />
                            </svg>
                          </span>
                        </div>
                        <input
                          placeholder="Address"
                          name="address"
                          className="form-control"
                          value={this.state.address}
                          onChange={this.changeAddress}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center align-content-center">
                    <button
                      className="btn btn-primary "
                      onClick={this.saveOrUpdateUser}
                      style={{ width: "7em", marginTop: "15px" }}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={this.cancel.bind(this)}
                      style={{ width: "7em", marginLeft: "10px", marginTop: "15px" }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateUserComponent;
