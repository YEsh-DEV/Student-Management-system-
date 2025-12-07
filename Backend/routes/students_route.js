const router = require('express').Router();
const Student = require('../models/student');

//http//localhost:8070/student/add
router.route('/add').post((req, res) => {
  const { name, regno, nim, gender, email, phone, age, course, address, enrollmentDate } = req.body;

  //send this object through model to mongodb to store it in the database
  const newStudent = new Student({
    name,
    regno: regno || nim, // Use regno if provided, otherwise use nim for backward compatibility
    nim: nim || regno, // Keep nim for backward compatibility
    gender,
    email,
    phone,
    age: Number(age),
    course,
    address,
    enrollmentDate: enrollmentDate || Date.now(),
  });

  newStudent
    .save()
    .then(() => {
      res.json('Student Added Successfully');
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

//https//localhost:8070/student/get
router.route('/get').get((req, res) => {
  Student
    .find()
    .then((students) => {
      res.json(students);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

//https//localhost:8070/student/update/:sid
router.route('/update/:sid').put(async (req, res) => {
  let studentId = req.params.sid;
  const { name, regno, nim, gender, email, phone, age, course, address, enrollmentDate } = req.body;

  const updateStudent = {
    name,
    regno: regno || nim,
    nim: nim || regno,
    gender,
    email,
    phone,
    age,
    course,
    address,
    enrollmentDate,
  };

  const update = await Student.findByIdAndUpdate(studentId, updateStudent)
    .then(() => {
      res.status(200).send({
        status: 'Student Updated',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Server Error with updating data',
        error: err.message,
      });
    });
});

//https//localhost:8070/student/delete/:sid
router.route('/delete/:sid').delete(async (req, res) => {
  let studentId = req.params.sid;
  await Student.findByIdAndDelete(studentId)
    .then(() => {
      res.status(200).send({
        status: 'Student Deleted',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with deleting student',
        error: err.message,
      });
    });
});

//https//localhost:8070/student/get/:sid
router.route('/get/:sid').get(async (req, res) => {
  const studentId = req.params.sid;
  const student = await Student.findById(studentId)
    .then((student) => {
      res.status(200).send({
        status: 'Student Fetched',
        student,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with fetch student',
        error: err.message,
      });
    });
});

module.exports = router;
