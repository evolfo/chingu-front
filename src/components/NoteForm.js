import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class NoteForm extends Component {

  state = {
    title: '',
    content: ''
  }

  handleTextInput = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if(localStorage.token) {
      fetch(('http://localhost:3000/api/v1/notes'), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: JSON.stringify({ user_id: parseInt(localStorage.id), title: this.state.title, content: this.state.content })
      })
    } else {
      window.alert('Please log in first');
    }
  }

  render() {
  	return (
  	  <div className="form-container">
        <form onSubmit={this.handleSubmit}>
          <TextField
                required
                id="title"
                autoFocus
                margin="dense"
                label="Title"
                type="Title"
                fullWidth
                variant="outlined"
                value={this.state.title}
                onChange={this.handleTextInput}
              />
          <TextField
                required
                id="content"
                autoFocus
                margin="dense"
                label="Content"
                type="text"
                fullWidth
                variant="outlined"
                multiline={true}
                rows={4}
                rowsMax={20}
                value={this.state.content}
                onChange={this.handleTextInput}
              />
            <Button variant="outlined" type="submit">Submit</Button>
        </form>
        <p>Use the form above to create a post. Make sure you fill the required title and body fields and then press submit.</p>
      </div>
  	)
  }
}

export default NoteForm