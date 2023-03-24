const express = require("express");
const {Sequelize} = require("sequelize");
const app = express();

const port = 8080;

const sequelize = new Sequelize('pw4-projeto', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//works correctly
sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


//importing routes
app.use("/user", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));
app.use("/ingredient", require("./routes/ingredient"));

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})
