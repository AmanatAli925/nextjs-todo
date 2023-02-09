import getActivities from "../../utils/todos/getActivities";
import moment from 'moment'


import React from "react";

export default function Activities() {
    
    const [activities, setActivities] = React.useState([]);
    React.useEffect(() => {
     getActivities().then(function(res_activties){
        console.log(res_activties)
        setActivities(res_activties)
      });
    },[]);

    return(
        <div className="activity-logs">
        <div className="header"><img src="/todo-icon.png"/><h1>Activity Logs</h1><a href="/todos">Todo List</a></div>

        {
            activities.map(function(activity){
                return(
                    <div className="log-item" id={`activity-log-list-item_${activity.todo_id}`}>

                        <div className="log-item-head">
                            <h3 id={`activity-log-list-item__title_${activity.todo_id}`}>"{activity.title}"</h3>
                            <p id={`activity-log-list-item__date-time_${activity.todo_id}`}>{
                                moment(new Date(activity.changeTime))
                                    .format("MMMM D, h:mm a")
                            }</p>
                        </div>
                        {
                            function(){
                                if(activity.changeType=='title')
                                    return(
                                        <p className="log-item-details">
                                            Changed <span id={`activity-log-list-item__change-type_${activity.todo_id}`}>
                                                        {activity.changeType}
                                                    </span> from "<span id={`activity-log-list-item__old-value_${activity.todo_id}`}>
                                                        {activity.oldValue}
                                                    </span>"" to "<span id={`activity-log-list-item__new-value_${activity.todo_id}`}>
                                                        {activity.newValue}
                                                    </span>"
                                        </p>
                                    )
                                else
                                    return(
                                        <p className="log-item-details">
                                            Changed <span id={`activity-log-list-item__change-type_${activity.todo_id}`}>
                                                        {activity.changeType}
                                                    </span> from "<span id={`activity-log-list-item__old-value_${activity.todo_id}`}>{
                                                        moment(new Date(activity.oldValue)).format("MMMM D, h:mm a")
                                                    }</span>" to "<span id={`activity-log-list-item__new-value_${activity.todo_id}`}>{
                                                        moment(new Date(activity.newValue)).format("MMMM D, h:mm a")
                                                    }</span>"
                                        </p>
                                    )   
                            }()
                        }
                    </div>
                )
            })

        }
        </div>
    )
}  




