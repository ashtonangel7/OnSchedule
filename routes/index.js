let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Absolute Dance" });
});

router.get('/logout', function (req, res, next) {

    req.session.isAuthenticated = false;

    res.redirect('/login');
});

module.exports = router;
