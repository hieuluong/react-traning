import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Config from '../models/Config.js'
import Notify from './Notify.js'
import Payment from './Payment.js'

class AddToBasket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            product: {},
            productColor: {},
            productSize: {},
            productStyle: {},
        };
    }

    add() {
        var self = this,
            param = self.prepareParameter();

        request.post(Config.basket).send(param).end(function (err, res) {
            if (err) {
                alert(err.message);
            }
            else {
                var numberBasketele = document.getElementsByClassName("number-basket").item(0),
                    currentNumberBasket = numberBasketele.innerHTML == "" ? 0 : parseInt(numberBasketele.innerHTML);
                document.getElementsByClassName("number-basket").item(0).innerHTML = (currentNumberBasket + 1).toString();
                Notify.success('Added Item to Basket!', 2000);
            }
        });
    }

    prepareParameter() {
        var self = this,
            item = {};

        item.productId = self.props.product.productId;
        item.quantity = 1;
        item.price = self.props.product.price;
        item.color = self.props.productColor ? self.props.productColor.name : self.props.product.defaultColor.name;
        item.size = self.props.productSize ? self.props.productSize.name : self.props.product.defaultSize.name;
        item.style = self.props.productStyle ? self.props.productStyle.name : self.props.product.defaultStyle.name;

        return item;
    }


    render() {
        return (
            <button type="button" class="btn btn-primary" onClick={() => this.add()}>
                ADD TO BASKET
            </button>
        );
    }
}

export default AddToBasket;