const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home', name: req.session.name } );
});

module.exports = router;
