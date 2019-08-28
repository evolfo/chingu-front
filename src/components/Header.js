import React, { Component } from 'react'

import LogInModal from '../modals/LogInModal'
import SignUpModal from '../modals/SignUpModal'

class Header extends Component {

  state = {
  	logInOpen: false,
  	signUpOpen: false,
  	isLoggedIn: false
  }

  openLogInModal = () => {
  	this.setState({
  	  logInOpen: true
  	})
  }

  openSignUpModal = () => {
  	this.setState({
  	  signUpOpen: true
  	})
  }

  closeLogInModal = () => {
  	this.setState({
  	  logInOpen: false
  	})
  }

  closeSignUpModal = () => {
  	this.setState({
  	  signUpOpen: false
  	})
  }

  loggedIn = () => {
  	this.setState({
  	  isLoggedIn: true
  	})
  }

  logOut = () => {
  	localStorage.clear()
  	this.setState({
  	  isLoggedIn: false
  	})
  }

  render() {
  	if (localStorage.token) {
  		return (
  		  <React.Fragment>
	  	    <nav className="main-nav">
	  	  	  <h1>Digital Journal <span>| Create a Note</span></h1>
	  	  	  <div className="nav-links">
	  	  	    <button onClick={this.logOut}> Log Out </button>
	  	  	  </div>
	  	    </nav>
	  	  </React.Fragment>
  		)
	  	
	} else {
		return (
	  	  <React.Fragment>
	  	    <nav className="main-nav">
	  	  	  <h1>Digital Journal <span>| Create a Note</span></h1>
	  	  	  <div className="nav-links">
	  	  	    <button onClick={this.openLogInModal}> Log In </button>
	  	  	    <button open={this.state.signUpOpen} onClick={this.openSignUpModal}> Sign Up</button>
	  	  	  </div>
	  	    </nav>
	  	    {this.state.logInOpen ? <LogInModal loggedIn={this.loggedIn} open={this.state.logInOpen} close={this.closeLogInModal}/> : null}
	  	    {this.state.signUpOpen ? <SignUpModal loggedIn={this.loggedIn} open={this.state.signUpOpen} close={this.closeSignUpModal}/> : null}
	  	  </React.Fragment>
	  	)
	}
  }
}

export default Header	