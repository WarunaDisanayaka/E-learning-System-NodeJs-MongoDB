const router = require('express').Router();
const User = require('../models/user.model');
const Task = require('../models/task.model');
const Course = require('../models/course.model');
const Enroll =  require('../models/enroll.model');
const Lesson = require('../models/lesson.model');
const Material  = require('../models/material.model');

router.get('/profile', async (req, res, next) => {
  const person = req.user;
  res.render('profile', { person });
});


router.get('/dashboard', (req, res, next) => {
  res.render('dashboard');
});


router.get('/chat', (req, res, next) => {
  res.render('chat');
});



router.get('/user_course', async (req, res, next) => {
  try {
    const person = req.user;

    const courses = await Course.find();
    const email = person.email;
    const enroll = await Enroll.findOne({stuId:email});
    console.log(enroll.status);
    
    res.render('user_course', { courses,enroll });
  } catch (error) {
    next(error);
  }
});



router.get('/user_lesson_list', async (req, res, next) => {
  try {
    const lessons = await Lesson.find();
    
    res.render('user_lesson_list',{lessons});
  } catch (error) {
    next(error);
  }
});

router.get('/user_lesson_materials', async (req, res, next) => {
  try {
    const materials = await Material.find();
    
    res.render('user_lesson_materials',{materials});
  } catch (error) {
    next(error);
  }
});



router.post('/update-status', async (req, res, next) => {
  try {
    const { id, taskstatus } = req.body;

  
    if ( !taskstatus) {
      req.flash('error', 'Invalid request');
      return res.redirect('back');
    }

   
    const task = await Task.findByIdAndUpdate(
      id,
      { taskstatus },
      { new: true, runValidators: true }
    );

    
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});



router.post('/enroll', async (req, res, next) => {
  try {

  const person = req.user;
  const enroll = new Enroll({

    stuId: person.email,
    courseName: req.body.course,
    status: 1,

});

enroll.save((err)=>{
  if (err) {
      res.json({ message: err.message, type: 'danger'});
  }else{
      req.session.message = {
          type : 'success',
          message : 'Enroll success',
      };
      
  res.redirect("/user/user_course");     
  }
})

  } catch (error) {
    next(error);
  }
});

module.exports = router;
