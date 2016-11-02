import _ from 'lodash';

var users =  [ 
      {
         "id":1,
         "first_name":"Mitch",
         "surname":"Hitt",
         "picture":"assets/users/1.jpg",
         "dob":"12/05/1986",
         "training_from":"05/12/1986",
         "training_sessions":[
            {
               "main_session_id":1,
               "date":"04/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":1,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":110,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":2,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":20,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":3,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":200,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":250,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":2,
               "date":"06/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":4,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":140,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":5,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":6,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":200,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":250,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":3,
               "date":"08/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":7,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":180,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":80,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":8,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":30,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":4,
               "date":"11/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":9,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":112,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":10,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":20,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":11,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":200,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":250,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":5,
               "date":"13/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":12,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":140,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":13,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":14,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":200,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":250,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":6,
               "date":"15/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":15,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":180,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":80,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":16,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":30,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":7,
               "date":"18/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":17,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":114,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":102,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":18,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":20,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":19,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":200,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":250,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":8,
               "date":"20/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":20,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":140,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":21,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":22,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":200,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":250,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":9,
               "date":"22/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":23,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":180,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":80,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":24,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":32,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":10,
               "date":"25/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":25,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":114,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":102,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":26,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":62,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":22,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":27,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":200,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":250,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":11,
               "date":"27/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":28,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":140,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":29,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":30,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":12,
               "date":"29/07/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":31,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":180,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":80,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":32,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":32,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":13,
               "date":"01/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":33,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":116,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":84,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":104,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":34,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":62,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":22,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":35,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":14,
               "date":"03/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":36,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":37,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":38,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":15,
               "date":"05/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":39,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":185,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":40,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":32,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":16,
               "date":"08/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":41,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":116,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":104,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":42,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":64,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":22,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":25,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":43,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":17,
               "date":"10/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":44,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":45,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":46,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":18,
               "date":"12/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":47,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":185,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":48,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":32,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":19,
               "date":"15/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":49,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":116,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":84,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":102,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":50,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":64,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":25,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":51,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":20,
               "date":"17/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":52,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":53,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":82,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":54,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":21,
               "date":"19/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":55,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":56,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":55,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":34,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":22,
               "date":"22/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":57,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":120,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":86,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":106,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":58,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":66,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":26,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":59,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":23,
               "date":"24/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":60,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":61,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":62,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":24,
               "date":"26/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":63,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":64,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":55,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":34,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":25,
               "date":"29/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":65,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":120,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":88,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":106,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":66,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":67,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":25,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":28,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":67,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":220,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":26,
               "date":"31/08/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":68,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":69,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":70,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":27,
               "date":"02/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":71,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":72,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":55,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":50,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":34,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":28,
               "date":"05/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":73,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":122,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":89,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":108,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":74,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":68,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":25,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":28,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":75,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":29,
               "date":"07/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":76,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":77,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":78,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":30,
               "date":"09/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":79,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":80,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":58,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":60,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":36,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":31,
               "date":"12/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":81,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":122,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":108,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":82,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":68,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":25,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":28,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":83,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":32,
               "date":"14/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":84,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":85,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":86,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":33,
               "date":"16/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":87,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":88,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":58,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":60,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":36,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":34,
               "date":"19/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":89,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":124,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":92,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":110,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":90,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":70,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":26,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":28,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":91,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":35,
               "date":"21/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":92,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":93,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":88,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":94,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":36,
               "date":"23/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":95,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":96,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":58,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":60,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":36,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":37,
               "date":"26/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":97,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":125,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":95,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":109,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":98,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":70,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":26,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":28,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":99,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":38,
               "date":"28/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":100,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":320,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":101,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":88,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":102,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":39,
               "date":"30/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":103,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":104,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":70,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":36,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":40,
               "date":"03/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":105,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":126,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":96,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":112,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":106,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":67,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":26,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":107,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":41,
               "date":"05/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":108,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":160,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":340,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":109,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":88,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":110,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":42,
               "date":"07/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":111,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":112,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":70,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":36,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":43,
               "date":"10/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":113,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":127,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":94,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":110,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":114,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":67,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"concentration curls",
                           "weight":24,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":26,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":115,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":44,
               "date":"12/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":116,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":160,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"leg press",
                           "weight":340,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg extensions",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":10
                        },
                        {
                           "name":"lying leg curls",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":117,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":88,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"power partials",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":118,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":210,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":260,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":45,
               "date":"14/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":119,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":190,
                           "number_of_series":4,
                           "number_of_reps":5
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":90,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":15
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":120,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":50,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":70,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":36,
                           "number_of_series":4,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            }
         ]
      },
      {
         "id":2,
         "first_name":"Tyree",
         "surname":"Layman",
         "dob":"12/11/1989",
         "picture":"assets/users/2.jpg",
         "training_from":"14/07/2008",
         "training_sessions":[
            {
               "main_session_id":46,
               "date":"26/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":121,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":122,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":35,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"concentration curls",
                           "weight":12,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":123,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":100,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":47,
               "date":"28/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":124,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":100,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg press",
                           "weight":150,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"leg extensions",
                           "weight":40,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"lying leg curls",
                           "weight":30,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":125,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":45,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"power partials",
                           "weight":10,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":126,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":100,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":48,
               "date":"30/09/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":127,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":70,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":128,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":40,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":40,
                           "number_of_series":3,
                           "number_of_reps":15
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":40,
                           "number_of_series":4,
                           "number_of_reps":10
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":49,
               "date":"03/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":129,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":85,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":130,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":35,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"concentration curls",
                           "weight":12,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":131,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":100,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":50,
               "date":"05/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":132,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":90,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg press",
                           "weight":160,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"leg extensions",
                           "weight":40,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"lying leg curls",
                           "weight":30,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":133,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":45,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"power partials",
                           "weight":10,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":134,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":100,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":51,
               "date":"07/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":135,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":70,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":136,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":40,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":40,
                           "number_of_series":3,
                           "number_of_reps":15
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":40,
                           "number_of_series":4,
                           "number_of_reps":10
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":52,
               "date":"10/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":137,
                     "name":"chest",
                     "exercises":[
                        {
                           "name":"barbell flat bench press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell incline bench press",
                           "weight":60,
                           "number_of_series":4,
                           "number_of_reps":8
                        },
                        {
                           "name":"barbell decline bench press",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":8
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":138,
                     "name":"biceps",
                     "exercises":[
                        {
                           "name":"barbell curl",
                           "weight":35,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"concentration curls",
                           "weight":12,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"alternate hammer curl",
                           "weight":16,
                           "number_of_series":3,
                           "number_of_reps":10
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":139,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":100,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":53,
               "date":"12/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":140,
                     "name":"leg",
                     "exercises":[
                        {
                           "name":"barbell full squat",
                           "weight":95,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"leg press",
                           "weight":170,
                           "number_of_series":4,
                           "number_of_reps":15
                        },
                        {
                           "name":"leg extensions",
                           "weight":40,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"lying leg curls",
                           "weight":30,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":141,
                     "name":"shoulders",
                     "exercises":[
                        {
                           "name":"standing military press",
                           "weight":45,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"power partials",
                           "weight":10,
                           "number_of_series":3,
                           "number_of_reps":12
                        },
                        {
                           "name":"front dumbbell raise",
                           "weight":14,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":142,
                     "name":"calf",
                     "exercises":[
                        {
                           "name":"standing calf raise",
                           "weight":80,
                           "number_of_series":4,
                           "number_of_reps":20
                        },
                        {
                           "name":"sitting calf raise",
                           "weight":100,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  }
               ]
            },
            {
               "main_session_id":54,
               "date":"14/10/2016",
               "muscle_group_sessions":[
                  {
                     "muscle_group_session_id":143,
                     "name":"back",
                     "exercises":[
                        {
                           "name":"deadlift",
                           "weight":100,
                           "number_of_series":4,
                           "number_of_reps":6
                        },
                        {
                           "name":"reverse grip bent-over rows",
                           "weight":70,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"t-bar row",
                           "weight":85,
                           "number_of_series":3,
                           "number_of_reps":12
                        }
                     ]
                  },
                  {
                     "muscle_group_session_id":144,
                     "name":"triceps",
                     "exercises":[
                        {
                           "name":"cable two arms extensions",
                           "weight":40,
                           "number_of_series":4,
                           "number_of_reps":12
                        },
                        {
                           "name":"weighted bench dip",
                           "weight":40,
                           "number_of_series":3,
                           "number_of_reps":15
                        },
                        {
                           "name":"reverse grip triceps pushdown",
                           "weight":40,
                           "number_of_series":4,
                           "number_of_reps":10
                        }
                     ]
                  }
               ]
            }
         ]
      },
	{
		"id": 3,
		"first_name": "Gus",
		"surname": "Hathaway",
		"dob":"30/11/1978",
		"picture": "assets/users/3.jpg",
		"training_from":"21/01/1992"
	},
	{
		"id":4,
		"first_name": "Alphonse",
		"surname": "Wetzel",
		"dob": "25/03/1983",
		"picture": "assets/users/4.jpg",
		"training_from": "19/12/1999"
	},
	{
		"id":5,
		"first_name": "Darell",
		"surname": "Kent",
		"dob": "10/09/1998",
		"picture": "assets/users/5.jpg",
		"training_from": "12/09/2014"
	}
]; 

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

 var muscles=[
	{
	   "name":"chest",
	},
	{
	   "name":"biceps",
	},
	{
	   "name":"calf",
	},
	{
	   "name":"triceps",
	},
	{
	   "name":"leg",
	},
	{
	   "name":"shoulders",
	},
	{
	   "name":"back",
	}
 ];
 
 var exerciseUnits=[
	{
	   "name":"deadlift",
	   "weight":180,
	   "number_of_series":4,
	   "number_of_reps":5
	},
	{
	   "name":"reverse grip bent-over rows",
	   "weight":100,
	   "number_of_series":4,
	   "number_of_reps":12
	},
	{
	   "name":"t-bar row",
	   "weight":80,
	   "number_of_series":3,
	   "number_of_reps":15
	}
 ];
 
 var muscleSessions=[
{
	 "id":1,
	 "name":"chest",
	 "exercises":[
		{
		   "name":"barbell flat bench press",
		   "weight":110,
		   "number_of_series":4,
		   "number_of_reps":8
		},
		{
		   "name":"barbell incline bench press",
		   "weight":80,
		   "number_of_series":4,
		   "number_of_reps":8
		},
		{
		   "name":"barbell decline bench press",
		   "weight":100,
		   "number_of_series":4,
		   "number_of_reps":8
		}
	 ]
  },
  {
	 "id":2,
	 "name":"biceps",
	 "exercises":[
		{
		   "name":"barbell curl",
		   "weight":60,
		   "number_of_series":4,
		   "number_of_reps":6
		},
		{
		   "name":"concentration curls",
		   "weight":20,
		   "number_of_series":3,
		   "number_of_reps":12
		},
		{
		   "name":"alternate hammer curl",
		   "weight":24,
		   "number_of_series":3,
		   "number_of_reps":10
		}
	 ]
  },
  {
	 "id":3,
	 "name":"calf",
	 "exercises":[
		{
		   "name":"standing calf raise",
		   "weight":200,
		   "number_of_series":4,
		   "number_of_reps":15
		},
		{
		   "name":"sitting calf raise",
		   "weight":250,
		   "number_of_series":3,
		   "number_of_reps":12
		}
	 ]
  }
  ];
 
var stubAPI = {
	 deleteUser : function(k) {
	   var elements = _.remove(users, 
		   function(user) {
				 return user.id === k;
			  });
	   return elements; 
	 },
	 getAllUsers : function() {
		 return users ;
	 },
	 getAllExercises : function() {
		return exercises; 
	 },
	 getAllMuscles : function() {
		return muscles; 
	 },
	 getAllExerciseUnits : function() {
		 return exerciseUnits;
	 },
	 getAllMuscleSessions : function() {
		 return muscleSessions;
	 },
	 addUser : function(f,s,d,t) {
	  var len = users.length ;
	  var newL_len = users.push({
		 first_name: f, surname : s, dob: d, training_from: t }) ;
	  return newL_len > len ;
	 },
	 updateUser : function(key,f,s,d,t) {
		var index = _.findIndex(users, function(user) {
			 return user.id === key;
		  } );      
		if (index !== -1) {
		   users.splice(index, 1, {first_name: f, surname : s, dob: d, training_from: t});
		   return true ;
		  }
	  return false ;
	 }
  }

  export default stubAPI ;