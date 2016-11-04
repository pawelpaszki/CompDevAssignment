import React from 'react';
import './App.css';
import api from './test/stubAPI';

var MuscleList = React.createClass({
	render: function() {
		var displayedMuscles = this.props.muscles.map((muscle) =>{
			return <Muscle key={muscle.name} muscle={muscle} muscleConstants={this.props.muscleConstants} 
			updateMuscleNameHandler={this.props.updateMuscleNameHandler} deleteMuscleHandler={this.props.deleteMuscleHandler}/>;
		}) ;
		return (
			<div className="main-content-without-search-box">
			  <ul className="listItems">
				  {displayedMuscles}
			  </ul>
			  <AddMuscleForm addMuscleHandler={this.props.addMuscleHandler} muscles={this.props.muscles}/>
			</div>
		  ) ;
	}
});

var Muscle = React.createClass({
	getInitialState : function() {
		 return {
			 status: '',
		  name: this.props.muscle.name,
		  initName: this.props.muscle.name
		} ;
	  },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		var muscleConstants = _.pluck(this.props.muscleConstants, 'name');
		var name = this.state.name;
		//console.log(muscleConstants);
		//console.log(muscleConstants.indexOf(name));
		//console.log(name);
		if (muscleConstants.indexOf(name) == -1) {
	       this.props.deleteMuscleHandler(this.state.name);
		};
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	handleUpdate: function(e) {
	   e.preventDefault();
	   var name = this.state.name;
	   console.log(this.state.initName);
	   var muscleConstants = _.pluck(this.props.muscleConstants, 'name');
	   console.log(muscleConstants.indexOf(this.state.initName));
	   if ((muscleConstants.indexOf(this.state.initName)) === -1) {
	       this.props.updateMuscleNameHandler(this.state.name);
	   } else {
		   this.setState({ name : this.state.initName});
	   }
	   this.setState({ status : ''} )
	},
	render: function() {
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
					<td className="col-md-2"></td>
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
		);
	}
});

var AddMuscleForm = React.createClass({
	getInitialState: function() {
        return { 
			name: ''
		};
    },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
    },
	handleSubmit: function(e) {
		var muscles = _.pluck(this.props.muscles, 'name');
		e.preventDefault();
		var name = this.state.name;
		if (!name || muscles.indexOf(name) != -1) {
			this.setState({name: ''});
            return;
        }
        this.props.addMuscleHandler(name);
        this.setState({name: ''});
	},
	render: function() {
		return (
		
			<div className="left-within-main">
				<table className="table table-borderless">
				<tbody>
				  <tr>
					  
				<td className="col-md-4"><input type="text" className="form-control"
                     placeholder="Add new muscle"
                     value={this.state.name}
                     onChange={this.handleNameChange} /></td>
				<td className="col-md-3"><input type="button" className="btn btn-primary" value="Add muscle"
							   onClick={this.handleSubmit} /> </td>
							   <td className="col-md-1"></td>
				<td className="col-md-4"> </td>
				  </tr>
				</tbody>
			  </table>
			
			</div>
		) ;
	}
});

export default MuscleList;