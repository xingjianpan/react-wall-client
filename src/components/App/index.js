import React, { Component } from 'react';
import Header from '../Header';
try {
  require('os').networkInterfaces();
} catch (e) {
  require('os').networkInterfaces = () => ({});
}
import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        { this.props.children }

      </div>
    );
  }
}

export default App;
