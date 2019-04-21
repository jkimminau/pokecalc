import React, { Component } from "react";
import Select from "react-select";
import "./Pokemon.css";

const pokemon = require("pokemon");

const headerStyle = {
  width: '100%',
  height: '40%'
}

const displayStyle = {
  width: '100%',
  height: '45%',
  float: 'left',
}

const spriteStyle = {
  width: '36%',
  height: '100%',
  float: 'left',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const subheaderStyle = {
  'marginLeft': '2.5%',
  width: '60%',
  height: '100%',
  float: 'left'
}

const nameStyle = {
  height: '50%',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

const pokeselectStyle = {
  width: '100%',
  height: '35%',
  marginTop: '3%'
}

const levelStyle = {
  marginTop: '2%',
  height: '50%',
  display: 'flex',
  alignItems: 'center'
}

 const levelSelectStyle = {
   width: '70%',
   marginLeft: '8%'
 }

const natureStyle = {
  marginTop: '2%',
  height: '50%',
  display: 'flex',
  alignItems: 'center'
}

const natureSelectStyle = {
  width: '70%',
  marginLeft: '5%'
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

const list = pokemon.all().map(name => {return { value: name, label: name }});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.textChange = this.textChange.bind(this);
    this.changePkmn = this.changePkmn.bind(this);
  }

  textChange(e) {
    this.setState({ search: e.target.value });
  }

  changePkmn(e) {
    this.props.setPokemon(e.value);
  }

  imgClick(e){
    console.log('clicked')
  }

  render() {
    if (this.props.url !== null) {
      return (
        <div style={headerStyle}>
            <div style={displayStyle}>
              <div style={spriteStyle}>
                <img
                  src={this.props.url}
                  alt="sprite"
                  onClick={this.props.toggleShiny}
                />
              </div>
              <div style={subheaderStyle}>
                <div style={nameStyle}>
                  <h3>{this.props.name}</h3>
                </div>
                <div style={pokeselectStyle}>
                  <Select
                    defaultValue={{value: this.props.name, label: this.props.name}}
                    options={list}
                    onChange={this.changePkmn}
                  />
                </div>
              </div>
              <div className='clearfix'/>
              <div style={levelStyle}>
                <p style={{float: 'left', marginLeft: '5%'}}>Level: </p>
                <div style={levelSelectStyle}>
                  <Select
                    defaultValue={options[this.props.lvl - 1]}
                    options={options}
                    onChange={this.props.updateLvl}
                  />
                </div>
              </div>
              <div style={natureStyle}>
                <p style={{float: 'left', marginLeft: '5%'}}>Nature: </p>
                <div style={natureSelectStyle}>
                  <Select
                    defaultValue={natures[2]}
                    options={natures}
                    onChange={this.props.updateNature}
                  />
                </div> 
              </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Header;