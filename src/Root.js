import React, { Component } from 'react';
import { Provider } from 'react-redux';

class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <header>
          <h1>Redux Saga Demos</h1>
        </header>
      </Provider>
    );
  }
}

export default Root;
