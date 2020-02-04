var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to DB
mongoose.connect('mongodb+srv://dbZaio:Zaio2020Launchlab@cluster0-q9lzt.mongodb.net/test?retryWrites=true&w=majority');

//Create schema
var todoSchema = new mongoose.Schema({
    item:String
});

//Create model based on the schema
var Todo = mongoose.model('Todo', todoSchema);

//Create an item and save it in DB
/*var itemOne = Todo({item: 'update LinkedIn'}).save(function(err){ 
    if (err) throw err;
    console.log('item saved.');
});*/

//var data = [{item: 'Complete Zaio Deliv 3'}, {item: 'Watch all net ninja videos'}, {item: 'Practise NodeJS'}];

var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    //Get data from mongodb and pass to view
    app.get('/todo', function(req, res){
        //get data from mongodb and pass it to the view
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
            
    });

    app.post('/todo', urlEncodedParser, function(req, res){
        //get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
        
     });

    app.delete('/todo/:item', function(req, res){
        //delete the requested item from mongdb
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        });
        //delete todo list item
        /*data = data.filter(function(todo)
        {
                return todo.item.replace(/ /g, '-') !== req.params/item;
        });
        res.json(data)*/
    });
}