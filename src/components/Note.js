import React, { Component } from 'react'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Note extends Component {

  state = {
  	editing: false,
  	title: '',
  	content: ''
  }

  handleTextInput = (e) => {
  	this.setState({
  	  [e.target.id]: e.target.value
  	})
  }

  handleDelete = () => {
  	fetch('https://ang-chingu-api.herokuapp.com/api/v1/notes/' + this.props.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
  }

  handleEdit = (e) => {
  	this.setState({
  	   editing: true
  	})
  }

  handleEditSubmit = (e) => {
  	e.preventDefault()

  	this.setState({
  	  editing: false
  	})

  	fetch(('https://ang-chingu-api.herokuapp.com/api/v1/notes/' + this.props.id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accepts": "application/json",
          "Authorization": "Bearer " + localStorage.token
        },
        body: JSON.stringify({ title: this.state.title, content: this.state.content })
      })
  }

  render() {
    return ( 
  	  <Card className='note'>
        <CardContent>
          <h3>
           {this.props.title}
          </h3>
          <p>{this.props.content}</p>
        </CardContent>
        <CardActions>
          <Button onClick={this.handleEdit} variant="outlined" color="primary" size="small">Edit</Button>
          <Button onClick={this.handleDelete} variant="outlined" color="secondary" size="small">Delete</Button>
        </CardActions>
        {this.state.editing ? 
          <div className="form-container">
	        <form onSubmit={this.handleEditSubmit}>
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
	      </div>
          : null
          }
      </Card>
    )
  }
}

export default Note