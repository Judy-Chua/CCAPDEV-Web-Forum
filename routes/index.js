const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('mainpage', { pageTitle: 'Mainpage', name: req.session.name } );
});

module.exports = router;
