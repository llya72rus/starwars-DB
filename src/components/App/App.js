import React, { Component } from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ItemList from '../ItemList';
import PersonDetails from '../PersonDetails';

import './App.css';

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    selectedPerson: 1
  };

  toggleRandomPlanet = () => {
    this.setState(state => {
      return {
        showRandomPlanet: !state.showRandomPlanet
      };
    });
  };

  updateDetailsLoading = () => {
    this.setState(state => {
      return {
        detailsLoading: !state.detailsLoading
      };
    });
  };

  onPersonSelected = id => {
    this.setState({
      selectedPerson: id,
      detailsLoading: !this.state.detailsLoading
    });
    console.log(this.state);
  };

  render() {
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    return (
      <div className="col-12">
        <Header />
        {planet}
        <button
          className="toggle-planet btn btn-warning btn-lg mb-3"
          onClick={this.toggleRandomPlanet}
        >
          Toggle Random Planet
        </button>

        <div className="row mb2">
          <div className="col-md-6">
            <ItemList onItemSelected={this.onPersonSelected} />
          </div>
          <div className="col-md-6 person-details-wrapper">
            <PersonDetails personId={this.state.selectedPerson} />
          </div>
        </div>
      </div>
    );
  }
}
