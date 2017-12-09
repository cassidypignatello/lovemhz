import React, { Component } from 'react';
import $ from 'jquery';
import 'jquery-knob';

export default class LowpassFilter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id : props.id,
        }
    }

    componentDidMount() {
        $(`#freq-lpf-${this.state.id}`).knob();
        $(`#peak-lpf-${this.state.id}`).knob();
    }

    render() {
        return (
            <div className="columns">
                <span className="has-text-black">{this.state.id}</span>
                <div className="field column">
                    <label className="label">Freq</label>
                    <div className="control">
                        <input type="text" value="0" id={`freq-lpf-${this.state.id}`} className="knob" data-width="30"
                               data-height="30" data-displayInput="false" data-angleOffset="180"/>
                    </div>
                </div>
                <div className="field column">
                    <label className="label">Peak</label>
                    <div className="control">
                        <input type="text" value="0" id={`peak-lpf-${this.state.id}`} className="knob" data-width="30"
                               data-height="30" data-displayInput="false" data-angleOffset="180"/>
                    </div>
                </div>
            </div>
        );
    }
}