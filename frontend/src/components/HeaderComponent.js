import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/logo.png';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className='head'>
                <header>
                    <nav className="navbar navbar-dark border-bottom border-dark" style={{backgroundColor:"#080820"}}>
                        <div>
                            <a href="/users" className="navbar-brand">
                                <img src={logo} />
                            </a>
                        </div>
                    </nav>
                    <nav className="navbar navbar-dark" style={{backgroundColor:"#080820"}}>
                        <div>
                            <p className='lk'>Laporan Keuangan</p> 
                        </div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
