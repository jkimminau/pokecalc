import React, { Component } from "react";
import Select from "react-select";
import "./Pokemon.css";

const pokemon = require("pokemon");

const selectStyle = {
  width: '100%'
}

const containerStyle = {
  width: '100%',
  height: '20%',
  float: 'left',
  border: '1px solid blue'
}

const subcontainerStyle = {
  'marginLeft': '2.5%',
  width: '60%',
  height: '100%',
  float: 'left'
}

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.textChange = this.textChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  textChange(e) {
    this.setState({ search: e.target.value });
  }

  submit(e) {
    this.props.setPokemon(e.value);
  }

  imgClick(e){
    console.log('clicked')
  }

  render() {
    if (this.props.url !== null) {
      let list = [];
      console.log(pokemon.all())
      pokemon.all().map(name => list.push({ value: name, label: name }));

      return (
        <div style={containerStyle}>
          <div className="sprite">
            <img src={this.props.url} alt="sprite" onClick={this.props.toggleShiny}/>
          </div>
          <div style={subcontainerStyle}>
            <div className="name">
              <h3>{this.props.name}</h3>
            </div>
            <div className="search">
              <Select
                style={selectStyle}
                className="basic-single"
                classNamePrefix="select"
                name="name"
                options={list}
                onChange={this.submit}
              />
            </div>
          </div>
          <div className="clearfix" />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Pokemon;
