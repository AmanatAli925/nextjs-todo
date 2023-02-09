import Activity from "../../../db/models/Activity";
const per_page= 5;
export default async (req, res) => {
  if (req.method === "GET") {
    
   

    
    let activities = await Activity.findAll()
    res.status(200).json(activities);
  }

  if (req.method === "POST") {
    
    const activity= await Activity.create(req.body);
    res.status(201).json(activity);
  }

}