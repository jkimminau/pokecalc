import React, { Component } from "react";
import Select from "react-select";
import "./Level.css";

const selectStyle = {
  // border: '1px solid red'
}

const natures = [
  'Hardy',
  'Lonely',
  'Adamant',
  'Naughty',
  'Brave',
  'Bold',
  'Docile',
  'Impish',
  'Lax',
  'Relaxed',
  'Modest',
  'Mild',
  'Bashful',
  'Rash',
  'Quiet',
  'Calm',
  'Gentle',
  'Careful',
  'Quirky',
  'Sassy',
  'Timid',
  'Hasty',
  'Jolly',
  'Naive',
  'Serious'
].map((n) => {
  return ({
    value: n,
    label: n
  })})

const options = [...Array(100).keys()].map((num) => {
  return({
    value: num + 1,
    label: String(num + 1)
  })});

class Level extends Component {
  render() {
    return (
      <div className='con'>
        <div className="label">
          <p>Level: </p>
        </div>
        <div className="level">
          <Select
            style={selectStyle}
            className="basic-single"
            classNamePrefix="select"
            defaultValue={options[this.props.lvl - 1]}
            name="color"
            options={options}
            onChange={this.props.updateLvl}
          />
        </div>
        <div className="label">
          <p>Nature: </p>
        </div>
        <div className="nature">
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={natures[2]}
            name="color"
            options={natures}
            onChange={this.props.updateNature}
          />
        </div>
      </div>
    );
  }
}

export default Level;
