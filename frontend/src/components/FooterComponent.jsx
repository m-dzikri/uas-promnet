import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-4">
                                {new Date().getFullYear()} @ By Muhamad Dzikri
                            </div>
                            <div className="col-sm-7">
                                <div className="text-sm-right d-none d-sm-block">
                                    Pemrograman Internet
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>    
            </div>
            
        )
    }
}

export default FooterComponent
