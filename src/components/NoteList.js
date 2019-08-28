import React, { Component } from 'react'

import Note from './Note'

class NoteList extends Component {

  state = {
    notes: []
  }

  componentDidMount() {
    if(localStorage.id) {
      fetch('https://ang-chingu-api.herokuapp.com/api/v1/users/' + localStorage.id, {
        "method": 'GET',
        "headers": {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": "Bearer " + localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(userObj => {
          this.setState({
            notes: userObj.notes
          })
        })
    }
  }

  componentDidUpdate() {
  	if(localStorage.id) {
      fetch('https://ang-chingu-api.herokuapp.com/api/v1/users/' + localStorage.id, {
        "method": 'GET',
        "headers": {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": "Bearer " + localStorage.token
        }
      })
        .then(resp => resp.json())
        .then(userObj => {
          this.setState({
            notes: userObj.notes
          })
        })
    }
  }

  render() {
  	const notes = this.state.notes.map(note => {
  	  return <Note id={note.id} key={note.id} title={note.title} content={note.content} />
  	})

    if (localStorage.id) {
      return (
  	    <React.Fragment>
  	      {notes}
  	    </React.Fragment>
      )
    } else {
      return(
      	<React.Fragment>
      	</React.Fragment>
      )
    }
  }
}

export default NoteList