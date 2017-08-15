import React, { Component, PureComponent } from "react";
import "./loading.css";

class Loading extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
      var parent = this._reactInternalInstance._currentElement._owner._instance;
      console.log(parent);
   }

   render() {
      var styles = {

      };

      return (<div className="parentLoader">
         <div className="loader"></div>
         <div className="loading"></div>
      </div>);
   }
}
export default Loading;
