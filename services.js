const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const date = require('date-and-time');
app.use(cors());
/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());
   
/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: '127.0.0.1', //localhost
  user: 'root', /* MySQL User */
  password: '', /* MySQL Password */
  database: 'cloasis' /* MySQL Database */
});
   
/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
   
/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/professor',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM professor";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */

app.get('/api/professor/:id',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM professor WHERE professorid=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/professor',cors(),(req, res) => {
  let data = {firstname: req.body.firstname, lastname: req.body.lastname, email:req.body.email};
  
  let sqlQuery = "INSERT INTO professor SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
//not working
app.put('/api/professor/:id',cors(),(req, res) => {
  let sqlQuery = "UPDATE professor SET firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', email= '"+req.body.email+"' WHERE professorid="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/professor/:id',cors(),(req, res) => {
  let sqlQuery = "DELETE FROM professor WHERE professorid="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});
  

/**
 * Get All Items
 *
 * @return response()
 */
app.get('/api/courses',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM courses";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */
app.get('/api/courses/:id',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM courses WHERE courseid=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/courses',cors(),(req, res) => {
  let data = {coursename: req.body.coursename,  semester:req.body.semester, section:req.body.section, department:req.body.department,  college:req.body.college,  program:req.body.program};
  
  let sqlQuery = "INSERT INTO courses SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
//not working
app.put('/api/courses/:id',cors(),(req, res) => {
  let sqlQuery = "UPDATE courses SET coursename='"+req.body.coursename+"', professorname='"+req.body.professorname+"', semester= '"+req.body.semester+"', section='"+req.body.section+ "', department='"+req.body.department+"' WHERE courseid="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/courses/:id',cors(),(req, res) => {
  let sqlQuery = "DELETE FROM courses WHERE courseid="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});

/**
 * Get All Items
 *
 * @return response()
 */
 app.get('/api/assignments',(req, res) => {
  let sqlQuery = "SELECT * FROM assignments";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */

app.get('/api/assignments/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM assignments WHERE asignmentid=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Asst
 *
 * @return response()
 */

app.post('/api/assignments',(req, res) => {
  let date_ob = new Date(req.body.date);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let date = ("0" + date_ob.getDate()).slice(-2);
  let year = date_ob.getFullYear();
  let finalDate = year + "-" + month + "-" + date;
  let data = {title: req.body.title, type: req.body.type, shortTitle:req.body.shortTitle,points:req.body.points,date:finalDate};
  let sqlQuery = "INSERT INTO assignments SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Update Asst
 *
 * @return response()
 */
//not working
app.put('/api/assignments/:id',(req, res) => {
  let sqlQuery = "UPDATE assignments SET title='"+req.body.title+"', type='"+req.body.type+"', shortTitle= '"+req.body.shortTitle+"', date='"+req.body.date+ "', points='"+req.body.points+"' WHERE asignmentid="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Asst
 *
 * @return response()
 */
app.delete('/api/assignments/:id',(req, res) => {
  let sqlQuery = "DELETE FROM assignments WHERE asignmentid="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});

/**
 * Get All Items
 *
 * @return response()
 */
 app.get('/api/teams',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM teams";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */

app.get('/api/teams/:id',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM teams WHERE teamid=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/teams',cors(),(req, res) => {
  let data = {course: req.body.course, name: req.body.name, members:req.body.members};
  
  let sqlQuery = "INSERT INTO teams SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
//not working
app.put('/api/teams/:id',cors(),(req, res) => {
  let sqlQuery = "UPDATE teams SET course='"+req.body.course+"', name='"+req.body.name+"', members= '"+req.body.members+"' WHERE teamid="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/teams/:id',cors(),(req, res) => {
  let sqlQuery = "DELETE FROM teams WHERE teamid="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });
});
/**
 * Get All Items
 *
 * @return response()
 */
 app.get('/api/students',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM students";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Get Single Item
 *
 * @return response()
 */

app.get('/api/students/:id',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM students WHERE id=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Create New Item
 *
 * @return response()
 */
app.post('/api/students',cors(),(req, res) => {
  let data = {firstname: req.body.firstname, lastname: req.body.lastname, IAN:req.body.IAN, email:req.body.email, aubNetId:req.body.aubNetId, section:req.body.section, team: req.body.team, comment: req.body.comment, AUBId: req.body.AUBId};
  
  let sqlQuery = "INSERT INTO students SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
//not working
app.put('/api/students/:id',cors(),(req, res) => {
  let sqlQuery = "UPDATE students SET firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', email= '"+req.body.email+ "', IAN= '"+req.body.IAN+ "', aubNetId= '"+req.body.aubNetId+ "', section= '"+req.body.section+ "', team= '"+req.body.team+"', comment= '"+req.body.comment+ "' WHERE id="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/students/:id',cors(),(req, res) => {
  let sqlQuery = "DELETE FROM students WHERE id="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.send(apiResponse(results));
  });

});



app.get('/api/ClosandDlos',cors(),(req, res) => {
  let sqlQuery = "SELECT * FROM courselearningoutcomes";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});

app.post('/api/ClosandDlos',cors(),(req, res) => {
  let data = {semesterId: req.body.semesterId, coursesId: req.body.coursesId, outcomes:req.body.outcomes};
  
  let sqlQuery = "INSERT INTO courselearningoutcomes SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    res.send(apiResponse(results));
  });
});
/**
* Get All Items
*
* @return response()
*/
// app.get('/api/membersinteam',cors(),(req, res) => {
//  let sqlQuery = "SELECT * FROM membersinteam";
 
//  let query = conn.query(sqlQuery, (err, results) => {
//    if(err) throw err;
//    res.send(apiResponse(results));
//  });
// });
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return JSON.stringify({"status": 200, "error": null, "response": results});
}
   
/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3001,() =>{
  console.log('Server started on port 3001...');
});
