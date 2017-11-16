import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import { findDOMNode}  from 'react-dom';
//import $ from 'jquery';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './home';
import Submit from './submit';
import Recipe from './recipe';

ReactDOM.render((
  <Router>
    <div id=" nav" className=' container'>
      <div className="text-align-center">
      <nav className=" navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
              <a className="navbar-brand">Love to eat</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/submit">submit a recipe</Link></li>
              </ul>
            </div>
          </div>
        </nav>
  </div>
      <Route exact path="/" component={Home}/>
      <Route path="/submit" component={Submit}/>
      <Route path="/recipe/:recipeId" component={Recipe}/>
    </div>
  </Router>
), document.getElementById('root'));
