import React, { Component } from 'react';

import './ItemList.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';

export default class ItemList extends Component {  
  // swapiService = new SwapiService();

  state = {
    itemList: null
  };

  componentDidMount() {
    const { getData } = this.props;
    (async () => {
      const itemList = await getData();
      this.setState({
        itemList
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
    const { itemList } = this.state;

    if (!itemList) {
      return <Spinner />;
    }
    const items = this.renderItems(itemList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
