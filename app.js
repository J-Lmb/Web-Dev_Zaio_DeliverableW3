var express = require('express');

var app = express();


var todoController = require('./controllers/todoController');

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./Todo_App/public')); // to get the css file, you would now only need ./assets/styles.css, and not the public also

//fire controllers
todoController(app);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');