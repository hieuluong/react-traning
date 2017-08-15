import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Config from '../models/Config.js'
import AddToBasket from './AddToBasket'

class ProductDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         ProductDetail: {}
         , imgUrl: "#"
      };
      var self = this;
      var id = self.props.match.params.id;
      if (id === null || isNaN(id)) return alert("Invalid parameters");

      request.get(Config.product + "/" + id).send().end(function (err, res) {
         if (err) return alert(err.message);
         var data = res.body;
         if (data === null) return alert("Product not found !");
         self.state.ProductDetail = data;
         self.getImageUrl();
      });
   }

   getImageUrl() {
      var self = this;
      var product = this.state.ProductDetail;
      var color = product.defaultColor.name.toLowerCase();
      var size = product.defaultSize.name.toLowerCase();
      var style = product.defaultStyle.name.toLowerCase();
      switch (style) {
         case "tall":
            style = "p";
            break;
         case "big":
            style = "j";
            break;
         default:
            style = "t";
            break;
      }
      var imgUrl = "/images/product/" + style + "_" + color + "-" + size + ".jpg";
      self.setState({
         imgUrl: imgUrl
      });
   }

   changeColor(e) {
      var self = this;
      var index = parseInt(e.target.value);
      var item = self.state.ProductDetail.productColors[index];
      self.state.ProductDetail.defaultColor = item;
      self.getImageUrl();
   }

   changeSize(e) {
      var self = this;
      var index = parseInt(e.target.value);
      var item = self.state.ProductDetail.productSizes[index];
      self.state.ProductDetail.defaultSize = item;
      self.getImageUrl();
   }

   changeStyle(e) {
      var self = this;
      var index = parseInt(e.target.value);
      var item = self.state.ProductDetail.productStyles[index];
      self.state.ProductDetail.defaultStyle = item;
      self.getImageUrl();
   }

   render() {
      var styles = {
         name: {
            fontSize: "17px"
         }
         , price: {
            fontSize: "17px"
            , color: "red"
         }
         , title: {
            fontWeight: "bold"
         }
      };
      var p = this.state.ProductDetail;
      var imgUrl = this.state.imgUrl;
      var pColors = p.productColors || [];
      var pSizes = p.productSizes || [];
      var pStyles = p.productStyles || [];

      return (<div className="container">
         <div className="col-md-12">
            <div className="card card-accent-primary">
               <div className="card-header">
                  <strong>Product Detail</strong>
               </div>
               <div className="card-block">
                  <div className="row product__detail">
                     <div className="col-md-3">
                        <img src={imgUrl} className="rounded float-left img-thumbnail" alt={p.name} />
                     </div>
                     <div className="col-md-9">
                        <div className="card card-outline-success">
                           <div className="card-header bg-success">
                              <strong style={styles.name}>{p.name}</strong>
                           </div>
                           <div className="card-block">
                              <div className="row">
                                 <div className="col-md-6 border-right">
                                    <div className="row">
                                       <div className="col-md-3" style={styles.title}>Colors:</div>
                                       <div className="col-md-9 input">
                                          <select className="dropdown-color form-control" onChange={this.changeColor.bind(this)}>
                                             {
                                                pColors.map((c, index) => (
                                                   <option key={index} value={index}>{c.name}</option>
                                                ))}
                                             }
                                          </select>
                                       </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-md-3" style={styles.title}>Styles:</div>
                                       <div className="col-md-9 input">
                                          <select className="dropdown-style form-control" onChange={this.changeStyle.bind(this)}>
                                             {
                                                pStyles.map((c, index) => (
                                                   <option key={index} value={index}>{c.name}</option>
                                                ))}
                                             }
                                          </select>
                                       </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-md-3" style={styles.title}>Sizes:</div>
                                       <div className="col-md-9 input">
                                          <select className="dropdown-size form-control" onChange={this.changeSize.bind(this)}>
                                             {
                                                pSizes.map((c, index) => (
                                                   <option key={index} value={index}>{c.name}</option>
                                                ))}
                                             }
                                          </select>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="col-md-6">
                                    <div className="row">
                                       <div className="col-md-3" style={styles.title}>Price</div>
                                       <div className="col-md-3" style={Object.assign({}, styles.title, styles.price)}><span>￥</span>{p.price}</div>
                                       <div className="col-md-6">
                                          <AddToBasket product={p}></AddToBasket>
                                       </div>
                                    </div>
                                    <div className="row">
                                       <div className="col-md-12 desc">
                                          {p.description}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>);
   }
}

export default ProductDetail;