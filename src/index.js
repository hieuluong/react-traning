import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom';
import './index.css';

import request from 'superagent';

import App from './App';
import Product from './components/Product.js';
import ProductDetail from './components/ProductDetail.js';
import Basket from './components/Basket.js';
import Order from './components/Order.js'

import Notify from './components/Notify.js'
import Config from './models/Config.js'

import registerServiceWorker from './registerServiceWorker';

const Root = () => (
  <div>
    <Header />
    <Main />
  </div>
)

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0
    };
  }

  componentDidMount() {
    var self = this;

    request.get(Config.basket).end(function (err, res) {
      if (err) {
        alert(err.message);
      }
      else {
        const data = res.body;
        if (data) {
          self.calculateTotal(data);
        }
      }
    });
  }

  calculateTotal(basket) {
    var self = this,
      totalQuantity = 0;
    basket.basketItems.forEach(function (item) {
      totalQuantity += item.quantity;
    });
    self.setState({ total: totalQuantity });
  }

  render() {
    return (
      <header className="mdc-toolbar mdc-toolbar--fixed mdc-theme--text-primary-on-background" id="clover-header">
        <div className="mdc-toolbar__row">
          <section className="mdc-toolbar__section--align-start mdc-toolbar__section ">
            <Link to="/"><i className="fa fa-home fa-2x" aria-hidden="true"></i></Link>
            <h1 id="clover-logo" className="mdc-toolbar__title"><span>Archway Sample Shop</span></h1>
          </section>
          <section className="mdc-toolbar__section--align-end mdc-toolbar__section" role="toolbar">
            <Link to="/basket"><i className="fa fa-shopping-basket" aria-hidden="true"></i></Link><span className="badge badge-pill badge-danger number-basket">{this.state.total}</span>
          </section>
        </div>
      </header>
    );
  }

}


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Product} />
      <Route path='/product/:id' component={ProductDetail} />
      <Route path="/basket" component={Basket} />
      <Route path="/order/:id" component={Order} />
    </Switch>
    <Notify />
  </main>
)

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
