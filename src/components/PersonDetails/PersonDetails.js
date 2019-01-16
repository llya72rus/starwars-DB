import React, { Component } from 'react';

import './PersonDetails.css';
import SwapiService from '../../services/swapi-service';
import Spinner from '../Spinner';
import ErrorButton from '../ErrorButton';

export default class PersonDetails extends Component {
  swapiService = new SwapiService();
  state = {
    person: null,
    loading: false
  };

  componentDidMount() {
    console.log('componentDidMount()');
    this.updatePerson();
  }

  componentDidUpdate = prevProps => {
    console.log('componentDidUpdate()');
    if (this.props.personId !== prevProps.personId) {
      this.updatePerson();
      console.log('Новые, componentDidUpdate()')
    } else {
      console.log('Старые, componentDidUpdate()');
    }
  };

  componentWillUpdate() {
    console.log('componentWillUpdate()');
  }
  async updatePerson() {
    const { personId } = this.props;
    if (!personId) return;
      const person = await this.swapiService.getPerson(personId); 
      // this.props.updateDetailsLoading();
      this.setState({
        person,
      });
  }

  render() {
    if (!this.state.person) {
      return <span>Select a person from a list</span>;
    }
    const {
      person: { id, name, gender, birthYear, eyeColor }
    } = this.state;

    // const { detailsLoading } = this.props;

    // if (detailsLoading) {
    //   return <Spinner />;
    // }
    return (
      <div className="person-details card">
        <img
          className="person-image"
          src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
          alt="Character "
        />

        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Gender:</span>
              <span>{gender}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Birth Year:</span>
              <span>{birthYear}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Eye Color:</span>
              <span>{eyeColor}</span>
            </li>
          </ul>
          <ErrorButton />
        </div>
      </div>
    );
  }
}
