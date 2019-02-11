import React, { Component } from 'react';
import Spinner from '../Spinner';
import ErrorIndicator from '../ErrorIndicator';

const WithData = (WrappedComponent) => {
  return class extends Component {
    static displayName = 'WithData';

    state = {
      data: null,
      loading: true,
      error: false,
    };

    componentDidMount() {
      this.update();
    }

    update = async () => {
      this.setState({
        loading: true,
        error: false,
      });
      try {
        const data = await this.props.getData();

        this.setState({
          data,
          loading: false,
          error: false,
        });
      } catch (error) {
        this.setState({
          loading: false,
          error: true,
        });
      }
    };

    render() {
      const { data, loading, error } = this.state;

      if (loading) {
        return <Spinner />;
      }
      if (error) {
        return <ErrorIndicator />;
      }
      return <WrappedComponent {...this.props} data={data} />;
    }
  };
};

export default WithData;
