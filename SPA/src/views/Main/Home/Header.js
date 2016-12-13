import React from 'react';
import { Link } from 'react-router';
import {Button} from 'react-bootstrap';
import { browserHistory } from 'react-router';

var Header = React.createClass({
	render() {
    var headerValue = this.props.headerValue;
		return (
      <div>
        <Link to="/home" ><button style={{marginRight: 1 + 'em', marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Home</button></Link>
        <Link to="/muscles" ><button style={{marginRight: 1 + 'em',  marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Muscles & Exercises</button></Link>
        <h3> {headerValue}</h3>
        <Button style={{marginLeft: 2 + 'em', marginTop: 1 + 'em', marginBottom: 1 + 'em', paddingLeft: 1 + 'em'}} className="btn primary-btn"onClick={browserHistory.goBack}>Go back</Button>
      </div>
		)
	}
});

export default Header;