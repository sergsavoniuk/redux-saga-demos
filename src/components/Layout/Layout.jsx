import React from 'react';
import { node } from 'prop-types';

import { Container } from './Layout.components';

function Layout({ children }) {
  return <Container>{children}</Container>;
}

Layout.propTypes = {
  children: node.isRequired,
};

export default Layout;
