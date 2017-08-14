import React, { Component } from 'react';

class Notify extends Component {

    static success(message, timeout) {
        Notify.showMessage("success", message, timeout);
    }

    static info(message, timeout) {
        Notify.showMessage("info", message, timeout);
    }

    static warning(message, timeout) {
        Notify.showMessage("warning", message, timeout);
    }

    static danger(message, timeout) {
        Notify.showMessage("danger", message, timeout);
    }

    static showMessage(type, message, timeout) {
        var notifyEle = document.getElementsByClassName("notify").item(0),
            alertEle = notifyEle.getElementsByClassName("alert-" + type).item(0),
            messageNode;
        let messageEle = new DOMParser().parseFromString('<div class="notify-message">' + message + '</div>', 'text/html');
        messageNode = messageEle.body.firstChild;
        alertEle.appendChild(messageNode);
        alertEle.style.display = "block";
        if (timeout) {
            setTimeout(function () {
                alertEle.removeChild(messageNode);
                if (alertEle.getElementsByClassName("notify-message").length === 0) {
                    alertEle.style.display = "none";
                } else {
                    alertEle.style.display = "block";
                }
            }, timeout);
        }
    }

    render() {
        return (
            <div className="notify" >
                <div className="alert alert-success" role="alert" style={{ display: "none" }}></div >
                <div className="alert alert-info" role="alert" style={{ display: "none" }}></div>
                <div className="alert alert-warning" role="alert" style={{ display: "none" }}></div >
                <div className="alert alert-danger" role="alert" style={{ display: "none" }}></div >
            </div >
        );
    }
}

export default Notify;