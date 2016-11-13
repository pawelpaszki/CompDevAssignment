import React from 'react';

function isValidDate(dateString) {
	// First check for the pattern
	if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
  return false;

	// Parse the date parts to integers
	var parts = dateString.split("/");
	var day = parseInt(parts[0], 10);
	var month = parseInt(parts[1], 10);
	var year = parseInt(parts[2], 10);

	// Check the ranges of month and year
	if(year < 1000 || year > 3000 || month == 0 || month > 12)
		return false;

	var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

	// Adjust for leap years
	if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
		monthLength[1] = 29;

	// Check the range of the day
	return day > 0 && day <= monthLength[month - 1];
};

var EditProfileForm = React.createClass({
	getInitialState : function() {
	  return {
      status : '',
      first_name: this.props.user.first_name,
      surname: this.props.user.surname,
      dob: this.props.user.dob,
      training_from: this.props.user.training_from
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
	handleUpdateProfile: function(e) {
		e.preventDefault();
		
		var first_name = this.state.first_name.trim();
		var surname = this.state.surname.trim();
		var dob = this.state.dob.trim();
		var training_from = this.state.training_from.trim();
		var key = this.props.user.id;
		if (isValidDate(dob) && isValidDate(training_from)) {
			this.props.profileUpdateHandler(key, first_name, surname, dob, training_from);
		} else {
			this.setState({dob: 'dd/mm/yyyy date required'})
			this.setState({training_from: 'dd/mm/yyyy date required'})
		}
	},
	render() {
		return (
			<div>
        <table>
          <tbody>
            <td key={'first_name'}><input type="text" className="form-control" 
              placeholder="First name" value={this.state.first_name} onChange={this.handleFirstNameChange}/>
            </td>
          </tbody>
        </table>  
        <table>
          <tbody>
            <td key={'surname'}><input type="text" className="form-control" 
              placeholder="Surname" value={this.state.surname} onChange={this.handleSurnameChange} />
            </td>
          </tbody>
        </table>  
        <table>
          <tbody>
            <td key={'dob'}><input type="text" className="form-control" 
              placeholder="DOB" value={this.state.dob} onChange={this.handleDOBChange}/> 
            </td>
          </tbody>
        </table>  
        <table>
          <tbody>
            <td key={'training_from'}><input type="text" className="form-control" 
              placeholder="Training from" value={this.state.training_from} onChange={this.handleTrainingFromChange}/>
            </td>
          </tbody>
        </table>  
        <table>
          <input type="fluid button" className="btn btn-primary btn-block" value="Submit"
            onClick={this.handleUpdateProfile} />
        </table>
	  	</div>
		)
	}
});

export default EditProfileForm;