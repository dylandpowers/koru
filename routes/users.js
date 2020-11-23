import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../persistence/models/User';

const router = Router();

router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        res.status(400).json({ msg: 'Email already exists '});
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
              .then((user) => res.json(user))
              .catch((err) => res.status(400).json({ msg: 'Error creating user' }));
          });
        });
      }
    });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ msg: 'Email not found'});
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name
            }

            jwt.sign(payload, process.env.PASSPORT_SECRET, { expiresIn: 60 * 60 * 24 * 365 }, (err, token) => {
              if (err) {
                return res.status(500).json({ success: false, msg: err.message });
              }
              res.json({ success: true, token });
            });
          } else {
            res.json({ success: false, msg: 'Incorrect password' });
          }
        });
    });
});

export default router;