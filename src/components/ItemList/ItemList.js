import React, { Component } from 'react';

import './ItemList.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';

export default class ItemList extends Component {
  swapiService = new SwapiService();
  state = {
    peopleList: null
  };
  componentDidMount() {
    (async () => {
      const peopleList = await this.swapiService.getAllPeople();
      this.setState({
        peopleList
      });
    })();
    // this.swapiService.getAllPeople().then(peopleList => {
    //   console.log(peopleList);
    //   this.setState({
    //     peopleList
    //   });
    // });
  }
  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => this.props.onItemSelected(id)}
        >
          {name}
        </li>
      );
    });
  }
  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }
    const items = this.renderItems(peopleList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
