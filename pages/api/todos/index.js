import Todo from "../../../db/models/Todo";
const per_page= 10;
export default async (req, res) => {
  if (req.method === "GET") {
    
    let sort= req.query.sort || 'createdAt:DESC';
    let search= req.query.search || '';
    

    let page= parseInt(req.query.page) || 1;
    if(page<1)
      page=1

    
    let todos = await Todo.findAll({
      where: {},
      order: [sort.split(':')]
    })
    todos= filter_by_search(todos, search)
    
    // do not sort by weightage if sort info is sent.
    if(!req.query.sort)
      todos= todos.sort((a, b)=> b.weightage- a.weightage)  
    
    
    const total_pages= Math.ceil(todos.length/per_page); // ten per page

    if( page> total_pages)
      page=total_pages
    todos= todos.slice((page-1)*per_page, page*per_page);
    res.status(200).json({total_pages, todos});
  }
  if (req.method === "POST") {
    delete req.body['id'];
    delete req.body['createdAt'];
    const todo = await Todo.create(req.body);
    const total_pages= Math.ceil((await Todo.count())/per_page)
    res.status(201).json({total_pages ,todo});
  }
};


function filter_by_search(todos, search){
    todos=todos.filter(function(todo){
      return todo.weightage=search
          .split(' ')
          .map(word =>todo.title.includes(word))
          .reduce((partialSum, a) => partialSum + a, 0)
    })
    return todos;
}