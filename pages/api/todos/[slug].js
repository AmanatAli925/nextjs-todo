import Todo from "../../../db/models/Todo";
import Activity from "../../../db/models/Activity";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    const { slug } = req.query;
    const todo = await Todo.findByPk(slug);
    await todo.destroy();
    res.status(204).end();
  }
  if (req.method === "PATCH") {
    const { slug } = req.query;
    const {       
      title,
      createdAt,
      dueDate,
      completed,
      starred
     } = req.body;
    
    const todo = await Todo.findByPk(slug);
    console.log(todo)
    const activity={ }
    if(title && title!=todo.title){
      activity.todo_id= todo.id;
      activity.title= todo.title;
      activity.changeType="title"
      activity.changeTime=(new Date()).toISOString()
      activity.oldValue= todo.title
      activity.newValue=title;
      await Activity.create(activity)

    }

    if(dueDate && dueDate!=todo.dueDate.toISOString()){
      activity.todo_id= todo.id;
      activity.title= todo.title;
      activity.changeType="due date"
      activity.changeTime=(new Date()).toISOString()
      activity.oldValue= todo.dueDate.toISOString()
      activity.newValue=dueDate;
      await Activity.create(activity)

    }




    todo.title= title || todo.title,
    todo.createdAt= createdAt || todo.createdAt,
    todo.dueDate= dueDate || todo.dueDate,
    todo.completed=  completed===undefined ? todo.completed: completed
    todo.starred=  starred===undefined ? todo.starred: starred;
    
    await todo.save();
    res.status(200).json(todo);
  }
}
