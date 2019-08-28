import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SignUpModal extends Component {

  state = {
  	email: '',
  	password: ''
  }

  handleTextInput = (e) => {
  	this.setState({
  	  [e.target.id]: e.target.value
  	})
  }

  handleSignUp = (e) => {
  	e.preventDefault()

    fetch(('http://localhost:3000/api/v1/users'), {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ user: {email: this.state.email, password: this.state.password} })
    })
      .then(resp => resp.json())
      .then(userObj => {
        if (!userObj.error) {
          localStorage.setItem("token", userObj.jwt)
          localStorage.setItem("id", userObj.user.id)
          this.props.loggedIn()
          this.props.close()
        } else {
          localStorage.removeItem('token')
          localStorage.removeItem('id')
        }  
      })
      .catch(error => console.log(error))
  }

  render() {
  	return (
  	  <div className="modal">
  	    <div className="modal-content">
  	        <h4>Please Sign Up</h4>
	  	    <form onSubmit={this.handleSignUp}>
	  	      <TextField
	            required
	            id="email"
	            autoFocus
	            margin="dense"
	            label="Email"
	            type="email"
	            fullWidth
	            variant="outlined"
	            value={this.state.title}
	            onChange={this.handleTextInput}
	          />
	          <TextField
	            required
	            id="password"
	            autoFocus
	            margin="dense"
	            label="Password"
	            type="password"
	            fullWidth
	            variant="outlined"
	            value={this.state.title}
	            onChange={this.handleTextInput}
	          />
	          <Button variant="outlined" type="submit">Submit</Button>
	          <Button variant="outlined" onClick={this.props.close}>X</Button>
	  	    </form>
	  	</div>
  	  </div>
  	)
  }
}

export default SignUpModal