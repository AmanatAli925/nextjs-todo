import React from "react";
import CreateTodo from "../../components/Todos/CreateTodo";
import UpdateTodo from "../../components/Todos/UpdateTodo";
import getTodos from "../../utils/todos/getTodos";
import deleteTodo from "../../utils/todos/deleteTodo";
import completeTodo from "../../utils/todos/completeTodo";
import starTodo from "../../utils/todos/starTodo";
import moment from 'moment'
import duplicateTodo from "../../utils/todos/duplicateTodo";

export default function Todos() {
  
  const [todos, setTodos] = React.useState([]);
  const [edit, setEdit] = React.useState(-1);
  const [page, setPage] = React.useState(1);
  const [search, setSearch ]= React.useState("")
  const [sort, setSort ]= React.useState('')
  const [totalPages, setTotalPages]= React.useState(1)
  const pageCount=5
  const per_page=10;
  React.useEffect(() => {
    getTodos(page, search, sort).then(function(response){
      setTodos([...response.todos])
      setTotalPages(response.total_pages);
    });
  },[page, search, sort]);

  const handleDelete = async (id) => {
    await deleteTodo(id);
    getTodos(page, search, sort).then(function(response){
      setTodos([...response.todos])
      setTotalPages(response.total_pages);
    });
  };

  const handleDuplicate = async (todo) => {
    await duplicateTodo(todo);
    getTodos(page, search, sort).then(function(response){
      setTodos([...response.todos])
      setTotalPages(response.total_pages);
    });
  };

  const handleComplete = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = await completeTodo(id, todo.completed);
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  const handleStar = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = await starTodo(id, todo.starred);
    setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
  };

  
  return (
    <div className="todos-container">
	  <div className="header"><img src="/todo-icon.png"/><h1>Todos List</h1></div>

	  <div className="head-section">

		  {/* Search bar */}
		  <div className="search-bar">
        
			  <input id="todo-search-bar" type="search" placeholder="Search" onKeyUp={function(event){
          event.target.onsearch=()=> setSearch(event.target.value)
          if(event.key==="Enter")
            setSearch(event.target.value)
        }} />
		  </div>

		  {/* Sorting dropdown */}
		  <form className="sort-dropdown">
			<select id="todo-sort-dropdown"  onChange={(event)=> setSort(event.target.value)}>
          <optgroup className="dropdown-optgroup" label="&#10003;--Please select an option--">
          <option value="" selected hidden>Sort By</option> 
          <option id="todo-sort-dropdown__created-date-descending" value="createdAt:DESC">Created At (&darr;)</option> 
          <option id="todo-sort-dropdown__title-ascending" value="title:ASC">Title(&uarr;)</option>
          <option id="todo-sort-dropdown__title-descending" value="title:DESC">Title(&darr;)</option>
			    <option id="todo-sort-dropdown__due-date-ascending" value="dueDate:ASC">Due Date (&uarr;)</option>
			    <option id="todo-sort-dropdown__due-date-descending" value="dueDate:DESC">Due Date (&darr;)</option>
          
        </optgroup>
      </select>
      {
          sort!=""
            ? 
              <input 
                type="reset"
                className="reset" 
                value=""
                onClick={(event)=>{
                  event.target.parentNode.reset()
                  setSort("")
                }}
              >
                
              </input>
            :  ""
      }
      </form>
      <a className="activity-link" href="/todos/activity-log">Activity Logs</a>
	  </div>
	  
      <ul className="todos-list">
      {todos.map((todo) =>{
        if(todo.id!=edit)
          return(
            <div className="todo-item">
              <li 
                style={{
                  background: new Date() >todo.dueDate? "rgb(255, 223, 223)": "white",
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
                data-overdue={new Date() >todo.dueDate}
                key={todo.id}
                id={`todo-${todo.id}`}
              >			
                <button onClick={()=> handleComplete(todo.id)}>
                  <img src={todo.completed? "/completed.svg" :"/bullet.svg"}></img>
                </button>

                <p className="todo-title" onClick={()=> setEdit(todo.id)}>{todo.title}</p>
                <button id={`todo-duplicate-button__${todo.id}`} className="duplicate" onClick={() => handleDuplicate(todo)}>
                      <img src="/duplicate.svg"></img>
                </button>
                <button className="star" id={`todo-star-button__${todo.id}`} onClick={() => handleStar(todo.id)}>
                    <img src={todo.starred? "/star-selected.svg" :"/fav.svg"}></img>
                </button>
                <button className="delete"onClick={() => handleDelete(todo.id)}>
                    <img src="/del.svg"></img>
                </button>
              </li>
              {
                todo.dueDate 
                  ?
                  <div className="dueDate">
                    <img src="/calender.png" width="25px" height="25px"></img>
                    <p>
                      Due {moment(todo.dueDate).fromNow()}
                    </p>
                  </div>
                  : ""
              }
            </div>

          )
        else return(
          <UpdateTodo
              data={{
                todos,
                setTodos,
                todo,
                setEdit
              }}
               />
        )
      })}
      </ul>
      <CreateTodo data={{
        todos,
        setTodos,
        setTotalPages,
        setSort,
        per_page,
        setPage
      }} />
      <div className="pagination">
          <button id="todo-pagination-button__previous" className="prev-page" onClick={()=>setPage((page-1>=0? page-1: 1))}>Prev</button>
          <div className="page-numbers">
          {
            function(){
              
              let pages_arr=Array.from(Array(pageCount).keys())
              let diff=page-Math.ceil(pageCount/2)
              if(diff>0)
                pages_arr= pages_arr.map(v=> v+diff)
              pages_arr= pages_arr.filter(i=> i+1<=totalPages)
              return pages_arr.map(function(index){
                return (
                  <button
                     id={`todo-pagination-button__page_${index+1}`}
                     onClick={()=>setPage(index+1)}
                     className={page==index+1? "active-page-btn" : ""}
                  >
                    {index+1}
                  </button>
                )
              })
            }()
          }
          </div>
          <button className="next-page" id="todo-pagination-button__next" onClick={()=>setPage((page+1<totalPages? page+1: totalPages))}>Next</button>
      </div>
    </div>
  );
}
