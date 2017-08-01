import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Product from './product/product.js';
import { HashRouter, Route, Link, BrowserRouter } from 'react-router-dom';
import Category from './category/category.js';

export class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home...</h1>
      </div>
    )
  }
}

export class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About...</h1>
      </div>
    )
  }
}

export class Contact extends React.Component {
  render() {
    return (
      <div>
        <h1>Contact...</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <BrowserRouter>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/product" component={Product} />
        <Route path="/category" component={Category} />
      </div>
  </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
