// (async () => {
//   const rawData = await fetch('https://swapi.co/api/people/1/');
//   const data = await rawData.json();
//   console.log(data);
// })();

// const getResource = async url => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error(`Could not fetch ${url}, received ${res.status}`);
//   }
//   const body = await res.json();
//   return body;
// };

// getResource('https://swapi.co/api/people/6565656654/')
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.error('Could not fetch', err);
//   });

export default class SwapiService {
  _apiBase = 'https://swapi.co/api';
  _imageBase = 'https://starwars-visualguide.com/assets/img';

  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  };

  getAllPeople = async () => {
    console.log(this);
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async id => {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async id => {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  };

  getAllStarships = async () => {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  };

  getStarship = async id => {
    const starship = await this.getResource(`/starships/${id}/`);
    console.log(starship);

    return this._transformStarship(starship);
  };

  getPersonImage = ({ id }) => {
    return `${this._imageBase}/characters/${id}.jpg`;
  };

  getStarshipImage = ({ id }) => {
    return `${this._imageBase}/starships/${id}.jpg`;
  };

  getPlanetImage = ({ id }) => {
    return `${this._imageBase}/planets/${id}.jpg`;
  };

  _extractId = item => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = planet => {
    const id = this._extractId(planet);
    return {
      id,
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformStarship = starship => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.cost_in_credits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargo_capacity,
    };
  };

  _transformPerson = person => {
    const id = this._extractId(person);

    return {
      id,
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color,
    };
  };
}

// const swapi = new SwapiService();
// console.log(swapi);
// swapi.getAllPeople().then(people => {
//   people.forEach(p => console.log(p.name));
// });
// swapi.getPerson(3).then(p => console.log(p.name));
