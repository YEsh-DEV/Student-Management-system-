const router = require('express').Router();
const Subject = require('../models/subject');

// Add new subject
router.route('/add').post((req, res) => {
  const { name, code, course, description, credits } = req.body;

  const newSubject = new Subject({
    name,
    code,
    course,
    description,
    credits: credits || 3,
  });

  newSubject
    .save()
    .then(() => {
      res.json('Subject Added Successfully');
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get all subjects
router.route('/get').get((req, res) => {
  Subject
    .find()
    .then((subjects) => {
      res.json(subjects);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get subjects by course
router.route('/course/:course').get((req, res) => {
  const course = req.params.course;
  Subject
    .find({ course })
    .then((subjects) => {
      res.json(subjects);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Update subject
router.route('/update/:id').put(async (req, res) => {
  let subjectId = req.params.id;
  const { name, code, course, description, credits } = req.body;

  const updateSubject = {
    name,
    code,
    course,
    description,
    credits,
  };

  await Subject.findByIdAndUpdate(subjectId, updateSubject)
    .then(() => {
      res.status(200).send({
        status: 'Subject Updated',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with updating data',
        error: err.message,
      });
    });
});

// Delete subject
router.route('/delete/:id').delete(async (req, res) => {
  let subjectId = req.params.id;
  await Subject.findByIdAndDelete(subjectId)
    .then(() => {
      res.status(200).send({
        status: 'Subject Deleted',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with deleting subject',
        error: err.message,
      });
    });
});

// Get one subject
router.route('/get/:id').get(async (req, res) => {
  const subjectId = req.params.id;
  await Subject.findById(subjectId)
    .then((subject) => {
      res.status(200).send({
        status: 'Subject Fetched',
        subject,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with fetch subject',
        error: err.message,
      });
    });
});

module.exports = router;
