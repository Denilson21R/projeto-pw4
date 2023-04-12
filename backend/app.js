import express from 'express'
import bodyParser from "body-parser";

const app = express();
import db from "./db.js"

import user from './routes/user.js'
import recipe from './routes/recipe.js'
import ingredient from './routes/ingredient.js'
import comment from './routes/comment.js'

app.use(bodyParser.json())//support JSON-encoded bodies
app.use(bodyParser.urlencoded({//support URL-encoded bodies
    extended: true
}));

(async() => {
    //await db.sync({force: true}); //reset entire database
    await db.sync();
    console.log("Database connected")
})();

const port = 8080;

//importing routes
app.use("/user", user);
app.use("/recipe", recipe);
app.use("/ingredient", ingredient);
app.use("/comment", comment);

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})

//TODO: add pagination in all finder endpoints