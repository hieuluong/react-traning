import React, { Component , PureComponent } from "react";
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Config from '../models/Config.js'
import AddToBasket from '../components/AddToBasket.js'
import request from 'superagent';

class Product extends Component {
    constructor(props) {
        super(props);
        this.products = [];
        this.productDetail = {};
        this.loading = false;

        this.state = {
            products: []
        };
    }

    componentDidMount() {
        var self = this;

        request.post(Config.product + "/search").send({ categories: [], name: "" }).end(function (err, res) {
            if (err) {
                alert(err.message);
            }
            else {
                var data = res.body;
                data.map((item, index) => {
                    item.imageUrl = self.getImageUrl(item);
                });

                self.setState({
                    products: res.body
                });
            }
        });
    }

    getImageUrl(product) {
        var size = product.defaultSize.name.toLowerCase();
        var style = "";
        if (product.defaultStyle.name.toLowerCase() == "tall") {
            style = "p";
        } else if (product.defaultStyle.name.toLowerCase() == "big") {
            style = "j";
        } else {
            style = "t";
        }

        var color = product.defaultColor.name.toLowerCase();
        return "/images/product/" + style + "_" + color + "-" + size + ".jpg"
    }

    render() {
        // const { params, title, layout } = this.props;
        return (
            <div ref="products">
                <div className="row">
                    {
                        this.state.products.map((item, index) => (
                            <div className="col-md-3" key={item.productId}>
                                <div className="card">
                                    <div className="card-header">
                                        <strong>{item.name}</strong>
                                        <span className="badge badge-pill badge-danger float-right price">￥ {item.price}</span>
                                    </div>
                                    <div className="card-block productImage">
                                         <Link to={"/product/" + item.productId}> 
                                        <img src={item.imageUrl} className="img-thumbnail" />
                                         </Link> 
                                    </div>
                                    <div className="card-footer text-right">
                                        <AddToBasket product={item}></AddToBasket>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    }
}

export default Product;