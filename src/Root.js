import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createGlobalStyle } from 'styled-components';

import App from 'components/App';
import { history } from 'redux/configureStore';

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    max-width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    background-color: #0E1427;
  }
`;

class Root extends Component {
  render() {
    return (
      <>
        <GlobalStyles />
        <Provider store={this.props.store}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </Provider>
      </>
    );
  }
}

export default Root;
