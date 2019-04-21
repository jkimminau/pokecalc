import React, { Component } from "react";

import Header from "./Header";
import Pokemon from "./Pokemon";
import Stat from "./Stat";
import Level from "./Level";
import "./Card.css";

const cardStyle = {
  'borderRadius': '20px',
  width: '30%',
  height: '100%',
  float: 'left',
  'marginLeft': '1%',
  'backgroundColor': 'white',
  'boxShadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.40)'
}

const mobileStyle = {
  'borderRadius': '20px',
  width: '95%',
  height: '98%',
  float: 'left',
  'marginLeft': '2.5%',
  'backgroundColor': 'white',
  'boxShadow': '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.40)',
}

const headerStyle = {
  width: '100%',
  height: '40%',
  border: '1px solid red'
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
  border: '1px solid blue',
  justifyContent: 'center',
  alignItems: 'center'
}

const nameStyle = {
  'marginLeft': '2.5%',
  width: '60%',
  border: '1px solid blue',
  height: '100%',
  float: 'left'
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokejson: null,
      json: null,
      level: 100,
      nature: 'adamant',
      shiny: false,
      iv: {
        hp: 31,
        atk: 31,
        spa: 31,
        def: 31,
        spd: 31,
        spe: 31
      },
      ev: {
        hp: 0,
        atk: 0,
        spa: 0,
        def: 0,
        spd: 0,
        spe: 0
      }
    };

    this.setPokemon = this.setPokemon.bind(this);
    this.toggleShiny = this.toggleShiny.bind(this);
    this.updateLvl = this.updateLvl.bind(this);
    this.updateNature = this.updateNature.bind(this);
    this.updateStat = this.updateStat.bind(this);
    this.setPokemon = this.setPokemon.bind(this);
  }

  componentDidMount(){
    this.setPokemon(String([...Array(809).keys()][Math.floor(Math.random() * 809)]));
  }

  checkResponse(res) {
    if (res.status === 404) {
      throw new Error(res.statusText);
    } else {
      return res;
    }
  }

  setPokemon(name) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + name.toLowerCase())
      .then(res => this.checkResponse(res))
      .then(res => res.json())
      .then(data => this.setState({ pokejson: data }))
      .catch(function error() {
        console.log('error finding pokemon: ' + name)
      });
      this.setState({shiny: false});
  }

  toggleShiny(e){
    var tmp = this.state;
    tmp.shiny = !tmp.shiny;
    this.setState(tmp);
  }

  updateLvl(e) {
    var tmp = this.state;
    tmp.level = e.value;
    this.setState(tmp);
  }
  
  updateNature(e) {
    var tmp = this.state;
    tmp.nature = e.value.toLowerCase();
    this.setState(tmp);
  }

  updateStat(id, iv, ev) {
    var tmp = this.state;
    tmp.iv[id] = iv;
    tmp.ev[id] = ev;
    this.setState(tmp);
  }

  render() {
    let p = this.state.pokejson;
    if (p !== null) {
      return (
        <div style={this.props.device === undefined || this.props.device !== 'mobile' ? cardStyle : mobileStyle}>
          {/* <div style={headerStyle}>
            <div style={displayStyle}>
              <div style={spriteStyle}>
                <img src={(this.state.shiny === true ? 
                  "https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/" :
                  "https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/") +
                  p.name +
                  ".gif"
                }
                alt="sprite"
                onClick={this.toggleShiny}/>
              </div>
              <div style={nameStyle}>
              </div>
              <div className='clearfix'/>
            </div>
          </div> */}
          <Header 
            name={p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            url={this.state.shiny === true ? 
              "https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/" +
              p.name +
              ".gif" :
              "https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/" +
              p.name +
              ".gif"
            }
            setPokemon={this.setPokemon}
            toggleShiny={this.toggleShiny}
            lvl={this.state.level}
            updateLvl={this.updateLvl}
            updateNature={this.updateNature}
          />
          {/* <Pokemon
            name={p.name.charAt(0).toUpperCase() + p.name.slice(1)}
            url={this.state.shiny === true ? 
              "https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front-shiny/" +
              p.name +
              ".gif" :
              "https://raw.githubusercontent.com/tdmalone/pokecss-media/master/graphics/pokemon/ani-front/" +
              p.name +
              ".gif"
            }
            setPokemon={this.setPokemon}
            toggleShiny={this.toggleShiny}
          />
          <Level
            lvl={this.state.level}
            updateLvl={this.updateLvl}
            updateNature={this.updateNature}
          />
          <div className='labels'>
            <label className='iv_label'>IV</label>
            <label className='ev_label'>EV</label>
          </div>
          <div className='clearfix'/> */}
          <Stat
            name="HP"
            id="hp"
            base={Number(p.stats[5].base_stat)}
            iv={Number(this.state.iv.hp)}
            ev={Number(this.state.ev.hp)}
            evTotal={Object.values(this.state.ev).reduce((a, b) => a + b)}
            lvl={this.state.level}
            nature={this.state.nature}
            update={this.updateStat}
          />
          <Stat
            name="Attack"
            id="atk"
            base={Number(p.stats[4].base_stat)}
            iv={Number(this.state.iv.atk)}
            ev={Number(this.state.ev.atk)}
            evTotal={Object.values(this.state.ev).reduce((a, b) => a + b)}
            lvl={this.state.level}
            nature={this.state.nature}
            update={this.updateStat}
          />
          <Stat
            name="Sp. Atk"
            id="spa"
            base={Number(p.stats[2].base_stat)}
            iv={Number(this.state.iv.spa)}
            ev={Number(this.state.ev.spa)}
            evTotal={Object.values(this.state.ev).reduce((a, b) => a + b)}
            lvl={this.state.level}
            nature={this.state.nature}
            update={this.updateStat}
          />
          <Stat
            name="Defense"
            id="def"
            base={Number(p.stats[3].base_stat)}
            iv={Number(this.state.iv.def)}
            ev={Number(this.state.ev.def)}
            evTotal={Object.values(this.state.ev).reduce((a, b) => a + b)}
            lvl={this.state.level}
            nature={this.state.nature}
            update={this.updateStat}
          />
          <Stat
            name="Sp. Def"
            id="spd"
            base={Number(p.stats[1].base_stat)}
            iv={Number(this.state.iv.spd)}
            ev={Number(this.state.ev.spd)}
            evTotal={Object.values(this.state.ev).reduce((a, b) => a + b)}
            lvl={this.state.level}
            nature={this.state.nature}
            update={this.updateStat}
          />
          <Stat
            name="Speed"
            id="spe"
            base={Number(p.stats[0].base_stat)}
            iv={Number(this.state.iv.spe)}
            ev={Number(this.state.ev.spe)}
            evTotal={Object.values(this.state.ev).reduce((a, b) => a + b)}
            lvl={this.state.level}
            nature={this.state.nature}
            update={this.updateStat}
          />
        </div>
      );
    } else {
      return (
        <div/>
      );
    }
  }
}

export default Card;
