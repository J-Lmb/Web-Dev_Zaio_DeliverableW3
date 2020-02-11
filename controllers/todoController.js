var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb+srv://dbZaio:Zaio2020Launchlab@cluster0-q9lzt.mongodb.net/test?retryWrites=true&w=majority');


//Create a schema
var todoSchema = new mongoose.Schema({
   item:String 
});

//Create a todo model
var Todo = mongoose.model('Todo', todoSchema);
/*var itemOne = Todo({item: 'get ready for backend'}).save(function(err){
    if(err) throw err;                                 console.log('item saved');  
});*/

/*var data = [{item:'update LinkedIn'},{item:'post your code'}, {item:'send report'}];*/
var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {
    
    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos:data});
        });
        
    });

    app.post('/todo', urlEncodedParser, function(req, res) {
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json(data);
        });
        //data.push(req.body);
        
    });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongodb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err,data){
           if (err) throw err;
           res.json(data);
        });
        /*data = data.filter(function(todo){
            return todo.item.replace(/ /g, '-') !== req.params.item;});*/
        
        
    });
};