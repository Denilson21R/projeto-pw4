import express from 'express'
const app = express();
import db from "./db.js"

import user from './routes/user.js'
import recipe from './routes/recipe.js'
import ingredient from './routes/ingredient.js'

db.sync().then(()=>{
    console.log("Banco de dados conectado")
});


const port = 8080;

//importing routes
app.use("/user", user);
app.use("/recipe", recipe);
app.use("/ingredient", ingredient);

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})
