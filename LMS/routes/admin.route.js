const Course = require('../models/course.model');
const Lesson = require('../models/lesson.model');
const Material = require('../models/material.model');
const router = require('express').Router();
const bodyParser = require('body-parser');
const {body,validationResult, check}=require('express-validator');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const mongoose = require('mongoose');
const { roles } = require('../utils/constants');
const multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req,file,cb) {
      cb(null,'./uploads');
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
  },
});


var upload = multer({
  storage: storage,
}).single("image");



router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find();

    res.render('users', { users });
  } catch (error) {
    next(error);
  }
});

router.get('/course_list', async (req, res, next) => {
  try {
    const courses = await Course.find();

    res.render('course_list',{courses});
  } catch (error) {
    next(error);
  }
});

router.get('/lesson_list', async (req, res, next) => {
  try {
    const lessons = await Lesson.find();
    
    res.render('lesson_list',{lessons});
  } catch (error) {
    next(error);
  }
});


router.get('/lesson_materials', async (req, res, next) => {
  try {
    const lessons = await Lesson.find();
    //const users = await User.find();

    res.render('lesson_materials',{lessons});
  } catch (error) {
    next(error);
  }
});

router.get('/add_course', async (req, res, next) => {
  try {
    res.render('add_course');
  } catch (error) {
    next(error);
  }
});

router.get('/add_lesson', async (req, res, next) => {
  try {
  
    const courses = await Course.find();

    res.render('add_lesson',{courses});
  } catch (error) {
    next(error);
  }
});


//Adding project
router.post('/addcourse',(req,res)=>{
  
  const course = new Course({
    courseName: req.body.coursename,
    description: req.body.description,

  });

  course.save((err)=>{
      if (err) {
          res.json({ message: err.message, type: 'danger'}); 
      }else{
          req.session.message = {
              type : 'success',
              message : 'Course added success',
          };
          
      res.redirect("/admin/course_list");     
      }
  }) 

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const alert = errors.array()
      res.render('/admin/add_course', {
          alert
          })   
      }else{
          
      }        

});

router.post('/addmaterial', upload,(req,res)=>{

  const material = new Material({
      lesson: req.body.lesson,
      image: req.file.filename,
  });

  material.save((err)=>{
    if (err) {
        res.json({ message: err.message, type: 'danger'});
    }else{
        req.session.message = {
            type : 'success',
            message : 'Material added success',
        };
        
    res.redirect("/admin/lesson_materials");     
    }
  })
  
});



router.get('/edit_project/:id',async(req,res)=>{
  let id = req.params.id;
    Project.findById(id,(err,project)=>{
        if (err) {
            res.redirect('/')
        }else{
            if (project == null) {
                res.redirect('/')
            }else{
                res.render("add_project",{
                    title: "Edit User",
                    project : project,
                });
            }
        }
    })
});



router.get("/delete_project/:id",(req,res)=>{
  let id = req.params.id;
  Project.findByIdAndRemove(id,(err,project)=>{
      
  })
})


router.post('/addlesson',(req,res)=>{

  const lesson = new Lesson({
    course: req.body.course,
    lesson: req.body.lesson,
    description: req.body.description,
  });

  lesson.save((err)=>{
      if (err) {
          res.json({ message: err.message, type: 'danger'}); 
      }else{
          req.session.message = {
              type : 'success',
              message : 'Lesson added success',
          };
          
      res.redirect("/admin/lesson_list");     
      }
  }) 

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const alert = errors.array()
      res.render('/admin/add_lesson', {
          alert
          })   
      }else{
          
      }        

});



router.post('/addmaterial',(req,res)=>{

  const lesson = new Lesson({
    lesson: req.body.lesson,
    image: re
  });

  lesson.save((err)=>{
      if (err) {
          res.json({ message: err.message, type: 'danger'}); 
      }else{
          req.session.message = {
              type : 'success',
              message : 'Lesson added success',
          };
          
      res.redirect("/admin/lesson_list");     
      }
  }) 

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const alert = errors.array()
      res.render('/admin/add_lesson', {
          alert
          })   
      }else{
          
      }        

});



router.get('/user/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      res.redirect('/admin/users');
      return;
    }
    const person = await User.findById(id);
    res.render('profile', { person });
  } catch (error) {
    next(error);
  }
});

router.post('/update-role', async (req, res, next) => {
  try {
    const { id, role } = req.body;

    // Checking for id and roles in req.body
    if (!id || !role) {
      req.flash('error', 'Invalid request');
      return res.redirect('back');
    }

    // Check for valid mongoose objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash('error', 'Invalid id');
      return res.redirect('back');
    }

    // Check for Valid role
    const rolesArray = Object.values(roles);
    if (!rolesArray.includes(role)) {
      req.flash('error', 'Invalid role');
      return res.redirect('back');
    }

    // Admin cannot remove himself/herself as an admin
    if (req.user.id === id) {
      req.flash(
        'error',
        'Admins cannot remove themselves from Admin, ask another admin.'
      );
      return res.redirect('back');
    }

    // Finally update the user
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    req.flash('info', `updated role for ${user.email} to ${user.role}`);
    res.redirect('back');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
