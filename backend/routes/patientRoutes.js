
const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('SmartFlex patient routes are working!')
})

router.post('/register', async (req, res) => {
  const { full_name, email, password } = req.body

  if (!full_name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email, and password are required.'
    })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    db.query(
      'INSERT INTO patients (full_name, email, password) VALUES (?, ?, ?)',
      [full_name.trim(), email.trim().toLowerCase(), hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
              message: 'This email is already registered.'
            })
          }

          console.error('Registration error:', err.message)
          return res.status(500).json({
            message: 'Registration failed.'
          })
        }

        const patientId = `SF-P${String(result.insertId).padStart(3, '0')}`

        db.query(
          'UPDATE patients SET patient_id = ? WHERE id = ?',
          [patientId, result.insertId],
          (updateErr) => {
            if (updateErr) {
              console.error('Patient ID error:', updateErr.message)
              return res.status(500).json({
                message: 'Account created, but Patient ID generation failed.'
              })
            }

            return res.status(201).json({
              message: 'Patient registered successfully!',
              patient_id: patientId
            })
          }
        )
      }
    )
  } catch (err) {
    console.error('Password hashing error:', err.message)
    return res.status(500).json({
      message: 'Registration failed.'
    })
  }
})

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    })
  }

  const normalizedEmail = email.trim().toLowerCase()

  db.query(
    'SELECT id, patient_id, full_name, email, password FROM patients WHERE email = ?',
    [normalizedEmail],
    async (err, results) => {
      if (err) {
        console.error('Login error:', err.message)
        return res.status(500).json({
          message: 'Login failed.'
        })
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: 'Invalid email or password.'
        })
      }

      const patient = results[0]
      const passwordMatches = await bcrypt.compare(
        password,
        patient.password
      )

      if (!passwordMatches) {
        return res.status(401).json({
          message: 'Invalid email or password.'
        })
      }

      return res.json({
        message: 'Login successful!',
        patient: {
          patient_id: patient.patient_id,
          full_name: patient.full_name,
          email: patient.email
        }
      })
    }
  )
})

module.exports = router
