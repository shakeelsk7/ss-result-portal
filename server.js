const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const demoResults = {
  '123458-9th-2026': {
    name: 'Demo 9th Class Student',
    rollNumber: '123458',
    board: 'BISE Bahawalpur',
    className: '9th',
    year: '2026',
    subjects: [
      { name: 'English', obtained: 65, total: 100 },
      { name: 'Urdu', obtained: 70, total: 100 },
      { name: 'Mathematics', obtained: 68, total: 100 },
      { name: 'General Science', obtained: 72, total: 100 },
      { name: 'Computer Science', obtained: 75, total: 100 },
      { name: 'Islamiat', obtained: 40, total: 50 },
      { name: 'Tarjamat-ul-Quran', obtained: 42, total: 50 }
    ]
  },
  '123456-10th-2026': {
    name: 'Demo Student',
    rollNumber: '123456',
    board: 'BISE Bahawalpur',
    className: '10th',
    year: '2026',
    subjects: [
      { name: 'English', obtained: 75, total: 100 },
      { name: 'Urdu', obtained: 78, total: 100 },
      { name: 'Physics', obtained: 65, total: 100 },
      { name: 'Mathematics', obtained: 80, total: 100 },
      { name: 'Computer', obtained: 85, total: 100 }
    ]
  },
  '123457-11th-2026': {
    name: 'Demo ICS Student',
    rollNumber: '123457',
    board: 'BISE Bahawalpur',
    className: '11th',
    year: '2026',
    subjects: [
      { name: 'English', obtained: 72, total: 100 },
      { name: 'Urdu', obtained: 68, total: 100 },
      { name: 'Physics', obtained: 55, total: 100 },
      { name: 'Mathematics', obtained: 61, total: 100 },
      { name: 'Computer Science', obtained: 30, total: 100 },
      { name: 'Islamiat', obtained: 42, total: 50 },
      { name: 'Tarjamat-ul-Quran', obtained: 44, total: 50 }
    ]
  },
  '123459-12th-2026': {
    name: 'Demo 12th Class Student',
    rollNumber: '123459',
    board: 'BISE Bahawalpur',
    className: '12th',
    year: '2026',
    subjects: [
      { name: 'English', obtained: 74, total: 100 },
      { name: 'Urdu', obtained: 71, total: 100 },
      { name: 'Physics', obtained: 66, total: 100 },
      { name: 'Mathematics', obtained: 69, total: 100 },
      { name: 'Computer Science', obtained: 82, total: 100 },
      { name: 'Islamiat', obtained: 43, total: 50 },
      { name: 'Tarjamat-ul-Quran', obtained: 45, total: 50 }
    ]
  }
};

app.get('/api/status', (req, res) => {
  res.json({
    success: true,
    message: 'SS Result Portal backend is running',
    mode: 'demo'
  });
});

app.get('/api/result', (req, res) => {
  const rollNumber = String(req.query.roll || '').trim();
  const className = String(req.query.class || '').trim().toLowerCase();
  const year = String(req.query.year || '').trim();

  if (!rollNumber || !className || !year) {
    return res.status(400).json({
      success: false,
      message: 'Roll number, class, and year are required.'
    });
  }

  const key = `${rollNumber}-${className}-${year}`;
  const result = demoResults[key];

  if (!result) {
    return res.status(404).json({
      success: false,
      message: 'No demo record found. Please check your roll number, class, and exam year.'
    });
  }

  const totalMarks = result.subjects.reduce((sum, subject) => sum + subject.total, 0);
  const obtainedMarks = result.subjects.reduce((sum, subject) => sum + subject.obtained, 0);
  const hasSupply = result.subjects.some(subject => subject.obtained / subject.total < 0.4);

  res.json({
    success: true,
    demo: true,
    result: {
      ...result,
      totalMarks,
      obtainedMarks,
      percentage: Number((obtainedMarks / totalMarks * 100).toFixed(2)),
      status: hasSupply ? 'SUPPLY' : 'PASS',
      subjects: result.subjects.map(subject => ({
        ...subject,
        status: subject.obtained / subject.total < 0.4 ? 'SUPPLY' : 'PASS'
      }))
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`SS Result Portal backend running on port ${PORT}`);
});
