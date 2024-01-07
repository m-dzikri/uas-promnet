import React, { Component } from 'react'
import UserService from '../services/UserService'
import Swal from 'sweetalert2'

class ListUserComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            search: ''
        };
        this.addUser = this.addUser.bind(this);
        this.editUser = this.editUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    deleteUser(id) {
        UserService.deleteUser(id).then(res => {
            this.setState({
                users:
                    this.state.users.
                        filter(user => user.id !== id)
            });
        });
    }

    viewUser(id) {
        this.props.history.push(`/view-user/${id}`);
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    componentDidMount() {
        UserService.getUsers().then((res) => {
            if (res.data == null) {
                this.props.history.push('/add-user/_add');
            }
            this.setState({ users: res.data });
        });
    }

    addUser() {
        this.props.history.push('/add-user/_add');
    }

    handleSearchChange(event) {
        this.setState({ search: event.target.value });
    }

    deleteUser(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                UserService.deleteUser(id)
                    .then(() => {
                        this.setState({
                            users: this.state.users.filter(user => user.id !== id)
                        });

                        Swal.fire(
                            'Deleted!',
                            'Transaction data has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        Swal.fire(
                            'Error!',
                            'Failed to delete transaction data.',
                            'error'
                        );
                    });
            }
        });
    }

    editUser(id) {
        this.props.history.push(`/add-user/${id}`);
    }

    showUpdateSuccessNotification() {
        Swal.fire(
            'Updated!',
            'Transaction data has been updated.',
            'success'
        )
    }

    componentDidUpdate(prevProps) {
        if (prevProps.location.pathname !== this.props.location.pathname) {
            this.showUpdateSuccessNotification();
        }
    }

    render() {
        const { users, search } = this.state;

        const filteredUsers = users.filter((user) => {
            return (
                user.date.toLowerCase().includes(search.toLowerCase()) ||
                user.description.toLowerCase().includes(search.toLowerCase()) ||
                user.amount.toString().includes(search) ||
                user.status.toLowerCase().includes(search.toLowerCase()) ||
                user.receiver.toLowerCase().includes(search.toLowerCase()) ||
                user.jk.toLowerCase().includes(search.toLowerCase()) ||
                user.no_telp.includes(search) ||
                user.address.toLowerCase().includes(search.toLowerCase())
            );
        });

        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-11 offset-md-3" style={{ marginLeft: "3.5em", marginTop: "-80px" }}>
                            <h3 className="text-center">Transaction List</h3>
                            <div className="card-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="inputGroup-sizing-default">Search</span>
                                    </div>
                                    <input
                                    type="text"
                                    placeholder=""
                                    value={search}
                                    onChange={this.handleSearchChange}
                                />
                                </div>
                            
                                <div className="table-responsive">
                                    <table
                                        className="table table-bordered dt-responsive"
                                        style={{ borderCollapse: "collapse", borderSpacing: "0" }}>
                                        <thead>
                                            <tr className="text-center table-secondary">
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Receiver</th>
                                                <th>Gender</th>
                                                <th>Phone</th>
                                                <th>Address</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                filteredUsers.map((user) => (
                                                    <tr key={user.id} className="text-center">
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.date}
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.description}
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.amount}
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.status}
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.receiver}
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.jk}
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.no_telp}
                                                        </td>
                                                        <td style={{ verticalAlign: "middle" }}>
                                                            {user.address}
                                                        </td>
                                                        <td>
                                                            <button onClick={() =>
                                                                this.editUser(user.id)}
                                                                className="btn btn-outline-primary btn-sm">
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                                                        fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd"
                                                                            d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                                                        <path
                                                                            d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                                                                    </svg>
                                                                </span>

                                                            </button>
                                                            <button style={{ marginLeft: "10px" }}
                                                                onClick={() => this.deleteUser(user.id)}
                                                                className="btn btn-outline-danger btn-sm">
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                                                        fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd"
                                                                            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                                    </svg>
                                                                </span>

                                                            </button>
                                                            <button style={{ marginLeft: "10px" }}
                                                                onClick={() => this.viewUser(user.id)}
                                                                className="btn btn-outline-info btn-sm">
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                                                                        fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                                        <path fill-rule="evenodd"
                                                                            d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                                                                        <path
                                                                            d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                                                    </svg>
                                                                </span>

                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                    <button className="btn btn-primary"
                                        onClick={this.addUser}>Add Transaction</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListUserComponent
