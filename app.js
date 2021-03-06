var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//setup template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));


//fire the controller
todoController(app);

//listen to port
app.listen(process.env.PORT || 3000, function(){
    console.log('Listening on port 3000');
});