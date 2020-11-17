
import React, { Component } from "react";
import { Link } from "react-router-dom";


class Navbar extends Component {
  
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-info mb-4">
          <div className="container">
            <Link className="navbar-brand pr-3" to="/">
              Matches Task
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-nav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/add-match">
                    Add new Match
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}



export default Navbar;

