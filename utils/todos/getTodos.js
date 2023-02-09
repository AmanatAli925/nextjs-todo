const getTodos = async (page, search, sort) => {
  console.log('sort is set to ', sort)
  let  response = await fetch("/api/todos?page="+page+"&search="+search+"&sort="+sort);
    response= await response.json()
    response.todos = response.todos.map(function(todo){
    if(todo.dueDate)
      todo.dueDate= new Date(todo.dueDate)
    
    return todo;
  })
  return response;
};

export default getTodos;
