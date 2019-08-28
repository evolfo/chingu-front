import React, { Component } from 'react';
import './App.css';

import Header from './components/Header'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <NoteForm />
        <NoteList />
      </div>
    )
  }
}

export default App;
