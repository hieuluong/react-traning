import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Product from './components/Product.js';
import ProductDetail from './components/ProductDetail.js';
import Basket from './components/Basket.js';
import Order from './components/Order.js'
import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom';
import Notify from './components/Notify.js'

// class Root extends Component {
//     constructor(props) {
//         super(props);
//     }

//     onlick() {
//         this.props.history.push('/basket');
//     }

//     render() {
//         return (
//             <div></div>
//         );
//     }
// }

// export default Root;



const Root = () => (
  <div>
    <Header />
    <Main />
  </div>
)

const Header = () => (
  <header className="mdc-toolbar__row">
    <section className="mdc-toolbar__section mdc-toolbar__section--align-start">
      <a id="clover-nav-icon" className="material-icons" href="#"
        aria-label="Click to show the navigation menu"
        aria-controls="nav-menu">menu</a>
      <h1 id="clover-logo" className="mdc-toolbar__title"><span>Archway Sample Shop</span></h1>
    </section>
    <section className="mdc-toolbar__section mdc-toolbar__section--align-end" role="toolbar">
      <Link to='/'>Home</Link>
      <Link to="/basket"><i className="fa fa-shopping-basket" aria-hidden="true"></i></Link><span className="badge badge-pill badge-danger number-basket">5</span>
    </section>
  </header>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Product} />
      <Route path='/product/:id' component={ProductDetail} />
      <Route path="/basket" component={Basket} />
      <Route path="/order/:id" component={Order} />
    </Switch>
  </main>
)

ReactDOM.render(
  <BrowserRouter>
    <Root />
  </BrowserRouter>
  , document.getElementById('root'));
registerServiceWorker();
