const router = require('express').Router();
const Mark = require('../models/mark');
const Student = require('../models/student');

// Add marks
router.route('/add').post((req, res) => {
  const { studentId, subject, examType, marks, maxMarks, date } = req.body;

  const newMark = new Mark({
    studentId,
    subject,
    examType,
    marks: Number(marks),
    maxMarks: Number(maxMarks),
    date: date || Date.now(),
  });

  newMark
    .save()
    .then(() => {
      res.json('Marks Added Successfully');
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get all marks
router.route('/get').get((req, res) => {
  Mark
    .find()
    .populate('studentId', 'name regno nim course')
    .then((marks) => {
      res.json(marks);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get marks by student ID
router.route('/student/:id').get(async (req, res) => {
  const studentId = req.params.id;
  await Mark
    .find({ studentId })
    .then((marks) => {
      res.json(marks);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get marks by subject
router.route('/subject/:subject').get(async (req, res) => {
  const subject = req.params.subject;
  await Mark
    .find({ subject })
    .populate('studentId', 'name regno nim')
    .then((marks) => {
      res.json(marks);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get marks statistics for a student
router.route('/stats/:studentId').get(async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const allMarks = await Mark.find({ studentId });

    if (allMarks.length === 0) {
      return res.json({
        overall: {
          totalExams: 0,
          averagePercentage: 0,
          averageGrade: 'N/A',
          totalMarks: 0,
          totalMaxMarks: 0,
        },
        subjectWise: [],
        examTypeWise: [],
      });
    }

    // Calculate overall statistics
    const totalMarks = allMarks.reduce((sum, mark) => sum + mark.marks, 0);
    const totalMaxMarks = allMarks.reduce((sum, mark) => sum + mark.maxMarks, 0);
    const averagePercentage = (totalMarks / totalMaxMarks) * 100;

    // Determine average grade
    let averageGrade;
    if (averagePercentage >= 90) averageGrade = 'A+';
    else if (averagePercentage >= 80) averageGrade = 'A';
    else if (averagePercentage >= 70) averageGrade = 'B+';
    else if (averagePercentage >= 60) averageGrade = 'B';
    else if (averagePercentage >= 50) averageGrade = 'C';
    else if (averagePercentage >= 40) averageGrade = 'D';
    else averageGrade = 'F';

    // Get subject-wise statistics
    const subjects = [...new Set(allMarks.map(m => m.subject))];
    const subjectWise = subjects.map(subject => {
      const subjectMarks = allMarks.filter(m => m.subject === subject);
      const subjectTotal = subjectMarks.reduce((sum, m) => sum + m.marks, 0);
      const subjectMaxTotal = subjectMarks.reduce((sum, m) => sum + m.maxMarks, 0);
      const subjectPercentage = (subjectTotal / subjectMaxTotal) * 100;

      let subjectGrade;
      if (subjectPercentage >= 90) subjectGrade = 'A+';
      else if (subjectPercentage >= 80) subjectGrade = 'A';
      else if (subjectPercentage >= 70) subjectGrade = 'B+';
      else if (subjectPercentage >= 60) subjectGrade = 'B';
      else if (subjectPercentage >= 50) subjectGrade = 'C';
      else if (subjectPercentage >= 40) subjectGrade = 'D';
      else subjectGrade = 'F';

      return {
        subject,
        totalExams: subjectMarks.length,
        totalMarks: subjectTotal,
        maxMarks: subjectMaxTotal,
        percentage: subjectPercentage.toFixed(2),
        grade: subjectGrade,
      };
    });

    // Get exam type-wise statistics
    const examTypes = [...new Set(allMarks.map(m => m.examType))];
    const examTypeWise = examTypes.map(examType => {
      const examMarks = allMarks.filter(m => m.examType === examType);
      const examTotal = examMarks.reduce((sum, m) => sum + m.marks, 0);
      const examMaxTotal = examMarks.reduce((sum, m) => sum + m.maxMarks, 0);
      const examPercentage = (examTotal / examMaxTotal) * 100;

      return {
        examType,
        count: examMarks.length,
        totalMarks: examTotal,
        maxMarks: examMaxTotal,
        percentage: examPercentage.toFixed(2),
      };
    });

    res.json({
      overall: {
        totalExams: allMarks.length,
        averagePercentage: averagePercentage.toFixed(2),
        averageGrade,
        totalMarks,
        totalMaxMarks,
      },
      subjectWise,
      examTypeWise,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Update marks
router.route('/update/:id').put(async (req, res) => {
  let markId = req.params.id;
  const { subject, examType, marks, maxMarks, date } = req.body;

  const updateMark = {
    subject,
    examType,
    marks: Number(marks),
    maxMarks: Number(maxMarks),
    date,
  };

  await Mark.findByIdAndUpdate(markId, updateMark)
    .then(() => {
      res.status(200).send({
        status: 'Marks Updated',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with updating marks',
        error: err.message,
      });
    });
});

// Delete marks
router.route('/delete/:id').delete(async (req, res) => {
  let markId = req.params.id;
  await Mark.findByIdAndDelete(markId)
    .then(() => {
      res.status(200).send({
        status: 'Marks Deleted',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with deleting marks',
        error: err.message,
      });
    });
});

module.exports = router;
