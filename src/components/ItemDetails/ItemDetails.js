import React, { Component } from 'react';

import './ItemDetails.css';
import ErrorButton from '../ErrorButton';

export const Record = ({ item, field, label }) => (
  <li className="list-group-item">
    <span className="term">{label}: </span>
    <span>{item[field]}</span>
  </li>
);

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
  };

  componentDidMount() {
    this.updateItem();
    console.log('componentDidMount()');
    console.log(this.state);
  }
  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then((item) => {
      this.setState({
        item,
        image: getImageUrl(item),
      });
    });
  }

  render() {
    if (!this.state.item) {
      return <span>Select a Item from a list!</span>;
    }
    const { item, image } = this.state;
    const { name } = item;

    console.log('ItemDetails, state=', this.state);
    console.log('ItemDetails, props=', this.props);

    return (
      <div className="item-details card">
        <img className="item-image" src={image} alt="Character " />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
