const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {type: String,
    required: true},
    image:{
      type:String,
      required:true
    },
  author:{type:String,
    required: false},
  description:{type:String,
    required: true}
},
{
  timestamps: true
});

const Recipe = mongoose.model('Recipe',
recipeSchema);

module.exports = Recipe;
