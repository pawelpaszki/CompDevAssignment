
var GymProgressLogger = React.createClass({
	getInitialState: function() {
	    return { 
		 search: '', 
		 sort: 'dob',
		 data: [{text: '0', value: 0}],
		 users: []
		};
      },
	  componentDidMount(){
        this.getUsersFromServer('http://localhost:3000/users/');
     },
     //showResult Method
        showResult: function(response) {
            this.setState({
                users: response
            });
     },
    //making ajax call to get data from server
    getUsersFromServer:function(URL){
        $.ajax({
            type:"GET",
            dataType:"json",
            url:URL,
            success: function(response) {
                this.showResult(response);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
	  addTrainingSession: function(date) {
		api.addTrainingSession(date);
		this.setState({});
	  },
	  updateTrainingSession: function(key, date) {
		 api.updateTrainingSession(key, date);
		 this.setState({});
	  },
	  deleteTrainingSession: function(key) {
		  api.deleteTrainingSession(key);
		  this.setState({});
	  },
	  addNewExercise: function(name, group) {
		api.addExercise(name, group);
		this.setState({});
	  },
	  deleteExercise: function(key) {
		  api.deleteExercise(key);
		  this.setState( {} ) ;
	  },
	  updateExercise: function(name, group) {
		 api.updateExercise(name, group);
		 this.setState( {} ) ;
	  },
	  addNewMuscle: function(key) {
		api.addMuscle(key);
		this.setState({});
	  },
	  deleteMuscle: function(key) {
		  api.deleteMuscle(key);
		  this.setState( {} ) ;
	  },
	  updateMuscleName: function(name) {
		 api.updateMuscleName(name);
		 this.setState( {} ) ;
	  },
	  updateExerciseUnit: function(name, weight, number_of_series, number_of_reps) {
		  api.updateExerciseUnit(name, weight, number_of_series, number_of_reps); 
		this.setState( {} ) ;
	  },
	  addExerciseUnit: function(name, muscle_group) {
		  api.addExerciseUnit(name, muscle_group) ;
             this.setState({});
	  },
	  deleteExerciseUnit: function(key) {
		  api.deleteExerciseUnit(key);
		  this.setState( {} ) ;
	  },
	  deleteSession: function(sessionId) {
		api.deleteSession(sessionId);  
		this.setState( {} ) ;
	  },
	  updateProfile: function(key,f,s,d,t) {
		api.updateUser(key,f,s,d,t); 
		this.setState( {} ) ;
	  },
	  handleChange : function(type,value) {
        if ( type == 'search' ) {
            this.setState( { search: value } ) ;
          } else {
             this.setState( { sort: value } ) ;
          }
      }, 
	  addMuscleGroupSession(name) {
		  api.addMuscleGroupSession(name) ;
             this.setState({});
	  },
	  generateChartData: function(exercise, date_from, date_to) {
		  console.log(exercise);
		  console.log(date_from);
		  console.log(date_to);
		  var dateFromComponents = date_from.split("/");
		  var dateFrom = new Date(dateFromComponents[2], dateFromComponents[1] -1, dateFromComponents[0]);
		  console.log(dateFrom);
		  var dateToComponents = date_to.split("/");
		  var dateTo = new Date(dateToComponents[2], dateToComponents[1] -1, dateToComponents[0]);
		  console.log(dateTo);
		  var users = api.getAllUsers();
		  var user = users[0]; // parameterise later
		  var trainingSessions = user.training_sessions;
	      var trainingDays = _.pluck(trainingSessions, 'date');
		  var daysTakenIntoAccount = [];
		  var tempDate;
		  var tempDateComponents;
		  var data = [];
		  for (var i = 0; i < trainingDays.length; i++) {
			  tempDateComponents = trainingDays[i].split("/");
		      tempDate = new Date(tempDateComponents[2], tempDateComponents[1] - 1, tempDateComponents[0]);
			  if (tempDate >= dateFrom && tempDate <= dateTo) {
				  daysTakenIntoAccount.push(trainingDays[i]);
			  }
		  }
		  console.log(trainingSessions);
		  var dataRows = "const data = [\r\n";
		  var muscleGroupSessions;
		  var exercises;
		  var dataRow;
		  for (var a = 0; a < trainingSessions.length; a++) {
			  muscleGroupSessions = trainingSessions[a].muscle_group_sessions;
			  if (daysTakenIntoAccount.indexOf(trainingSessions[a].date) !== -1) {
			      for(var b = 0; b < muscleGroupSessions.length; b++) {
					  exercises = muscleGroupSessions[b].exercises;
					  for(var c = 0; c < exercises.length; c++) {
						  if(exercises[c].name === exercise) {
							  data.push({'text': trainingSessions[a].date.substring(0,5), 'value': exercises[c].weight}); 
						  }
					  }
				  }
			  }
		  }
		  this.setState ({data})
	  },
  render: function(){
	   var users = this.state.users;
	   console.log(users);
	   var muscleConstants = api.getAllMuscleConstants();
	   var exerciseConstants = api.getAllExerciseConstants();
	   var testUser = users[0];
	   var userList = users.filter(function(p) {
		   var name = p.first_name + ' ' + p.surname;
                  return name.toLowerCase().search(
                      this.state.search.toLowerCase() ) != -1 ;
                    }.bind(this) );
            var filteredList = _.sortBy(userList, this.state.sort) ;
	   
	  var exercises = api.getAllExercises();
	  var muscles = api.getAllMuscles();
	  var exerciseUnits = api.getAllExerciseUnits();
	  var exerciseUnitMuscleGroup = "back"; ///parameterise later!!!!!!
	  var muscleSessions = api.getAllMuscleSessions();
	  var trainingSessions = api.getAllTrainingSessions();
	  return (
	  <div>
	  

		<SearchBox onUserInput={this.handleChange } 
							   filterText={this.state.search} 
							   sort={this.state.sort}/>
		<FilteredUsersList users={userList}/>
		
		{/*<ExerciseInfo/>*/}
		{/*<UserInfo />*/}
		{/*<MonthPicker/>*/}
		
		
		{/*<ChartDataPicker/>*/}
		{/*<SelectableDay users={users}/>*/}
			{/*<ExerciseNamePick exercises={exercises} generateChartHandler={this.generateChartData}/>*/}
			{/*<MuscleGroupSessionList  msessions={muscleSessions} deleteSessionItemHandler={this.deleteSession} addMuscleGroupSessionHandler={this.addMuscleGroupSession}/>*/}
			{/*<ExerciseUnitList exerciseUnits={exerciseUnits} exercises={exercises} deleteExerciseUnitHandler={this.deleteExerciseUnit} 
			addExerciseUnitHandler={this.addExerciseUnit} exerciseUnitMuscleGroup={exerciseUnitMuscleGroup} 
			updateExerciseUnitHandler={this.updateExerciseUnit}/>*/}

		{/*<Chart data={this.state.data}/>*/}
			{/*<EditProfileForm key={testUser.id} user={testUser} profileUpdateHandler={this.updateProfile}/>*/}
				{/*<TrainingSessionsList trainingSessions={trainingSessions} deleteTrainingSessionHandler={this.deleteTrainingSession}
				updateTrainingSessionHandler={this.updateTrainingSession} addTrainingSessionHandler={this.addTrainingSession}/>*/}
		{/*<MuscleList muscles={muscles} muscleConstants={muscleConstants} updateMuscleNameHandler={this.updateMuscleName} 
		deleteMuscleHandler={this.deleteMuscle} addMuscleHandler={this.addNewMuscle}/>*/}
		{/*<ExerciseList exercises={exercises} exerciseConstants={exerciseConstants} updateExerciseHandler={this.updateExercise} 
		deleteExerciseHandler={this.deleteExercise} addExerciseHandler={this.addNewExercise} muscles={muscles}/>*/}
		  
		  </div>
	  );
  }
});

