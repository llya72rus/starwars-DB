import React, { Component } from 'react';
import Header from '../Header';
import RandomPlanet from '../RandomPlanet';
import ErrorIndicator from '../ErrorIndicator';
import PeoplePage from '../Pages/PeoplePage';
import PlanetPage from '../Pages/PlanetPage';
import StarshipPage from '../Pages/StarshipPage';
import LoginPage from '../Pages/LoginPage';
import SecretPage from '../Pages/SecretPage';
import ErrorBoundry from '../ErrorBoundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import './App.css';
import SwapiService from '../../services/swapi-service';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { StarshipDetails } from '../sw-components';

export default class App extends Component {
  swapiService = new SwapiService();

  state = {
    showRandomPlanet: true,
    hasError: false,
    isLoggedIn: false,
  };

  onLogIn = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }
    const { isLoggedIn } = this.state;
    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.swapiService}>
          <Router>
            <div className="col-12 stardb-app">
              <Header />
              {planet}
              <Switch>
                <Route
                  path="/"
                  exact
                  render={() => <h2>Welcome to StarDB</h2>}
                />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets/" component={PlanetPage} />
                <Route path="/starships/" exact component={StarshipPage} />
                <Route
                  path="/starships/:id"
                  render={({ match }) => {
                    const { id } = match.params;
                    return <StarshipDetails itemId={id} />;
                  }}
                />
                <Route
                  path="/login"
                  render={() => (
                    <LoginPage onLogin={this.onLogIn} isLoggedIn={isLoggedIn} />
                  )}
                />
                <Route
                  path="/secret"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                />
                <Route render={() => <h2>404 - Page not found.</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
