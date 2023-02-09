import React from "react";

const CreateTodo = (props) => {
  const [title, setTitle] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  
  const [showForm, setShowForm]= React.useState(0)
  const {
    todos, 
    setTodos,
    per_page,
    setSort,
    setTotalPages,
    setPage
  }= props.data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueDate
      }),
    });
    
    response= await response.json()
    const {total_pages,todo} = response;
    setShowForm(0)    // close create form
    
    setTotalPages(total_pages)
    setPage(1);
    if(todo.dueDate)
      todo.dueDate= new Date(todo.dueDate)
    setTodos([todo, ...todos].slice(0, per_page))
  
  };
  if(showForm)
    return (
      <div>
        <form onSubmit={handleSubmit} className="create-todo-form">
          <img src="/short-text.svg" width="20" height="20"></img>
          <div   className="main-form">
            <div className="input-fields">
              <input
                className="title-input"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder= "Enter the title"
                required
              />
              
              <input
                  id={`new-todo-due-date-picker`} 
                  type="date"
                  name="dueDate" 
                  min={(new Date()).toISOString().split('T')[0]}
                  onChange={(e) => setDueDate(e.target.value)}
              />
                
              
            </div>
          </div>
          <div className="form-btns">
              <button  onClick={()=>setShowForm(0)}>
                <img src="/red-cross.svg"></img>
              </button>
              <button type="submit">
                <img src="/green-tick.svg"></img>
              </button>
          </div>
        </form>
      </div>
    );
  else
      return(
        <div className="create-todo-btn" onClick={()=>setShowForm(1)}>
            <img src="/create.svg"></img>
            <p>Create Todo</p>
        </div>
      )
};

export default CreateTodo;
