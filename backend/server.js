
const express = require('express')
const db = require('./db')

const patientRoutes = require('./routes/patientRoutes')
const adminRoutes = require('./routes/adminRoutes')
const physiotherapistRoutes = require('./routes/physiotherapistRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// Patient routes
app.use('/api/patients', patientRoutes)

// Admin routes
app.use('/api/admins', adminRoutes)

// Physiotherapist routes
app.use('/api/physiotherapists', physiotherapistRoutes)

app.get('/', (req, res) => {
  res.send('SmartFlex Backend is running!')
})



app.get('/test-db', (req, res) => {
  db.query('SELECT 1 AS result', (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Database test failed'
      })
    }

    res.json({
      message: 'SmartFlex database connected successfully!',
      result: results[0].result
    })
  })
})

app.listen(PORT, () => {
  console.log(`SmartFlex backend running at http://localhost:${PORT}`)
})
