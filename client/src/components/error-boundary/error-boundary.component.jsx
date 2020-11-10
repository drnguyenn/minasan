import React, { Component } from 'react';

import {
  ErrorImageOverlay,
  ErrorImageContainer,
  ErrorImageText
} from './error-boundary.styles';

class ErrorBoundary extends Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false
    };
  }

  static getDerivedStateFromError(error) {
    return { hasErrored: true };
  }

  componentDidCatch(error, info) {
    console.log(error);
  }

  render() {
    if (this.state.hasErrored)
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
          <ErrorImageText>Sorry, This Page is Broken</ErrorImageText>
        </ErrorImageOverlay>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
