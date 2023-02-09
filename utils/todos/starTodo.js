const completeTodo = async (id, starStatus) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        starred: !starStatus,
      }),
    });
    return await response.json();
  };
  
  
  
  
  export default completeTodo;
  