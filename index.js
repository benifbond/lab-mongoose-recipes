const mongoose = require('mongoose');


// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data.json');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';
const localRecipe = {
  title: "the local dish",
  cuisine:"African Dish"
}

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(async() => {
    await Recipe.create(localRecipe)
    .then((recipe)=> console.log("recipe created",recipe))
   
    .catch((error) =>
            console.log("An error happened while:", error)
          );
  })
  .then(async() => {
    await Recipe.insertMany(data)
    .then((insertData)=> console.log("recipe created",insertData))
   
    .catch((error) =>
            console.log("insertData error:", error)
          );
  })

  .then(async() => {
    await Recipe.findOneAndUpdate({title:'Rigatoni alla Genovese'},{duration:'100'},{
      new: true})
    .then((updateData)=> console.log("updated",updateData))
   
    .catch((error) =>
            console.log("updata error:", error)
          );
  })
  .then(async() => {
    await Recipe.deleteOne({title:'Carrot Cake'})
    .then((deleteItem)=> console.log("delete one",deleteItem))
   
    .catch((error) =>
            console.log("delete error:", error)
          );
  })


  

  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close()