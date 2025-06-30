var express = require('express');
var router = express.Router();

router.get('/student_interface', function (req, res) {
    res.render('studentform');
});

router.get('/show_marksheet', function (req, res) { 
    var {
        rollno,
        name,
        gender,
        dob,
        hindi,
           english,
        maths,
        physics,
        chemistry
    } = req.query;

    var h = parseInt(hindi);
    var e = parseInt(english);
    var m = parseInt(maths);
    var p = parseInt(physics); 
    var c = parseInt(chemistry);

    var total = h + e + m + p + c;
    const per = total / 500 * 100;

    function getRemark(marks) {
        if (marks >= 75) return 'd';
        if (marks >= 36) return '-';  
        return '*';
    } 

    const remark1 = getRemark(h);
    const remark2 = getRemark(e);
    const remark3 = getRemark(m);
    const remark4 = getRemark(p);
    const remark5 = getRemark(c);

    const failCount = [h, e, m, p, c].filter(mark => mark < 35).length;

    let result = 'Pass';
    if (failCount === 1 || failCount === 2) result = 'Compartment';
    if (failCount >= 3) result = 'Fail';

    let grade = 'D';
    if (per >= 60) grade = 'A';
    else if (per >= 48) grade = 'B';
    else if (per >= 35) grade = 'C';

    res.render('marksheet', {
        rollno,
        name,
        gender,
        dob,
        hindi: h,
        english: e,
        maths: m,
        physics: p,
        chemistry: c,
        total,
        per,
        grade,
        result,
        remark1,
        remark2,
        remark3,
        remark4,
        remark5
    });
});

module.exports = router;
