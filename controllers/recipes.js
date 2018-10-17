const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipes.js')

//___________________
// Routes
//___________________
//localhost:3000  - this will reroute to `products`

router.get('/', (req,res) => {
  Recipe.find({}, (err, allRecipes) => {
    res.render('index.ejs', {
      recipes: allRecipes
    })
  })
});

router.get('/new', (req,res) => {
  res.render('new.ejs')
});

router.post('/', (req,res) => {
  console.log('I am Here');
  Recipe.create(req.body, (err, createdRecipe) => {
    console.log(err);
    console.log(req.body);
    res.redirect('/recipes')
  })
})

router.get('/:id', (req,res) => {
  Recipe.findById(req.params.id, (err, theRecipe) => {
    res.render('show.ejs', {
      recipes: theRecipe
    })
  })
})

router.delete('/:id',(req,res) => {
  Recipe.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/recipes')
  })
})

router.get('/:id/edit', (req,res) => {
  Recipe.findById(req.params.id,(err,theRecipe) => {
    res.render('edit.ejs', {
      recipes: theRecipe
    })
  })
})

router.put('/:id', (req, res)=>{
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
      console.log(err);
        res.redirect('/recipes');
    });
});










module.exports=router;
