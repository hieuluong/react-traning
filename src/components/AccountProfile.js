import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import Config from '../models/Config.js'
import Loading from './loading.js';
import dispatcher from "../models/dispatcher.js";

class AccountProfile extends Component {
   constructor(props) {
      super(props);
   }

   updateCustomer() {
      dispatcher.dispatch(true);
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

         <div className="tab-content">
            <div role="tabpanel" className="tab-pane fade in active" id="profile">
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >First name:</label>
                  <div className="col-sm-10">
                     <input type="text" className="form-control" placeholder="first name" />
                  </div>
               </div>
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >Last name:</label>
                  <div className="col-sm-10">
                     <input type="text" className="form-control" placeholder="last name" />
                  </div>
               </div>
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >Address:</label>
                  <div className="col-sm-10">
                     <input type="text" className="form-control" placeholder="address" />
                  </div>
               </div>
               <div className="form-group row">
                  <label className="col-sm-2 form-label" >Credit Card:</label>
                  <div className="col-sm-10">
                     <input type="text" className="form-control" placeholder="credit card" />
                  </div>
                  <button type="button" className="btn btn-success" onClick={this.updateCustomer.bind(this)}>Loading</button>
               </div>
               <div className="form-group row">
                  <div className="offset-sm-2 col-sm-10">
                     <button type="button" className="btn btn-success" onClick={this.updateCustomer.bind(this)}>Submit</button>
                  </div>
               </div>
            </div>
            <div role="tabpanel" className="tab-pane fade" id="order">bbb</div>
         </div>
      </div>);
   }
}

export default AccountProfile;