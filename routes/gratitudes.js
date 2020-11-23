import { Router } from 'express';
import passport from 'passport';
import moment from 'moment';

import Gratitude from '../persistence/models/Gratitude';

const router = Router();

router.get('/all', passport.authenticate('jwt', { session: false }), (__, res) => {
  Gratitude.find({ date: {
    $gte: moment().subtract(1, "days")
  }})
  .limit(100)
  .then((docs) => res.json({ gratitudes: docs.map((doc) => doc.text) }))
  .catch((err) => res.json({ msg: err.message }));
});

export default router;