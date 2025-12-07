const router = require('express').Router();
const Attendance = require('../models/attendance');
const Student = require('../models/student');

// Mark attendance
router.route('/mark').post(async (req, res) => {
  const { studentId, subject, date, status, markedBy } = req.body;

  const newAttendance = new Attendance({
    studentId,
    subject,
    date,
    status,
    markedBy: markedBy || 'Admin',
  });

  newAttendance
    .save()
    .then(() => {
      res.json('Attendance Marked Successfully');
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get all attendance records
router.route('/get').get((req, res) => {
  Attendance
    .find()
    .populate('studentId', 'name regno nim')
    .then((attendance) => {
      res.json(attendance);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get attendance by student ID
router.route('/student/:id').get(async (req, res) => {
  const studentId = req.params.id;
  await Attendance
    .find({ studentId })
    .then((attendance) => {
      res.json(attendance);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get attendance by subject
router.route('/subject/:subject').get(async (req, res) => {
  const subject = req.params.subject;
  await Attendance
    .find({ subject })
    .populate('studentId', 'name regno nim')
    .then((attendance) => {
      res.json(attendance);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    });
});

// Get attendance statistics for a student
router.route('/stats/:studentId').get(async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const allAttendance = await Attendance.find({ studentId });
    const totalClasses = allAttendance.length;
    const presentClasses = allAttendance.filter(a => a.status === 'present').length;
    const absentClasses = allAttendance.filter(a => a.status === 'absent').length;
    const lateClasses = allAttendance.filter(a => a.status === 'late').length;
    const percentage = totalClasses > 0 ? ((presentClasses + lateClasses) / totalClasses) * 100 : 0;

    // Get subject-wise attendance
    const subjects = [...new Set(allAttendance.map(a => a.subject))];
    const subjectWise = subjects.map(subject => {
      const subjectAttendance = allAttendance.filter(a => a.subject === subject);
      const subjectTotal = subjectAttendance.length;
      const subjectPresent = subjectAttendance.filter(a => a.status === 'present').length;
      const subjectPercentage = subjectTotal > 0 ? (subjectPresent / subjectTotal) * 100 : 0;

      return {
        subject,
        total: subjectTotal,
        present: subjectPresent,
        absent: subjectAttendance.filter(a => a.status === 'absent').length,
        late: subjectAttendance.filter(a => a.status === 'late').length,
        percentage: subjectPercentage.toFixed(2),
      };
    });

    res.json({
      overall: {
        total: totalClasses,
        present: presentClasses,
        absent: absentClasses,
        late: lateClasses,
        percentage: percentage.toFixed(2),
      },
      subjectWise,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
});

// Delete attendance record
router.route('/delete/:id').delete(async (req, res) => {
  let attendanceId = req.params.id;
  await Attendance.findByIdAndDelete(attendanceId)
    .then(() => {
      res.status(200).send({
        status: 'Attendance Record Deleted',
      });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: 'Error with deleting attendance',
        error: err.message,
      });
    });
});

module.exports = router;
