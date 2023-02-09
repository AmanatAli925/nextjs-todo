const getActivities = async (page, search, sort) => {
    
    let  response = await fetch("/api/todos/activities");
    return  response.json()
}
  
export default getActivities;
  