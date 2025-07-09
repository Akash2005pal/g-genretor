var express = require('express');
var pool = require('./pool');
const e = require('express');
var router = express.Router();


/* GET home page. */
router.get('/employee_interface', function (req, res, next) {
  res.render('employeeform', { message: '' });
});

router.get('/fetch_all_states', function (req, res) {
  pool.query('select * from state', function (error, result) {
    if (error) {
      console.log(error)
      res.json({ status: false, data: [], message: 'Error in Query Pls Contact Data Administrator...' })
    }
    else {
      res.json({ status: true, data: result, message: 'Successful' })
    }

  })

})
router.get('/fetch_all_city', function (req, res) {
  pool.query('select * from city where cityid=?', [req.query.stateid], function (error, result) {
    if (error) {
      console.log(error)
      res.json({ status: false, data: [], message: 'Error in Query Pls Contact Data Administrator...' })
    }
    else {
      res.json({ status: true, data: result, message: 'Successful' })
    }

  })

})
router.post("/insert_record",function(req,res){
  try{
  pool.query("insert into employees( employeesname, dob, gender, address, id, cityid, department, grade, salary, picture )values(?,?,?,?,?,?,?,?,?,?)",[req.body.employeesname, req.body.dob, req.body.gender, req.body.address, req.body.id, req.body.cityid, req.body.department, req.body.grade, req.body.salary, req.body.picture],function(error,result){
    
  
  if(error){
    console.log(error)
    res.render("employeeform",{status:false,message:error,color:'red'})
  }
  else
  {     
    res.render("employeeform",{status:true,message:"Employee Sumitted Successfully",color:'green'})
  }

})
  }
  catch(e)
   {
       res.render("employeeform",{status:false,message:"Some Critical Error, Conatact to Backend Team....",color:'red'})
   }
 })
 
module.exports = router;
