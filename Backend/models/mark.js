const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const markSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  examType: {
    type: String,
    enum: ['midterm', 'final', 'assignment', 'quiz', 'project'],
    required: true,
  },
  marks: {
    type: Number,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  grade: {
    type: String,
  },
  percentage: {
    type: Number,
  },
}, {
  timestamps: true,
});

// Calculate percentage and grade before saving
markSchema.pre('save', function (next) {
  this.percentage = (this.marks / this.maxMarks) * 100;

  // Calculate grade based on percentage
  if (this.percentage >= 90) this.grade = 'A+';
  else if (this.percentage >= 80) this.grade = 'A';
  else if (this.percentage >= 70) this.grade = 'B+';
  else if (this.percentage >= 60) this.grade = 'B';
  else if (this.percentage >= 50) this.grade = 'C';
  else if (this.percentage >= 40) this.grade = 'D';
  else this.grade = 'F';

  next();
});

const Mark = mongoose.model('Mark', markSchema);

module.exports = Mark;
