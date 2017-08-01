import React, { Component } from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import './App.css';
import request from 'superagent';
import { HashRouter, Route, Link, BrowserRouter } from 'react-router-dom';
import Product from './product/product.js';
import Category from './category/category.js';
import Order from './order/order.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  static alert(message) {
    alert(message);
  }

  componentDidMount() {
    var self = this;

    //get data from api 
    request.get("http://localhost:8080/api/v1/categories").end(function (err, res) {
      if (err) {
        alert(err.message);
        var data = [
          { "categoryId": 1, "name": "ジャケット" },
          { "categoryId": 2, "name": "ドレスシャツ" },
          { "categoryId": 3, "name": "Tシャツ" },
          { "categoryId": 4, "name": "ポロシャツ" }
        ];
        self.setState({ data: data });
        self.setState({ items: self.state.data.map((item) => <Category data={item} key={item.categoryId}></Category>) });
      }
      else {
        const data = res.body.map(obj => obj);
        self.setState({ data: data });
        // Create components by array value
        self.setState({ items: self.state.data.map((item) => <Category data={item} key={item.categoryId}></Category>) });
      }
    });

    //get current Element of component
    var rootEle = ReactDOM.findDOMNode(this);
    var select = rootEle.querySelectorAll(".select");
    
    // create dynamic element and append
    let doc = new DOMParser().parseFromString('<div>Hieu</div>', 'text/html');
    let chkbox = new DOMParser().parseFromString('<div><input type="checkbox" name="vehicle" value="Bike"> I have a bike<br></div>', 'text/html').body.firstChild;
    select[0].nextElementSibling.appendChild(chkbox);
    rootEle.appendChild(doc.body.firstChild);
    
  }

  onclick() {
    this.state.data.shift();
    this.setState({ data: this.state.data });
  }

  //static method
  static changeState() {
    var self = this;
    
    alert('a');
  }


  render() {
    return (
      <div className="App">
        <h1>Simple SPA</h1>
        {/* bind data bind for in html */}
        <select className="select" style={{ float: 'left' }}>
          {this.state.data.map((item, index) => (
            <option className='indent' key={item.categoryId} value={item.categoryId}>{item.name}</option>
          ))}
        </select>
        <div></div>
        <ul style={{ float: 'left' }}>
          {this.state.items}
        </ul>
        <button onClick={() => this.onclick()}>Remove data</button>
        <Order></Order>
        <div className="content">
          {/*Link routing and inline style*/}
          <Link to='product' style={{paddingLeft: "5px"}} >Product</Link>
          <Link to='category' style={{paddingLeft: "5px"}}>Category</Link>
        </div>
      </div>
    );
  }
}

export default App;

