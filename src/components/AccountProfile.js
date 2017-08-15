import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Config from '../models/Config.js'
import Loading from './loading.js';
import LoadingModel from '../models/loading.js';

class AccountProfile extends Component {
   constructor(props) {
      super(props);
      var self = this;
      self.state = {
         isLoadingChild: false
         , customer: {}
         , orders: []
      };
      self.loadCustomer();
      self.loadOrder();
   }

   loadCustomer() {
      var self = this;
      var param = { customerId: 1, firstName: "", lastName: "", userId: "user01@archwaydevelop.onmicrosoft.com" };
      request.post(Config.customer + "/search").send(param).end(function (err, res) {
         if (err) return alert(err.message);
         const data = res.body;
         if (data === null) return alert("Can not find customer !");
         console.log("Customer");
         console.log(data);
         if (data.length <= 0) return alert("Customer not found !");
         self.setState({ customer: data[0] });
      });
   }

   loadOrder() {
      var self = this;
      var param = { orderId: null, customerId: 1 };
      request.post(Config.order + "/search").send(param).end(function (err, res) {
         if (err) return alert(err.message);
         const data = res.body;
         if (data === null) return alert("Can not find order !");
         console.log("Order");
         console.log(data);
         self.setState({ orders: data });
      });
   }

   updateCustomer() {
      var self = this;
      var cus = self.state.customer;
      console.log(cus);
      request.post(Config.customer + "/add").send(cus).end(function (err, res) {
         if (err) return alert(err.message);
         const data = res.body;
      });
   }

   formatDateTime(myDate) {
      if (myDate == null) return null;
      var newDate = new Date(myDate.year, myDate.monthValue, myDate.dayOfMonth, myDate.hour, myDate.minute);

      return newDate.toLocaleString();
   }

   renderObj(params) {
      var self = this;
      var cus = self.state.customer;
      var obj = {
         name: params.name
         , value: cus[params.name] || ""
         , onChange: self.handleInputChange.bind(params.self)
      }

      return obj;
   }

   handleInputChange(event) {
      var self = this;
      var cus = self.state.customer;
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      cus[name] = value;
      self.setState({
         customer: cus
      });
   }

   render() {
      var styles = {

      };

      return (<div className="container">
         <ul className="nav nav-pills flex-column flex-sm-row" role="tablist">
            <li className="nav-item">
               <a className="nav-link active" href="#profile" role="tab" data-toggle="tab">Profile</a>
            </li>
            <li className="nav-item">
               <a className="nav-link" href="#order" role="tab" data-toggle="tab">Order</a>
            </li>
         </ul>

         <div className="tab-content" ref="content">
            <div role="tabpanel" className="tab-pane fade in active" id="profile">
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >First name:</label>
                  <div className="col-sm-10">
                     <input type="text" {...this.renderObj({ name: "firstName", self: this }) } className="form-control" placeholder="first name" />
                  </div>
               </div>
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >Last name:</label>
                  <div className="col-sm-10">
                     <input type="text" {...this.renderObj({ name: "lastName", self: this }) } className="form-control" placeholder="last name" />
                  </div>
               </div>
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >Address:</label>
                  <div className="col-sm-10">
                     <input type="text" {...this.renderObj({ name: "address", self: this }) } className="form-control" placeholder="address" />
                  </div>
                  {this.state.isLoadingChild && <Loading />}
               </div>
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >Credit Card:</label>
                  <div className="col-sm-10">
                     <input type="text" value="" className="form-control" placeholder="credit card" />
                  </div>
               </div>
               <div className="form-group row">
                  <div className="offset-sm-2 col-sm-10">
                     <button type="button" className="btn btn-success" onClick={this.updateCustomer.bind(this)}>Submit</button>
                  </div>
               </div>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="order">
               <table className="table table-info table-bordered table-striped table-hover">
                  <thead className="table-success">
                     <tr>
                        <th>#No</th>
                        <th>OrderID</th>
                        <th>Shipped</th>
                        <th>Order Date</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        this.state.orders.map((o, i) => (
                           <tr key={i}>
                              <th scope="row">{i + 1}</th>
                              <td>
                                 <span className="float-right">{o.orderId}</span>
                              </td>
                              <td>
                                 <span className="float-right badge badge-pill badge-danger title">{o.shipped + ""}</span>
                                 <span className="float-right badge badge-pill badge-success title">{o.shipped + ""}</span>
                              </td>
                              <td>
                                 <span className="float-right">{this.formatDateTime(o.orderDate)}</span>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </div>);
   }
}

export default AccountProfile;