import React from "react";
import updateTodo from "../../utils/todos/updateTodo";

const UpdateTodo = (props) => {
  const {setTodos, setEdit, todos, todo}= props.data;
  
  const [title, setTitle] = React.useState(todo.title);
  const [dueDate, setDueDate] = React.useState(todo.dueDate);
  
  const handleSubmit = async (e) => {
    let id=e.target.elements['id'].value
    e.preventDefault();

    const updatedTodo = await updateTodo(id, title, dueDate );
    setEdit(-1)
    setTodos(todos.map((td) => (td.id === todo.id ? updatedTodo : td)));
    
};

  
    return (
      <div>
        <form onSubmit={handleSubmit} className="update-todo-form">
          <img src="/bullet.svg" width="20" height="20"></img>
          <input type="number" name="id" value={todo.id} hidden readOnly/>
          <div   className="main-form">
            <div className="input-fields">
              <input
                id={`todo-edit-title-text-field__${todo.id}`}
                className="title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder= "Enter the title"
                required
              />
              
              <input 
                  id={`todo-edit-due-date-picker__${todo.id}`}
                  type="date"
                  name="dueDate" 
                  value={dueDate.toISOString().split('T')[0]}
                  min={(new Date()).toISOString().split('T')[0]}
                  onChange={(e) => setDueDate(e.target.value)}
                  required
              />
                
              
            </div>
          </div>
          <div className="form-btns">
              <button onClick={()=> setEdit(-1)}>
                <img src="/red-cross.svg"></img>
              </button>
              <button type="submit">
                <img src="/green-tick.svg"></img>
              </button>
          </div>
        </form>
      </div>
    );
 
};

export default UpdateTodo;
