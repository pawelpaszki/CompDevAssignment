import React from 'react';
import { Link } from 'react-router';
import $ from "jquery";
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import AuthService from 'utils/AuthService'

export class Header extends React.Component({
  contextTypes = {
    router: T.object
  }

  var propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div>
		<Button style={{marginRight: 2 + 'em', marginTop: 1 + 'em', paddingLeft: 1 + 'em'}} className="nav navbar-nav navbar-right"onClick={this.logout.bind(this)}><span className="glyphicon glyphicon-log-out"></span> Logout</Button>
	  	<Link to="/home" ><button style={{marginRight: 1 + 'em', marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Home</button></Link>
		<Link to="/muscles" ><button style={{marginRight: 1 + 'em',  marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Muscles & Exercises</button></Link>
		<h3> Welcome {profile.name}</h3>
		<Button style={{marginLeft: 2 + 'em', marginTop: 1 + 'em', marginBottom: 1 + 'em', paddingLeft: 1 + 'em'}} className="btn primary-btn"onClick={browserHistory.goBack}>Go back</Button>
      </div>
    )
  }
});

export default Header;