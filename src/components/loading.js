import ReactDOM from 'react-dom';
import React, { Component, PureComponent } from "react";
import "./loading.css";

class Loading extends PureComponent {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
      var parent = ReactDOM.findDOMNode(this).parentNode;
      parent.style.position = "relative";
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
