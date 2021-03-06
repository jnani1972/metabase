import React, { Component, PropTypes } from "react";

import SpecificDatePicker from "./SpecificDatePicker.jsx";
import RelativeDatePicker from "./RelativeDatePicker.jsx";

import cx from "classnames";

export default class DatePicker extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            pane: this._detectPane(props)
        };
    }

    static propTypes = {
        filter: PropTypes.array.isRequired,
        onFilterChange: PropTypes.func.isRequired,
        onOperatorChange: PropTypes.func.isRequired,
        tableMetadata: PropTypes.object.isRequired
    };

    _detectPane(props) {
        if (props.filter[0] !== "TIME_INTERVAL" && typeof props.filter[2] === "string") {
            return "specific";
        } else {
            return "relative";
        }
    }

    selectPane(pane) {
        this.props.onFilterChange([null, this.props.filter[1]]);
        this.setState({ pane });
    }

    render() {
        // MongoDB does not currently support relative date filters
        if (this.props.tableMetadata.db.engine === "mongo") {
            return (
                <SpecificDatePicker
                    filter={this.props.filter}
                    onFilterChange={this.props.onFilterChange}
                    onOperatorChange={this.props.onOperatorChange}
                />
            );
        }

        return (
            <div>
                <div className="p1 border-bottom">
                    <button className={cx("Button Button--medium mr1", { "Button--purple": this.state.pane === "relative" })} onClick={this.selectPane.bind(this, "relative")}>Relative date</button>
                    <button className={cx("Button Button--medium", { "Button--purple": this.state.pane === "specific" })} onClick={this.selectPane.bind(this, "specific")}>Specific date</button>
                </div>
                { this.state.pane === "relative" ?
                    <RelativeDatePicker
                        filter={this.props.filter}
                        onFilterChange={this.props.onFilterChange}
                    />
                :
                    <SpecificDatePicker
                        filter={this.props.filter}
                        onFilterChange={this.props.onFilterChange}
                        onOperatorChange={this.props.onOperatorChange}
                    />
                }
            </div>
        )
    }
}
