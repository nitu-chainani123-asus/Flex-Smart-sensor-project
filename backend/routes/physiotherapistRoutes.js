const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db')

const router = express.Router()

// Physiotherapist registration
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
      'INSERT INTO physiotherapists (full_name, email, password) VALUES (?, ?, ?)',
      [full_name.trim(), email.trim().toLowerCase(), hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
              message: 'This email is already registered.'
            })
          }

          console.error('Physiotherapist registration error:', err.message)
          return res.status(500).json({
            message: 'Registration failed.'
          })
        }

        return res.status(201).json({
          message: 'Physiotherapist registered successfully!',
          physiotherapist_id: result.insertId
        })
      }
    )
  } catch (err) {
    console.error('Password hashing error:', err.message)
    return res.status(500).json({
      message: 'Registration failed.'
    })
  }
})

// Physiotherapist login
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    })
  }

  db.query(
    'SELECT id, full_name, email, password FROM physiotherapists WHERE email = ?',
    [email.trim().toLowerCase()],
    async (err, results) => {
      if (err) {
        console.error('Physiotherapist login error:', err.message)
        return res.status(500).json({
          message: 'Login failed.'
        })
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: 'Invalid email or password.'
        })
      }

      const physiotherapist = results[0]
      const passwordMatches = await bcrypt.compare(
        password,
        physiotherapist.password
      )

      if (!passwordMatches) {
        return res.status(401).json({
          message: 'Invalid email or password.'
        })
      }

      return res.json({
        message: 'Physiotherapist login successful!',
        physiotherapist: {
          physiotherapist_id: physiotherapist.id,
          full_name: physiotherapist.full_name,
          email: physiotherapist.email
        }
      })
    }
  )
})

module.exports = router