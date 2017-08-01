import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './product.css';
import App from '../App.js'
import request from 'superagent';

class Product extends Component {
    constructor(props) {
        super(props);

        
    }

    onClick() {
        //call static method
        App.alert("Da mua 1 sp");
        // var a = ReactDOM.findDOMNode(this);
        // a.getElementsByClassName('selectdropdown')[0].remove();
        //this.state.text.splice(0, 1);
        //this.state.text1 = this.state.text;
        //this.setState(this.state.text);

        //Routing by coding
        this.props.history.push('/category');
    }

    render() {
        return (
            <div>
                <button onClick={() => this.onClick()}>Buy</button>
            </div>
        );
    }
}

export default Product;