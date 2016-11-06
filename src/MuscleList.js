import React from 'react';
import './App.css';
import api from './test/stubAPI';
import { Link } from 'react-router';
import $ from "jquery";

var Muscle = React.createClass({
	getInitialState : function() {
		 return {
			 status: '',
			 id: this.props.muscle.id,
		  name: this.props.muscle.name,
		  initName: this.props.muscle.name
		} ;
	  },
	handleNameChange: function(e) {
	   this.setState({name: e.target.value});
	},
	handleDelete: function(e) {
		e.preventDefault();
		var muscleConstants = this.props.muscleConstants;
		var name = this.state.name;
		//console.log(muscleConstants);
		//console.log(muscleConstants.indexOf(name));
		//console.log(name);
		if (muscleConstants.indexOf(name) == -1) {
	       this.props.deleteMuscleHandler(this.state.id);
		};
	},
	handleEdit: function(e) {
		this.setState({ status : 'edit'} )
	},
	handleUpdate: function(e) {
	   e.preventDefault();
	   var name = this.state.name;
	   console.log(this.state.initName);
	   var muscleConstants = this.props.muscleConstants;
	   console.log("constantssss:  " + muscleConstants);
	   console.log(muscleConstants.indexOf(this.state.initName));
	   if ((muscleConstants.indexOf(this.state.initName)) === -1) {
	       this.props.updateMuscleNameHandler(this.state.id, this.state.name);
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

var MuscleList = React.createClass({
	getInitialState: function() {
	    return {
		 allMuscles: [],
		 constants: [],
		};
      },
	  componentDidMount(){
		this.getAllMuscleGroups('http://localhost:3000/muscles/');
		this.getAllMuscleConstants('http://localhost:3000/constants/');
      },
	  populateMuscleConstants: function(response) {
		this.setState({
			constants: response
		});
	 },
	 getAllMuscleConstants:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.populateMuscleConstants(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	  populateMuscleGroups: function(response) {
		this.setState({
			allMuscles: response
		});
	 },
	 getAllMuscleGroups:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.populateMuscleGroups(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
      },
	  deleteMuscleGroup:function(id) {
		  $.ajax({
			url: 'http://localhost:3000/muscles/' + id,
			type: 'DELETE',
			contentType: 'application/json'
			});
			document.location.reload(true);
	  },
	  addMuscleGroup:function(name) {
		  var maxId= 0;
		  var allMuscles = this.state.allMuscles;
		  for (var i = 0; i < allMuscles.length; i++) {
			  if(allMuscles[i].id > maxId) {
				  maxId = allMuscles[i].id;
			  }
		  };
		  //console.log("name" + name);
		  var id = maxId + 1;
		  //console.log("id: " + id);
		   
		    $.ajax({
			url: 'http://localhost:3000/muscles',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
				name: name,
			}),
			dataType: 'json'
		});
		this.setState({});
		document.location.reload(true);
	  },
	  updateMuscle: function(id, name) {
		    $.ajax({
			url: 'http://localhost:3000/muscles/' + id,
			type: 'PUT',
			contentType: 'application/json',
			data: JSON.stringify({
				id: id,
				name: name,
			}),
			dataType: 'json'
		});
		document.location.reload(true);
	  },
	render: function() {
		var muscleConstants = [];
		console.log(this.state.constants);
		for(var i = 0; i < this.state.constants.length; i++) {
			console.log(this.state.constants[i].name);
			muscleConstants.push(this.state.constants[i].name);
		};
		console.log("constants: " + muscleConstants);
		var displayedMuscles = this.state.allMuscles.map((muscle) =>{
			return <Muscle key={muscle.name} muscle={muscle} muscleConstants={muscleConstants} 
			updateMuscleNameHandler={this.updateMuscle} deleteMuscleHandler={this.deleteMuscleGroup}/>;
		}) ;
		return (
			<div className="main-content-without-search-box">
			  <ul className="listItems">
				  {displayedMuscles}
			  </ul>
			  <AddMuscleForm addMuscleHandler={this.addMuscleGroup} muscles={this.state.allMuscles}/>
			</div>
		  ) ;
	}
});

export default MuscleList;