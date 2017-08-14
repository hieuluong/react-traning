import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import AddToBasket from './components/AddToBasket.js';

class App extends Component {
  render() {
    var data = {
      "productId": 1,
      "name": "ブルゾン",
      "description": "ジャケットといえば定番のブルゾンです。",
      "price": 15000,
      "category": {
        "categoryId": 1,
        "name": null
      },
      "defaultColor": {
        "productColorId": 1,
        "name": "Green"
      },
      "defaultSize": {
        "productSizeId": 4,
        "name": "M",
        "sortIndex": 1
      },
      "defaultStyle": {
        "productStyleId": 1,
        "name": "Regular",
        "sortIndex": 0
      },
      "productColors": [
        {
          "productColorId": 1,
          "name": "Green"
        },
        {
          "productColorId": 2,
          "name": "Blue"
        }
      ],
      "productSizes": [
        {
          "productSizeId": 4,
          "name": "M",
          "sortIndex": 1
        },
        {
          "productSizeId": 5,
          "name": "S",
          "sortIndex": 0
        }
      ],
      "productStyles": [
        {
          "productStyleId": 1,
          "name": "Regular",
          "sortIndex": 0
        }
      ]
    }
    return (
      <div className="App">
        <AddToBasket product={data}></AddToBasket>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
