import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js'
import request from 'superagent';

class Category extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };

    }

    componentDidMount() {
        var self = this;
        if (!self.props.data) {
            self.setState({ data: { "categoryId": 1, "name": "ジャケット" } });
        } else {
            self.setState({ data: self.props.data });
        }
    }

    render() {
        return (
            <li key={this.state.data.categoryId}>{this.state.data.name}</li>
        );
    }
}

export default Category;