const express = require("express");
const mongoose = require('mongoose');
const data = require('./datamodule');
const studyData = require('./studymodule');
const cors = require('cors');

const app = express();

//connect database
mongoose.connect('mongodb+srv://pavanrajuvysyaraju648:Jyoshna@cluster0.oqgyvli.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(
    () => console.log('db is connected...')
)

//Add cors policy
app.use(cors({origin:'*'}));

//data convert into json
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("i am ok...")
})

//to post study Notifications
app.post('/addstudy', async (req, res) => {
    try {
        const { applyLink, discription, title, duration,qualifications } = req.body;
        
        // Assuming studyData is a mongoose model/schema
        const newStudydata = new studyData({ applyLink, discription, title, duration,qualifications });
        
        await newStudydata.save();
        
        return res.status(201).json({ message: 'Data is added' });
    } catch (err) {
        console.error('Error adding study data:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

//to post jobs
app.post('/addjob', async (req, res) => {
    try {
      const { type, companyName, jobRole, salary, qualifications, location, discription, applyLink, duration } = req.body;
      const newdata = new data({ type, companyName, jobRole, salary, qualifications, location, discription, applyLink, duration });
      // Save the new job to the database
      await newdata.save();
      return res.status(201).json({ message: 'Job data is added' });
    } catch (err) {
      console.error('Error adding job data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
//to show all studyData
app.get('/study',async(req,res)=>{
    try{
        let alldata = await studyData.find();
        return res.status(200).json(alldata);
    }catch(err){
        return res.status(500).send("internal server Error");
    }
})

//to show jobs
app.get('/alljobs',async (req,res)=>{
    try{
        let alldata = await data.find();
        return res.status(200).json(alldata);
        
    }catch(err){
        return res.status(500).send("internal server Error");
    }
});

//to show indivual jobs in alljobs
app.get('/job/:id',async(req,res)=>{
    try{
       const Data = await data.findById(req.params.id);
       return res.json(Data);
    }catch(err){
        return res.status(500).send("internal server Error");
    }
})

app.get('/study/:id', async (req, res) => {
  try {
    const studyId = req.params.id;
    const study = await studyData.findById(studyId);

    if (!study) {
      return res.status(404).json({ error: 'Study not found' });
    }

    return res.status(200).json(study);
  } catch (error) {
    console.error('Error fetching study details:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//to show only govt Jobs
app.get('/govtjob',async(req,res)=>{
    try{
       let govtdata = await data.find({type:'govt'})
       return res.status(200).json(govtdata);
    }catch(err){
        return res.status(500).send("internal server Error");
    }
});

//to show only private Jobs
app.get('/privatejob',async(req,res)=>{
    try{
       let private = await data.find({type:'private'})
       return res.status(200).json(private);
    }catch(err){
        return res.status(500).send("internal server Error");
    }
});

//deleting job data
app.delete('/deletejob/:id', async (req, res) => {
    try {
      const jobId = req.params.id;
  
      // Find the job data by ID and remove it from the database
      const deletedJob = await data.findByIdAndDelete(jobId);
  
      if (!deletedJob) {
        return res.status(404).json({ error: 'Job not found' });
      }
  
      return res.status(200).json({ message: 'Job data deleted successfully' });
    } catch (err) {
      console.error('Error deleting job data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// Add a route for deleting study data
app.delete('/deletestudy/:id', async (req, res) => {
    try {
      const studyId = req.params.id;
  
      // Find the study data by ID and remove it from the database
      const deletedStudy = await studyData.findByIdAndDelete(studyId);
  
      if (!deletedStudy) {
        return res.status(404).json({ error: 'Study not found' });
      }
  
      return res.status(200).json({ message: 'Study data deleted successfully' });
    } catch (err) {
      console.error('Error deleting study data:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


app.listen(5001,()=>console.log('server running..!'));