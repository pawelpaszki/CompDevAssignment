Component Development Assignment 1
====================

Prerequisites
====================

Npm has to be installed

This application is a project done as an assignment for Component Development. It was created using 

```
create-react-app
```

Initial version was using hardcoded stubAPI. Current version uses mock [json-server](https://github.com/typicode/json-server) and [jquery](https://github.com/jquery/jquery)
to handle requests and provide persistence. and is integrated with [Auth0] (https://auth0.com/) Login sample. 


## Installation
To run this application following steps are required:

After cloning / downloading zip:
```
npm install
```
```
npm install jquery
```
```
npm install -g json-server
```
```
npm install --save react-bar-chart
```

It is also mandatory to have **.env** file in the root directory, which is needed to deal with Auth0 authentication features
                                  
## Running the app
Starting mock server on port 3001:
```
json-server db.json --port 3001
```
Starting the app itself:
```
npm start
```
## Features
Authentication is required to see the content of the application:

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/login.jpg)
![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/login2.jpg)

Home screen displays list of users, who can be deleted. Their performance can be graphically displayed by 
pressing charts button. After pressing User's name - his/her list of training sessions is displayed

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/home.jpg)

Each user's details can be edited. To display user's image, url to online picture must be provided

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/homeEdit.jpg)

Training sessions can be deleted

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/trainingSessions.jpg)

 Training sessions can also be edited (date can be edited from here. more specific details from subsequent views)
 
![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/trainingSessionsEdit.jpg)

 For each of training sessions list of muscle group sessions is displayed (if any). It is only possible to enter existing
 muscle group to create new session. Each muscle group session can also be deleted
 
![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/muscleGroupSessions.jpg)

Exercise units can be added by pressing button representing exercise, which is available to add for the muscle group.

By default, when adding new exercise, weight, reps and series will be set to 0, which can be edited once an exercise is added

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/exerciseUnitList.jpg)

When Button "Muscles & Exercises" is pressed - list of all muscle groups is shown. In general muscle groups can be added
and removed / edited. The only exception is, that predefined 7 muscle groups shown below, can't be edited or removed

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/muscleList.jpg)

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/muscleListEdit.jpg)

When link representing muscle group is pressed, all exercises available for the muscle group are displayed

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/exerciseList.jpg)

The same rule applies for exercises - new ones can be added

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/exerciseListAdd.jpg)

But there are predefined exercises, which cannot be removed or edited

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/exerciseListEdit.jpg)

Once button representing exercise name is presses - exercise details are displayed. This is the static view. In order 
to make changes to not predefined exercise, it has to be removed and then added again. Predefined exercises are not editable 
in any sense. Reason behind this is that it certain list of muscles and exercises has to be available all the time

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/exerciseInfo.jpg)

Charts generation for each user (providing that any sessions for him/her are recorded) is available. 

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/chartsEmpty.jpg)

[autosuggest](https://github.com/moroshko/react-autosuggest) is used to display available exercises.

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/chartsAuto.jpg)

Date validation is provided, so only valid date format (dd/mm/yyyy) will allow to generate data for the chart.

Date validation was taken from [here](http://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript
)

Chart component used in the app is available [here](https://www.npmjs.com/package/react-bar-chart)

![alt tag](https://github.com/pawelpaszki/CompDevAssignment/blob/master/assets/readmeImages/chartGenerated.jpg)
