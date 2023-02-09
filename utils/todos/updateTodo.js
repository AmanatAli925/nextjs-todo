const updateTodo = async (id, title, dueDate) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        dueDate
      }),
    });
    return await response.json();
};
  
  
  
  
export default updateTodo;
  