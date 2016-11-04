import React from 'react';
import './App.css';
import api from './test/stubAPI';

var ExerciseList = React.createClass({
	render: function() {
		var Exercises = this.props.exercises.map((exercise) =>{
			return <Exercise key={exercise.name} exercise={exercise} deleteExerciseHandler={this.props.deleteExerciseHandler}
			updateExerciseHandler={this.props.updateExerciseHandler} exerciseConstants={this.props.exerciseConstants} muscles={this.props.muscles} />;
		}) ;
		return (
		<div className="main-content-without-search-box">
			<div className="main-content">
			  <ul className="listItems">
				  {Exercises}
			  </ul>
			  <AddExerciseForm exercises={this.props.exercises} muscles={this.props.muscles} 
			  addExerciseHandler={this.props.addExerciseHandler}/>
			</div>
		</div>
		);
	}
});

var Exercise = React.createClass({
	getInitialState : function() {
		 return {
			 status: '',
		  name: this.props.exercise.name,
		  group: this.props.exercise.group,
		  initName: this.props.exercise.name,
		  initGroup: this.props.exercise.group,
		} ;
	  },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
	},
	handleGroupChange: function(e) {
	   this.setState({group: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		var exerciseConstants = _.pluck(this.props.exerciseConstants, 'name');
		var name = this.state.name;
		var group = this.state.group;
		console.log(exerciseConstants);
		console.log(exerciseConstants.indexOf(name));
		console.log(name);
		if (exerciseConstants.indexOf(name) == -1) {
	       this.props.deleteExerciseHandler(name, group);
		};
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	handleUpdate: function(e) {
	   e.preventDefault();
	   var name = this.state.name;
	   var group = this.state.group;
	   var muscles = _.pluck(this.props.muscles, 'name');
	   console.log(this.state.initName);
	   var exerciseConstants = _.pluck(this.props.exerciseConstants, 'name');
	   console.log(exerciseConstants.indexOf(this.state.initName));
	   if ((exerciseConstants.indexOf(this.state.initName)) === -1 && (muscles.indexOf(group)) !== -1) {
	       this.props.updateExerciseHandler(name, group);
		   this.setState({ name : this.state.name});
		   this.setState({ group : this.state.group});
		   console.log(this.state.name);
		   console.log(this.state.group);
	   } else {
		   this.setState({ name : this.state.initName});
		   this.setState({ group : this.state.initGroup});
	   }
	   this.setState({ status : ''} )
	},
	render:function(){
		var updateHandler = this.handleUpdate;
		var editHandler = this.handleEdit;
		var deleteHandler = this.handleDelete;
		var itemsToRender;
		if(this.state.status == '') {
			itemsToRender = [
			<table className="table table-borderless">
				<tbody>
				  <tr>
					<td key={'name'} className="col-md-6"><a href={"/sessions/" + this.state.name}>{this.state.name} </a></td>
					<td className="col-md-2"><input type="button"  className="btn btn-primary btn-block" value="edit" onClick={editHandler}/></td>
					<td className="col-md-2"><input type="button"  className="btn btn-warning btn-block" value="delete" onClick={deleteHandler}/></td>
					<td className="col-md-2"></td>
				  </tr>
				</tbody>
			</table>
			];
		} else {
			itemsToRender = [
			<table className="table table-borderless">
				<tbody className="center">
				  <tr>
					<td key={'name'} className="col-md-4"><input type="text" className="form-control"  value={this.state.name} onChange={this.handleNameChange}/></td>
					<td key={'group'} className="col-md-4"><input type="text" className="form-control"  value={this.state.group} onChange={this.handleGroupChange}/></td>
					<td className="col-md-2"><input type="button" className="btn btn-success btn-block" value="confirm" onClick={updateHandler}/></td>
					<td className="col-md-2"></td>
				  </tr>
				</tbody>
			</table>
			];
		};
		return (
			 <li className="left-within-main">
				{itemsToRender}
			 </li>
			 )
	}
});

var AddExerciseForm = React.createClass({
    getInitialState: function() {
        return { 
			name: '',
			group: ''
		};
    },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
    },
	handleGroupChange: function(e) {
	   this.setState({group: e.target.value});
    },
	handleSubmit: function(e) {
		e.preventDefault();
		//console.log(this.props.muscles);
		var muscles = _.pluck(this.props.muscles, 'name');
		var exercises = _.pluck(this.props.exercises, 'name');
		var name = this.state.name;
		var group = this.state.group;
		//console.log(muscles);
		//console.log(exercises);
		//console.log(name);
		//console.log(group);
		if (!name || !group || muscles.indexOf(group) == -1 || exercises.indexOf(name) != -1) {
			this.setState({name: ''});
			this.setState({group: ''});
            return;
        }
        this.props.addExerciseHandler(name, group);
        this.setState({name: '', group: ''});
	},
	render: function() {
		return (
		
			<div className="left-within-main">
				<table className="table table-borderless">
				<tbody>
				  <tr>
					  
				<td className="col-md-4"><input type="text" className="form-control"
                     placeholder="Exercise name"
                     value={this.state.name}
                     onChange={this.handleNameChange} /></td>
				<td className="col-md-4"> <input type="text" className="form-control"
                     placeholder="Exercise group"
                     value={this.state.group}
                     onChange={this.handleGroupChange} /></td>
				<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add exercise"
							   onClick={this.handleSubmit} /> </td>
							   <td className="col-md-1"></td>
				
				  </tr>
				</tbody>
			  </table>
			
			</div>
		) ;
	}
});


export default ExerciseList;