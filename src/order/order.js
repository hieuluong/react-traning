import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js'
import request from 'superagent';

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };

    }

    onClick(messsage) {
        App.alert(messsage);
    }

    render() {
        return (
            <button onClick={() => this.onClick('Da Order')}>Order</button>
        );
    }
}

export default Order;