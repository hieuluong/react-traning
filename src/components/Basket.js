import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Config from '../models/Config.js'
import Notify from './Notify.js'
import Payment from './Payment.js'

class Basket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                basketItems: [],
            },
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
                    self.setState({ data: data });
                }
            }
        });

    }

    calculateTotal(basket) {
        var self = this,
            totalPrice = 0,
            totalQuantity = 0;
        basket.basketItems.forEach(function (item) {
            totalPrice += (item.quantity * item.price);
            totalQuantity += item.quantity;
        });
        self.setState({ total: totalPrice });
        document.getElementsByClassName("number-basket").item(0).innerHTML = totalQuantity;
    }

    prepareParam(id, amplitude) {
        var self = this;

        var item = self.state.data.basketItems.find(i => i.basketItemId === id);
        item.quantity = amplitude;

        return item;
    }

    quatityChange(e, type) {
        e.preventDefault();

        var self = this,
            target = e.target,
            row = target.closest("tr"),
            id = !row.getAttribute("data-key") ? 0 : parseInt(row.getAttribute("data-key"), 10),
            quantityEle = row.getElementsByClassName("quantity").item(0),
            currentQuantity = !quantityEle.innerHTML ? 0 : parseInt(quantityEle.innerHTML, 10),
            amplitude = type === "minus" ? -1 : 1;

        if (type === "minus" && currentQuantity <= 1) {
            Notify.danger("Can not set quantity less than 1!", 2000);
            return;
        }

        var item = self.prepareParam(id, amplitude);

        request.post(Config.basket).send(item).end(function (err, res) {
            if (err) {
                Notify.danger(err.message, 2000);
            }
            else {
                Notify.success("Update quantity successfully!", 2000);
                const data = res.body;
                self.calculateTotal(data);
                self.setState({ data: data });
            }
        });
    }

    order() {
        var self = this,
            param = {},
            componentEle = ReactDOM.findDOMNode(this);

        param.creditCardId = componentEle.getElementsByClassName("cardNo").item(0).value;
        param.paymenttype = componentEle.getElementsByClassName("paymenttype").item(0).selectedOptions[0].value;

        request.post(Config.order).send(param).end(function (err, res) {
            if (err) {
                Notify.danger(err.message, 2000);
            }
            else {
                document.getElementsByClassName("number-basket").item(0).innerHTML = "0";
                self.props.history.push('/order/' + res.body.orderId)
            }
        });
    }

    remove(e) {
        e.preventDefault();

        var self = this,
            target = e.target,
            row = target.closest("tr"),
            id = !row.getAttribute("data-key") ? 0 : parseInt(row.getAttribute("data-key"), 10);

        request.del(Config.basketitem + "/" + id).end(function (err, res) {
            if (err) {
                alert(err.message);
            }
            else {
                var item = self.state.data.basketItems.find(i => i.basketItemId === id);
                var index = self.state.data.basketItems.indexOf(item);
                self.state.data.basketItems.splice(index, 1);
                self.setState({ data: self.state.data });
                self.calculateTotal(self.state.data);
            }
        });
    }


    render() {
        return (
            <div className="container">
                <div className="col-md-12">
                    <div className="card card-accent-primary baskets">
                        <div className="card-header">
                            <strong>Basket Detail</strong>
                        </div>
                        <div className="card-block">
                            <table className="table table-info table-bordered table-striped table-hover">
                                <thead className="table-success">
                                    <tr>
                                        <th>#No</th>
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Style</th>
                                        <th>Quantity</th>
                                        <th>SubPrice</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data.basketItems.map((item, index) => (
                                            <tr key={item.basketItemId} data-key={item.basketItemId}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.product.name}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>{item.style}</td>
                                                <td>
                                                    <span className="float-right">￥ {item.price | 0}</span>
                                                </td>
                                                <td className="text-center">
                                                    <a className="fa fa-plus fa-lg float-left" onClick={(e) => this.quatityChange(e, "plus")} href="#"></a>
                                                    <span className="quantity">{item.quantity | 0}</span>
                                                    <a className="fa fa-minus fa-lg float-right" onClick={(e) => this.quatityChange(e, "minus")} href="#"></a>
                                                </td>
                                                <td>
                                                    <span className="float-right">{item.quantity * item.price | 0}</span>
                                                </td>
                                                <td>
                                                    <a href="#" className="fa fa-remove fa-lg" onClick={(e) => this.remove(e)} ></a>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                                <tfoot className="table-success">
                                    <tr>
                                        <th>Total</th>
                                        <th colSpan="7">
                                            <span className="float-right">{this.state.total}</span>
                                        </th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div >
                    </div >
                </div >
                <div className="col-md-6">
                    <div className="card card-accent-primary">
                        <div className="card-header">
                            <strong>Payment</strong>
                        </div>
                        <div className="card-block">
                            <Payment></Payment>
                            <button type="button" className="btn btn-danger float-right order" onClick={() => this.order()}>ORDER</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default Basket;