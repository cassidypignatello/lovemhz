import React, {Component} from 'react';
import './style/ControlPanel.css';
import Oscillator from "./Oscillator";
import LowpassFilter from "./LowpassFilter";
import HighpassFilter from "./HighpassFilter.jsx";
import ADSR from "./ADSR";

export default class ControlPanel extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div className="ControlPanel">
                <div className="osc1">
                    <Oscillator id="OSC-1"
                                onWaveformChanged={(waveform) => {this.props.onWaveformChanged1(waveform)}}
                                onMixChanged={(mix) => {this.props.onMixChanged1(mix)}}
                                onOctaveChanged={(octave) => {this.props.onOctaveChanged1(octave)}}
                    />
                </div>
                <div className="osc2">
                    <Oscillator id="OSC-2"
                                onWaveformChanged={(waveform) => {this.props.onWaveformChanged2(waveform)}}
                                onMixChanged={(mix) => {this.props.onMixChanged2(mix)}}
                                onOctaveChanged={(octave) => {this.props.onOctaveChanged2(octave)}}
                    />
                </div>
                <div className="lpf">
                    <LowpassFilter id="LPF"/>
                </div>
                <div className="hpf">
                    <HighpassFilter id="HPF"/>
                </div>
                <div className="adsr">
                    <ADSR id="ADSR"/>
                </div>
            </div>
        );
    }
}