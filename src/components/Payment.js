import React, { Component } from 'react';
import request from 'superagent';
import Config from '../models/Config.js'
import Notify from './Notify.js'

class Basket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        var self = this;

        request.get(Config.payment).end(function (err, res) {
            if (err) {
                alert(err.message);
            }
            else {
                const data = res.body;
                self.setState({ data: data });
            }
        });

    }

    changeType(e) {
        var self = this,
            ele = e.target,
            row = ele.closest(".payment"),
            value = ele.selectedOptions.item(0).value,
            cardNoEle = row.getElementsByClassName("cardNo").item(0);
        if (value == '1') {
            cardNoEle.style.display = "block";
        } else {
            cardNoEle.style.display = "none";
        }
        return true;
    }

    changeCardNo(e) {
        var input, result;
        if (e.metaKey || e.ctrlKey) {
            result = true;
        }
        else if (e.which === 32) {
            result = false;
        }
        else if (e.which === 0) {
            result = true;
        }
        else if (e.which < 33) {
            result = true;
        }
        
        if (result === false){
            return e.preventDefault();
        }

        input = String.fromCharCode(e.which);
        result = !!/[\d\s]/.test(input);
        if (result === false){
            e.preventDefault();
        }
    }


    render() {
        return (
            <div className="payment">
                <div className="row">
                    <div className="col-md-3">
                        <span className="label">Address</span>
                    </div>
                    <div className="control col-md-9">
                        <input type="text" className="form-control" placeholder="Address" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <span className="label">Pay Type</span>
                    </div>
                    <div className="control col-md-9">
                        <select type="text" className="form-control paymenttype" placeholder="Payment Method" onChange={(e) => this.changeType(e)}>
                            {
                                this.state.data.map((item, index) => (
                                    <option value={item.type} key={item.type}>{item.name}</option>
                                ))}
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3">
                        <span className="label">Card No</span>
                    </div>
                    <div className="control col-md-9">
                        <input type="text" className="form-control cardNo" placeholder="Credit Card Number" onKeyPressCapture={(e) => this.changeCardNo(e)} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Basket;