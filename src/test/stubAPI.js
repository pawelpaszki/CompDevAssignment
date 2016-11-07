import _ from 'lodash';

var exercises=[
	{
	   "name":"barbell flat bench press",
	   "group":"chest",
	   "picture": "assets/exercises/flatbench.jpg"
	},
	{
	   "name":"barbell incline bench press",
	   "group":"chest",
	   "picture": "assets/exercises/incline.jpg"
	},
	{
	   "name":"barbell decline bench press",
	   "group":"chest",
	   "picture": "assets/exercises/declinebench.jpg"
	},
	{
	   "name":"barbell curl",
	   "group":"biceps",
	   "picture": "assets/exercises/barbellcurl.jpg"
	},
	{
	   "name":"concentration curls",
	   "group":"biceps",
	   "picture": "assets/exercises/concentrationcurl.jpg"
	},
	{
	   "name":"alternate hammer curl",
	   "group":"biceps",
	   "picture": "assets/exercises/hammercurl.jpg"
	},
	{
	   "name":"standing calf raise",
	   "group":"calf",
	   "picture": "assets/exercises/standingcalfraise.jpg"
	},
	{
	   "name":"sitting calf raise",
	   "group":"calf",
	   "picture": "assets/exercises/sittingcalfraise.jpg"
	},
	{
	   "name":"barbell full squat",
	   "group":"leg",
	   "picture": "assets/exercises/barbellsquat.jpg"
	},
	{
	   "name":"leg press",
	   "group":"leg",
	   "picture": "assets/exercises/legpress.jpg"
	},
	{
	   "name":"leg extensions",
	   "group":"leg",
	   "picture": "assets/exercises/legextensions.jpg"
	},
	{
	   "name":"lying leg curls",
	   "group":"leg",
	   "picture": "assets/exercises/lyinglegcurls.jpg"
	},
	{
	   "name":"cable two arms extensions",
	   "group":"triceps",
	   "picture": "assets/exercises/cabletwoarmsextensions.jpg"
	},
	{
	   "name":"weighted bench dip",
	   "group":"triceps",
	   "picture": "assets/exercises/weightedbenchdips.jpg"
	},
	{
	   "name":"reverse grip triceps pushdown",
	   "group":"triceps",
	   "picture": "assets/exercises/reversepushdown.jpg"
	},
	{
	   "name":"standing military press",
	   "group":"shoulders",
	   "picture": "assets/exercises/militarypress.jpg"
	},
	{
	   "name":"power partials",
	   "group":"shoulders",
	   "picture": "assets/exercises/powerpartials.jpg"
	},
	{
	   "name":"front dumbbell raise",
	   "group":"shoulders",
	   "picture": "assets/exercises/frontraise.jpg"
	},
	{
	   "name":"deadlift",
	   "group":"back",
	   "picture": "assets/exercises/deadlift.jpg"
	},
	{
	   "name":"reverse grip bent-over rows",
	   "group":"back",
	   "picture": "assets/exercises/bentoverrows.jpg"
	},
	{
	   "name":"t-bar row",
	   "group":"back",
	   "picture": "assets/exercises/tbarrows.jpg"
	}
];
 
var stubAPI = {
	 getAllExercises : function() {
		return exercises; 
	 },
  }
export default stubAPI ;