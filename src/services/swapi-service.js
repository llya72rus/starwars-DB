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

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }
    return await res.json();
  }

  // getAllPeople() {
  //   const res = this.getResource(`/people/`);
  //   return res;
  // }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const starship = this.getResource(`/starships/${id}/`);
    return this._transformStarship(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = planet => {
    const id = this._extractId(planet);
    return {
      id,
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };

  _transformStarship = starship => {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  };

  _transformPerson = person => {
    const id = this._extractId(person);

    return {
      id,
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  };
}

// const swapi = new SwapiService();
// console.log(swapi);
// swapi.getAllPeople().then(people => {
//   people.forEach(p => console.log(p.name));
// });
// swapi.getPerson(3).then(p => console.log(p.name));
