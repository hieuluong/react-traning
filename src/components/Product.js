import React from "react";
import ReactDOM from 'react-dom';
import Config from '../models/Config.js'
import request from 'superagent';

class Product extends React.Component {
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

        request.post(Config.product).send({ categories: [], name: "" }).end(function (err, res) {
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
                            <div className="col-md-4" key={item.productId}>
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <strong>{item.name}</strong>
                                        <span className="badge danger float-right">￥ {item.price}</span>
                                    </div>
                                    <div className="panel-body text-center">
                                        {/* <Link to={"product/" + p.productId}> */}
                                        <img src={item.imageUrl} className="img-thumbnail" />
                                        {/* </Link> */}
                                    </div>
                                    <div className="panel-footer text-right">
                                        {/* <Link to={"product/" + item.productId} className="btn btn-primary">Add to basket</Link> */}
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