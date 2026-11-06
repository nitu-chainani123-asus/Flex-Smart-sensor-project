const express = require('express')
const bcrypt = require('bcryptjs')
const db = require('../db')

const router = express.Router()

// Admin registration
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
      'INSERT INTO admins (full_name, email, password) VALUES (?, ?, ?)',
      [full_name.trim(), email.trim().toLowerCase(), hashedPassword],
      (err, result) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
              message: 'This email is already registered.'
            })
          }

          console.error('Admin registration error:', err.message)
          return res.status(500).json({
            message: 'Admin registration failed.'
          })
        }

        return res.status(201).json({
          message: 'Admin registered successfully!',
          admin_id: result.insertId
        })
      }
    )
  } catch (err) {
    console.error('Password hashing error:', err.message)
    return res.status(500).json({
      message: 'Admin registration failed.'
    })
  }
})

// Admin login
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    })
  }

  db.query(
    'SELECT id, full_name, email, password FROM admins WHERE email = ?',
    [email.trim().toLowerCase()],
    async (err, results) => {
      if (err) {
        console.error('Admin login error:', err.message)
        return res.status(500).json({
          message: 'Admin login failed.'
        })
      }

      if (results.length === 0) {
        return res.status(401).json({
          message: 'Invalid email or password.'
        })
      }

      const admin = results[0]
      const passwordMatches = await bcrypt.compare(
        password,
        admin.password
      )

      if (!passwordMatches) {
        return res.status(401).json({
          message: 'Invalid email or password.'
        })
      }

      return res.json({
        message: 'Admin login successful!',
        admin: {
          admin_id: admin.id,
          full_name: admin.full_name,
          email: admin.email
        }
      })
    }
  )
})

module.exports = router