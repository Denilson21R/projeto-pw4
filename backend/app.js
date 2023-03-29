import express from 'express'
import bodyParser from "body-parser";

const app = express();
import db from "./db.js"

import user from './routes/user.js'
import recipe from './routes/recipe.js'
import ingredient from './routes/ingredient.js'

app.use(bodyParser.json())//support JSON-encoded bodies
app.use(bodyParser.urlencoded({//support URL-encoded bodies
    extended: true
}));

(async() => {
    await db.sync({force: true});
    console.log("Banco de dados conectado")
})();


const port = 8080;

//importing routes
app.use("/user", user);
app.use("/recipe", recipe);
app.use("/ingredient", ingredient);

//TODO: make project backend more complex(maybe add logs, more entities or other things)

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})
