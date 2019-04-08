import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Routes from './routes';


export default class App extends Component {
  state = { username: null };

  componentDidMount() {
    // fetch('/api/username')
    //   .then(res => res.json())
    //   .then(user => this.setState({ username: user.username }));
  }

  render() {
    return (
      <div>
        {/* {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>} */}
        {/* <img src={ReactImage} alt="react" /> */}
        
        <Router>
          {/* NavBar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link to="/" className="nav-brand"><img src={ReactImage} alt="react" style= { { width : "65px" } } /></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                  <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* routes item */}
          <Routes  />
        
        </Router>
      </div>
    );
  }
}
