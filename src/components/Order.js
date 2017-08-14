import React, { Component } from 'react';
import request from 'superagent';
import Config from '../models/Config.js'
import Notify from './Notify.js'
import Payment from './Payment.js'

class Order extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                orderItems: [],
            },
            total: 0
        };
    }

    componentDidMount() {
        var self = this,
            param = {};
        param.orderId = self.props.match.params.id;
        //get data from api 
        request.post(Config.order + "/search").send(param).end(function (err, res) {
            if (err) {
                alert(err.message);
            }
            else {
                const data = res.body;
                if (data.length > 0) {
                    self.setState({ data: data[0] });
                }
            }
        });

    }

    render() {
        return (
            <div className="container">
                <div className="col-md-6">
                    <div className="card card-accent-primary">
                        <div className="card-header">
                            <strong className="name">Order information</strong>
                        </div>
                        <div className="card-block">
                            <div className="row form-group">
                                <div className="col-md-4 title"><i className="fa fa-user fa-lg"></i> Your ID</div>
                                <div className="col-md-8">
                                    <span className="col-md-6 title text-right float-left">{this.state.data.customerId}</span>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-4 title"><i className="fa fa-credit-card fa-lg"></i> Your credit card</div>
                                <div className="col-md-8">
                                    <span className="col-md-6 title text-right float-left">{this.state.data.creditCardId}</span>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-4 title"><i className="fa fa-send-o fa-lg"></i> Ship status</div>
                                <div className="col-md-8">
                                    <span className="badge badge-pill badge-success col-md-6">{this.state.data.shipped ? "shipped" : "apply"}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.data.orderItems.map((item, index) => (
                                            <tr key={item.orderItemId} data-key={item.orderItemId}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.color}</td>
                                                <td>{item.size}</td>
                                                <td>{item.style}</td>
                                                <td>
                                                    <span className="float-right">￥ {item.price | 0}</span>
                                                </td>
                                                <td className="text-center">
                                                    <span className="quantity">{item.quantity | 0}</span>
                                                </td>
                                                <td>
                                                    <span className="float-right">{item.quantity * item.price | 0}</span>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                                <tfoot className="table-success">
                                    <tr>
                                        <th>Total</th>
                                        <th colSpan="7">
                                            <span className="float-right">{this.state.data.total}</span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div >
                    </div >
                </div >
            </div >
        );
    }
}

export default Order;