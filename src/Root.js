import React from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createGlobalStyle } from 'styled-components';

import App from 'components/App';
import { history } from 'redux/configureStore';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Digital';
    src: url(${process.env.PUBLIC_URL}/fonts/digital-7.ttf);
  }

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
    user-select: none;
  }

  #modal {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #modal.hidden {
    display: none;
  }

  #root {
    height: 100%;
    box-sizing: border-box;
  }

  #modal ~ #root {
    transition: 600ms filter ease-in-out, 800ms opacity ease-out;
    filter: blur(0) saturate(1);
    opacity: 1;
  }

  #modal:not(.hidden) ~ #root {
    filter: blur(5px) saturate(0.1);
    opacity: 0.2;
  }
`;

function Root({ store }) {
  return (
    <>
      <GlobalStyles />
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </>
  );
}

Root.propTypes = {
  store: object.isRequired,
};

export default Root;
