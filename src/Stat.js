import React, { Component } from "react";
import Select from "react-select";
import "./Stats.css";

const containerStyle = {
  height: '10%',
  width: '100%',
  display: 'flex',
  'alignItems': 'center'
};

class Stat extends Component {
  constructor(props) {
    super(props);

    this.calculate = this.calculate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getNatureRatio = this.getNatureRatio.bind(this);
  }

  getNatureRatio() {
    if (this.props.id === 'atk'){
      if (['lonely', 'adamant', 'naughty', 'brave'].includes(this.props.nature)){
        return 1.1;
      } else if (['bold', 'modest', 'calm', 'timid'].includes(this.props.nature)){
        return 0.9;
      } else{
        return 1.0;
      }
    }
    else if (this.props.id === 'spa'){
      if (['modest', 'mild', 'rash', 'quiet'].includes(this.props.nature)){
        return 1.1;
      } else if (['adamant', 'impish', 'careful', 'jolly'].includes(this.props.nature)){
        return 0.9;
      } else{
        return 1.0;
      }
    }
    else if (this.props.id === 'def'){
      if (['bold', 'impish', 'lax', 'relaxed'].includes(this.props.nature)){
        return 1.1;
      } else if (['lonely', 'mild', 'gentle', 'hasty'].includes(this.props.nature)){
        return 0.9;
      } else{
        return 1.0;
      }
    }
    else if (this.props.id === 'spd'){
      if (['calm', 'gentle', 'careful', 'sassy'].includes(this.props.nature)){
        return 1.1;
      } else if (['naughty', 'lax', 'rash', 'naive'].includes(this.props.nature)){
        return 0.9;
      } else{
        return 1.0;
      }
    }
    else if (this.props.id === 'spe'){
      if (['timid', 'hasty', 'jolly', 'naive'].includes(this.props.nature)){
        return 1.1;
      } else if (['brave', 'relaxed', 'quiet', 'sassy'].includes(this.props.nature)){
        return 0.9;
      } else{
        return 1.0;
      }
    }
  }

  calculate() {
    if (this.props.id === "hp") {
      return Math.floor(
        ((2 * this.props.base + this.props.iv + this.props.ev / 4) *
          this.props.lvl) /
          100 +
          this.props.lvl +
          10
      );
    } else {
      return Math.floor(
        (((2 * this.props.base + this.props.iv + this.props.ev / 4) *
          this.props.lvl) /
          100 +
          5) *
          this.getNatureRatio()
      );
    }
  }

  onChange(id, value) {
    if (id === "iv") {
      this.props.update(this.props.id, value, this.props.ev);
    } else {
      this.props.update(this.props.id, this.props.iv, value);
    }
  }

  render() {
    let opt_iv = [];
    let opt_ev = [];
    for (var i = 0; i <= 31; i++) {
      opt_iv.push({
        value: i,
        label: String(i)
      });
    }
    for (
      i = 0;
      i <= 255 && i <= 510 - (this.props.evTotal - this.props.ev);
      i++
    ) {
      opt_ev.push({
        value: i,
        label: String(i)
      });
    }

    return (
      <div style={containerStyle}>
        <div className="stat">
          <p>
            {this.props.name}: {this.calculate()}
          </p>
        </div>
        <div className="iv">
          <Select
            defaultValue={opt_ev[this.props.iv]}
            options={opt_iv}
            onChange={e => this.onChange("iv", e.value)}
          />
        </div>
        <div className="ev">
          <Select
            defaultValue={opt_ev[this.props.ev]}
            options={opt_ev}
            onChange={e => this.onChange("ev", e.value)}
          />
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default Stat;
