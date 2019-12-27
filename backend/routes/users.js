const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const gender = req.body.gender;
  const dob = Date.parse(req.body.dob);
  const news = req.body.news;
  const email = req.body.email;
  const photo = req.body.photo;

  const newUser = new User({
    username,
    gender,
    dob,
    news,
    email,
    photo,
  });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {//getId from bd
  User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { //getId from bd
  User.findByIdAndDelete(req.params.id)
      .then(() => res.json('User deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {//localhost/Users/update/id
  User.findById(req.params.id) //On reçoi les anciennes donnee qu'on veut modifier
      .then(user => {
        user.username = req.body.username;
        user.gender = req.body.gender;
        user.dob = Date.parse(req.body.dob);
        user.news = req.body.news;
        user.email= req.body.email;
        user.photo = req.body.photo;
//Modification des champs dans le formulaires
        user.save()//commit()
            .then(() => res.json('User updated!'))
            .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;