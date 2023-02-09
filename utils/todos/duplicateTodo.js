const duplicateTodo= async function(todo){

    let response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
      });
      
    return  await response.json()  
}


export default duplicateTodo;