const express = require('express');
const router = express.Router();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://raghu:balaji@ds161069.mlab.com:61069/dump');
var User = require('../models/users');
var Game = require('../models/games');
var jwt    = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var hassed;
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.route('/authenticate').post(function(req, res) {


	User.findOne({name: req.body.name}, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        var token = jwt.sign(user, 'texttogeneratetoken', {
          expiresIn: '1h'
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }   

    }
	});
});

router.use(function(req, res, next) {

  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token,'texttogeneratetoken', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

router.route('/games').post(function(req, res) {
		Game.find(function(err, games) {
			if (err)
				res.send(err);

			res.json(games);
		});
	});
	
	
router.route('/search').post(function(req, res) {
console.log(req.body.title);
 var regex = new RegExp(req.body.title, "i"), query = { title: regex };
		Game.find(query,function(err, games) {
			if (err)
				res.send(err);

			res.json(games);
		});
	});
	
router.route('/sort').post(function(req, res) {
console.log(req.body.title+''+req.body.by);
 var query;
 if (req.body.title == "score")
 query =  { "score": req.body.by };
 else
  query =  { "platform": req.body.by };
  console.log(query);
		Game.find().sort(query).exec(function(err, games) {
			if (err)
				res.send(err);

			res.json(games);
		});
	});


module.exports = router;