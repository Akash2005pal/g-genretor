var express = require('express');
var pool = require('./pool')
var router = express.Router();


/* GET home page. */
router.get('/employee_interface', function (req, res, next) {
  res.render('employeeform');
});

router.get('/fetch_all_states', function (req, res) {
  pool.query('select * from state', function (error, result) {
    if (error)
    {console.log(error)
      res.json({ status: false, data: [], message: 'Error in Query Pls Contact Data Administrator...' })
    }
   else
    {
      res.json({ status: true, data: result, message: 'Successful' })
    }

  })

})

module.exports = router;
