import React from 'react';

import { Container } from './Layout.components';

function Layout({ children }) {
  return <Container>{children}</Container>;
}

export default Layout;
