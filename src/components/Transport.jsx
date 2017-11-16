import React, { Component } from 'react';
import $ from 'jquery';
import 'font-awesome/css/font-awesome.min.css'
import 'bulma/css/bulma.css';
import 'jquery-knob';
import TransportButton from "./TransportButton.jsx";
import Timer from '../utility/Timer';

export default class Transport extends Component {

    constructor(props) {
        super(props);

        this.state = {
            timer: null,
            step: 0,
            bpm: 120,
            steps: this.props.steps ? this.props.steps : 16,
        };

        this.handleTick = this.handleTick.bind(this);
        this.incrementStep = this.incrementStep.bind(this);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="">
                <div className="field is-grouped">
                    <label className="label">Tempo&nbsp;</label>
                    <div className="control">
                        <input id="bpmInput" className="input" type="number" value={this.state.bpm} onChange={(e) => {this.handleTempoChange(e)}}/>
                    </div>
                    <TransportButton onTransportToggle={this.handleTransportToggle}/>
                </div>
            </div>
        );
    }

    handleTempoChange(e) {
        let bpm = $('#bpmInput').val();

        let newState = {
            timer: this.state.timer,
            step: this.state.step,
            bpm: bpm,
            steps: this.state.steps
        };
        this.setState(newState);

        let timer = this.state.timer;
        let sequenceTime = Transport.bpmToMs(this.state.bpm);

        if(timer) {
            timer.interval = sequenceTime;

            let newState = {
                step: this.state.step,
                steps: this.state.steps,
                bpm: this.state.bpm,
                timer : timer,
            };
            this.setState(newState);
        }
    }

    handleTransportToggle = (isStarted) => {
        let timer = this.state.timer;
        let sequenceTime = Transport.bpmToMs(this.state.bpm);

        if(isStarted) {
            timer = new Timer(() => {
                this.handleTick();
            }, sequenceTime);
            timer.start();
        } else {
            if(timer) {
                timer.stop();
                timer = null;
            }
            if(this.props.onPaused) {
                this.props.onPaused();
            }
        }

        let newState = {
            step: this.state.step,
            steps: this.state.steps,
            bpm: this.state.bpm,
            timer : timer,
        };
        this.setState(newState);
    };

    static bpmToMs(bpm) {
        return 60000 / bpm / 2;
    }

    static msToBpm(ms) {
        return 60000 / ms;
    }


    handleTick() {
        if(this.props.onTick) {
            this.props.onTick(this.state.step)
        }
        this.incrementStep();
    }

    incrementStep() {
        let step = (this.state.step + 1) % this.state.steps;

        let newState = {
            step: step,
            bpm: this.state.bpm,
            steps: this.state.steps,
            timer : this.state.timer,
        };
        this.setState(newState);
    }
}