import React, { Component } from 'react';
import Row from '../Row';

import { PlanetDetails, PlanetList } from '../sw-components';

export default class PlanetPage extends Component {
  state = {
    selectedItem: null,
    hasError: false,
  };

  onItemSelected = (selectedItem) => {
    this.setState({ selectedItem });
  };

  render() {
    return (
      <Row
        left={<PlanetList onItemSelected={this.onItemSelected} />}
        right={<PlanetDetails itemId={this.state.selectedItem} />}
      />
    );
  }
}
