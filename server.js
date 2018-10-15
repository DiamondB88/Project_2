//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const session = require('express-session');
// const Recipe = require('./models/recipes.js')
const recipeController = require('./controllers/recipes.js');
const User = require('./models/recipes.js')
// const usersController = require('./controllers/users.js');
// const recipeController = require('./controllers/recipes.js');
const db = mongoose.connection;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ 'Project_2';

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: true }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON

app.use(session({
    secret: "cookinislife", //some random string
    resave: false,
    saveUninitialized: false
}));

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// app.use('/users', usersController)

app.use('/recipes', recipeController)


//___________________
// Routes
//___________________
//localhost:3000  - this will reroute to `products`

app.get('/', (req,res) =>{
  res.redirect('/sizzle')
})

 app.get('/sizzle' , (req, res) => {
   res.render('home.ejs');
 });
//
 app.get('/sizzle/about', (req,res) => {
   res.render('about.ejs')
 });

 app.get('/users', (req,res) => {
   res.render('users.ejs', {
     currentUser: req.session.currentUser
   })
 })

 app.post('/users', (req,res) => {
   User.create(req.body, (err, createdUser) => {
     res.redirect('/users')
   })
 })

 app.post('/sessions', (req,res) => {
   User.findOne({username: req.body.username}, (err, foundUser) => {
     if (req.body.password == foundUser.password){
       req.session.currentUser == foundUser;
       res.redirect('users.ejs');
     }else {
       res.send('wrong password')
     }
   })
 })

 app.get('/users/new', (req,res) => {
   res.render('users/new.ejs')
 })

app.get('/sessions/login', (req,res) => {
  res.render('users/login.ejs')
})

// app.get('/recipes', (req,res) => {
//   Recipe.find({}, (err, allRecipes) => {
//     res.render('index.ejs', {
//       recipes: allRecipes
//     })
//   })
// });
//
// app.get('/recipes/new', (req,res) => {
//   res.render('new.ejs')
// });
//
// app.post('/recipes', (req,res) => {
//   Recipe.create(req.body, (err, createdRecipe) => {
//     console.log(err);
//     console.log(req.body);
//     res.redirect('/recipes')
//   })
// })
//
// app.get('/recipes/:id', (req,res) => {
//   Recipe.findById(req.params.id, (err, theRecipe) => {
//     res.render('show.ejs', {
//       recipes: theRecipe
//     })
//   })
// })

app.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/sizzle');
    });
})

// app.delete('/recipes/:id',(req,res) => {
//   Recipe.findByIdAndRemove(req.params.id, (err, data) => {
//     res.redirect('/recipes')
//   })
// })
//
// app.get('/recipes/:id/edit', (req,res) => {
//   Recipe.findById(req.params.id,(err,theRecipe) => {
//     res.render('edit.ejs', {
//       recipes: theRecipe
//     })
//   })
// })
//
// app.put('/recipes/:id', (req, res)=>{
//     Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel)=>{
//         res.redirect('/recipes');
//     });
// });
//




//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
