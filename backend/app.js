const express = require("express");
const app = express();

const port = 8080;

//importing routes
app.use("/user", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));
app.use("/ingredient", require("./routes/ingredient"));

app.listen(port, function(){
    console.log(`Server running on port ${port}`);
})
