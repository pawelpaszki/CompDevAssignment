import React, { PropTypes as T } from 'react';
import {Button} from 'react-bootstrap';
import AuthService from 'utils/AuthService';
import { Link } from 'react-router'; 
import { browserHistory } from 'react-router';
import _ from 'lodash';
import $ from "jquery";

var SearchBox = React.createClass({
  handleChange : function(e, type,value) {
    e.preventDefault();
    this.props.onUserInput( type,value);
  },
  handleTextChange : function(e) {
    this.handleChange( e, 'search', e.target.value);
  },
  handleSortChange : function(e) {
    this.handleChange(e, 'sort', e.target.value);
  },
  render: function(){
    return (
      <div className="search-box">
        <input type="text" placeholder="Search" value={this.props.filterText}
                          onChange={this.handleTextChange}/>
        Sort by:
        <select id="sort" value={this.props.order} 
          onChange={this.handleSortChange} >
        <option value="surname">name</option>
		    <option value="body_weight">weight</option>
        </select>
      </div>
    );
  }
});

var User = React.createClass({
	getInitialState : function() {
	 return {
		 status: '',
     picture: this.props.userItem.picture,
		 id: this.props.userItem._id,
		 first_name : this.props.userItem.first_name,
	   surname: this.props.userItem.surname,
	   dob: this.props.userItem.dob,
	   training_from: this.props.userItem.training_from,
	   body_weight: this.props.userItem.body_weight,
	   height: this.props.userItem.height,
	  };
	},
	handleFirstNameChange: function(e) {
	  this.setState({first_name: e.target.value});
	},
	handleSurnameChange: function(e) {
	  this.setState({surname: e.target.value});
	},
	handleDOBChange: function(e) {
	  this.setState({dob: e.target.value});
	},
	handleTrainingFromChange: function(e) {
	  this.setState({training_from: e.target.value});
	},
  handlePictureChange: function(e) {
	  this.setState({picture: e.target.value});
	},
	handleWeightChange: function(e) {
	  this.setState({body_weight: e.target.value});
	},
	handleHeightChange: function(e) {
	  this.setState({height: e.target.value});
	},
	handleUndo: function(e) {
	  this.setState({ status : ''});
	},
	handleDelete: function(e) {
		e.preventDefault();
		console.log(this.state.id);
		this.props.deleteUserHandler(this.state.id);
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'});
	},
	handleUpdate: function(e) {
	  //e.preventDefault();
	  var first_name = this.state.first_name;
	  var surname = this.state.surname;
	  var dob = this.state.dob;
	  var training_from = this.state.training_from;
	  var body_weight = this.state.body_weight;
	  var height = this.state.height;
	  this.props.updateUserHandler(this.state.id, first_name, surname, dob, training_from, body_weight, height, this.state.picture);
	  this.setState({ status : ''});
	},
	render: function() {
		var userItem = this.props.userItem;
		console.log(userItem.picture);
		var updateHandler = this.handleUpdate;
		var editHandler = this.handleEdit;
		var deleteHandler = this.handleDelete;
		var itemsToRender;
		var path = userItem.picture;
		if(this.state.status == '') {
			itemsToRender = [
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td key={'empty'} className="col-md-1"></td>
              <td key={'id'} className="col-md-2"><img src={path} alt={userItem.first_name} style={{width: 100 + 'px', height: 100 + 'px'}}/></td>
              <td key={'training_sessions'}className="col-md-2"><Link to={'/api/users/' + userItem._id + '/tsessions'}>{userItem.first_name} {userItem.surname}</Link></td>
              <td key={'charts'} className="col-md-2"><Link to={'/api/users/' + userItem._id + '/charts'}><input type="button" className="btn btn-info btn-block" value="charts"/></Link></td>
              <td key={'edit'} className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit" onClick={editHandler}/></td>
              <td key={'delete'} className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete" onClick={deleteHandler}/></td>
              <td key={'empty2'} className="col-md-1"></td>
            </tr>
          </tbody>
        </table>
			];
		} else {
			itemsToRender = [
        <table className="table table-borderless">
          <tbody>
            <tr>
            <td key={'first_name'} className="col-md-2"><input type="text" className="form-control"  value={this.state.first_name} onChange={this.handleFirstNameChange}/></td>
            <td key={'surname'} className="col-md-2"><input type="text" className="form-control"  value={this.state.surname} onChange={this.handleSurnameChange}/></td>
            <td key={'dob'} className="col-md-1"><input type="text" className="form-control"  value={this.state.dob} onChange={this.handleDOBChange}/></td>
            <td key={'training_from'} className="col-md-1"><input type="text" className="form-control"  value={this.state.training_from} onChange={this.handleTrainingFromChange}/></td>
            <td key={'picture'} className="col-md-2"><input type="text" className="form-control"  value={this.state.picture} onChange={this.handlePictureChange}/></td>
            <td key={'weight'} className="col-md-1"><input type="text" className="form-control"  value={this.state.body_weight} onChange={this.handleWeightChange}/></td>
            <td key={'height'} className="col-md-1"><input type="text" className="form-control"  value={this.state.height} onChange={this.handleHeightChange}/></td>
            <td key={'undo'} className="col-md-1"><input type="button" className="btn btn-primary btn-block" value="undo" onClick={this.handleUndo}/></td>
            <td key={'update'} className="col-md-1"><input type="button" className="btn btn-success btn-block" value="confirm" onClick={updateHandler}/></td>
            </tr>
          </tbody>
        </table>
			];
		};
		return (
			<li className="list-group">
			  {itemsToRender}
			</li>
		);
	}
});

var FilteredUsersList = React.createClass({
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.users.length !== nextProps.users.length) {
      return true;
    } else {
      return false;
    }
  },
	render: function() {
		var displayedUsers = this.props.users.map((user) =>{
			return <User key={user.id} userItem={user} updateUserHandler={this.props.updateUserHandler} deleteUserHandler={this.props.deleteUserHandler} />;
		}) ;
		return (
		<div>
			<div className="main-content-with-search-box">
			  <ul className="list-group">
				  {displayedUsers}
			  </ul>
			  <AddUserForm addUserHandler={this.props.addUserHandler}/>
			</div>
		</div>
	  );
	}
});

var AddUserForm = React.createClass({
  getInitialState: function() {
    return { 
      first_name: '',
      surname: '',
      dob: '',
      training_from: '',
      body_weight: '',
      height: '',
    };
  },
	handleFirstNameChange: function(e) {
    this.setState({first_name: e.target.value});
  },
	handleSurnameChange: function(e) {
	  this.setState({surname: e.target.value});
  },
	handleDOBChange: function(e) {
	  this.setState({dob: e.target.value});
  },
	handleTrainingFromChange: function(e) {
	  this.setState({training_from: e.target.value});
  },
	handleWeightChange: function(e) {
	  this.setState({body_weight: e.target.value});
  },
	handleHeightChange: function(e) {
	  this.setState({height: e.target.value});
  },
	handleSubmit: function(e) {
		var first_name = this.state.first_name;
		var surname = this.state.surname;
		var dob = this.state.dob;
		var training_from = this.state.training_from;
		var body_weight = this.state.body_weight;
		var height = this.state.height;
	  this.props.addUserHandler(first_name, surname, dob, training_from, body_weight, height);
	},
	render: function() {
		return (
			<div>
				<table className="table table-borderless">
          <tbody>
            <tr>
              <td key={'first_name'} className="col-md-2"><input type="text" className="form-control"
                placeholder="First name" value={this.state.first_name} onChange={this.handleFirstNameChange} /></td>
              <td key={'surname'} className="col-md-2"><input type="text" className="form-control"
                placeholder="Surname" value={this.state.surname} onChange={this.handleSurnameChange} /></td>
              <td key={'dob'} className="col-md-2"><input type="text" className="form-control"
                placeholder="DOB" value={this.state.dob} onChange={this.handleDOBChange} /></td>
              <td key={'training_from'} className="col-md-2"> <input type="text" className="form-control"
                placeholder="Training from" value={this.state.training_from} onChange={this.handleTrainingFromChange} /></td>
              <td key={'weight'} className="col-md-2"> <input type="text" className="form-control"
                placeholder="Weight" value={this.state.weight} onChange={this.handleWeightChange} /></td>
               <td key={'height'} className="col-md-2"> <input type="text" className="form-control"
                 placeholder="Height" value={this.state.height} onChange={this.handleHeightChange} /></td>
              <td key={'addUser'} className="col-md-2"><input type="button" className="btn btn-primary" value="Add user"
                onClick={this.handleSubmit} /> </td>
              <td className="col-md-1"></td>
            </tr>
          </tbody>
        </table>
			</div>
		) ;
	}
});

var GymProgressLogger = React.createClass({
	getInitialState: function() {
	  return { 
      search: '', 
      sort: 'dob',
      users: [],
    };
  },
	componentDidMount(){
    this.getUsersFromServer('http://localhost:3001/api/users/');
  },
  populateUsers: function(response) {
    this.setState({
      users: response
    });
  },
  getUsersFromServer:function(URL){
    $.ajax({
      type:"GET",
      dataType:"json",
      url:URL,
      contentType : 'application/json',
      success: function(response) {
          this.populateUsers(response);
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  deleteUser:function(id) {
    $.ajax({
      url: 'http://localhost:3001/api/users/' + id,
      type: 'DELETE',
      contentType: 'application/json'
    });
    document.location.reload(true);
  },
  updateUser: function(id, first_name, surname, dob, training_from, body_weight, height, picture) {
    $.ajax({
      url: 'http://localhost:3001/api/users/' + id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        id: id,
        first_name: first_name,
        surname: surname,
        dob: dob,
        body_weight: body_weight,
        height: height,
        training_from: training_from,
        picture: picture
      }),
      dataType: 'json'
    });
		document.location.reload(true);
  },
  addUser:function(first_name, surname, dob, training_from, body_weight, height) {
    
    $.ajax({
			url: 'http://localhost:3001/api/users',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				first_name: first_name,
				surname: surname,
				dob: dob,
				body_weight: body_weight,
				height: height,
				picture: "https://s17.postimg.org/91vave2pr/default.jpg",
				training_from: training_from
			}),
			dataType: 'json'
		});
		document.location.reload(true);
	},
  handleChange : function(type,value) {
    if ( type == 'search' ) {
      this.setState( { search: value } ) ;
    } else {
      this.setState( { sort: value } ) ;
    }
  }, 
  render: function(){
	  var users = this.state.users.users;
    console.log(users);
	  var userList = users.filter(function(p) {
      var name = p.first_name + ' ' + p.surname;
      return name.toLowerCase().search(
        this.state.search.toLowerCase() ) != -1 ;
		}.bind(this) );
	  var filteredList = _.sortBy(userList, this.state.sort) ;
	  return (
      <div>
        <SearchBox onUserInput={this.handleChange } 
           filterText={this.state.search} sort={this.state.sort}/>
        <FilteredUsersList users={filteredList} addUserHandler={this.addUser} updateUserHandler={this.updateUser} deleteUserHandler={this.deleteUser}/>
      </div>
	  );
  }
});

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
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
    this.context.router.push('/api/login');
  }

  render(){
    const { profile } = this.state
    return (
      <div>
        <Button style={{marginRight: 2 + 'em', marginTop: 1 + 'em', paddingLeft: 1 + 'em'}} className="nav navbar-nav navbar-right"onClick={this.logout.bind(this)}><span className="glyphicon glyphicon-log-out"></span> Logout</Button>
        <Link to="/api/muscles" ><button style={{marginRight: 1 + 'em',  marginTop: 1 + 'em', paddingLeft: 10 + 'px', paddingRight: 6 + 'px'}} className="nav btn-primary navbar-nav navbar-right">Muscles & Exercises</button></Link>
        <h3> Welcome {profile.name}</h3>
        <Button style={{marginLeft: 2 + 'em', marginTop: 1 + 'em', marginBottom: 1 + 'em', paddingLeft: 1 + 'em'}} className="btn primary-btn"onClick={browserHistory.goBack}>Go back</Button>
        <GymProgressLogger/>
      </div>
    )
  }
}

export default Home;
