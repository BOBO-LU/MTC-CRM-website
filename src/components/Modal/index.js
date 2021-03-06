import React from "react";
// import "./modal.css";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
    onClose = (e) => {
        this.props.onClose && this.props.onClose(e);
    };
    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div class="modal" id="modal">
                <h2>新增課程</h2>
                <div class="content">{this.props.children}</div>

                <div class="actions">
                    <button
                        class="toggle-button"
                        // style={{ textAlign: "right" }}
                        onClick={this.onClose}
                    >
                        submit
                    </button>
                </div>
            </div>
        );
    }
}
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
};
