import { Router } from 'express';
import passport from 'passport';

import Session from '../persistence/models/Session';
import extractUserIdFromAuthHeader from '../util/extractUserIdFromAuthHeader';
import savePublicGratitudes from '../persistence/helpers/savePublicGratitudes';

const router = Router();

router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userId = extractUserIdFromAuthHeader(req.headers['authorization']);

  const { isPublicGratitudes } = req.body || false;
  const gratitudes = req.body.gratitudes || [];
  const skillsUsed = req.body.skillsUsed || [];
  const { lengthInMinutes, reflection, mindfulAction } = req.body;

  if (isPublicGratitudes) {
    savePublicGratitudes(gratitudes);
  }

  Session.create({
    userId,
    gratitudes,
    skillsUsed,
    lengthInMinutes,
    reflection,
    mindfulAction
  })
  .then((session) => res.json(session))
  .catch((err) => res.json({ msg: err.message }));
});

router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userId = extractUserIdFromAuthHeader(req.headers['authorization']);
  
  Session.find({ userId })
    .then((docs) => res.json({ docs }))
    .catch((err) => res.json({ msg: err.message }));
});

router.get('/byDate', passport.authenticate('jwt', { session: false }), (req, res) => {
  const userId = extractUserIdFromAuthHeader(req.headers['authorization']);
  var { date } = req.body;
  date = new Date(date);

  Session.find({ userId, date: {
    $gte: new Date(date).setHours(0, 0, 0),
    $lt: new Date(date).setHours(23, 59, 59)
  }})
    .then((docs) => res.json({ docs }))
    .catch((err) => res.json({ msg: err.message }));
});

export default router;