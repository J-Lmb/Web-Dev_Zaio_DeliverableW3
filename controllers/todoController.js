var bodyParser = require('body-parser');

var data = [{item: 'Complete Zaio Deliv 3'}, {item: 'Watch all net ninja videos'}, {item: 'Practise NodeJS'}];

var urlEncodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

    //Get data from mongodb and pass to view
    app.get('/todo', function(req, res){
            res.render('todo', {todos: data});
    });

    app.post('/todo', urlEncodedParser, function(req, res){
        //handle request
        data.push(req.body);
        res.json(data);
     });

    app.delete('/todo/:item', function(req, res){
        //delete todo list item
        data = data.filter(function(todo)
        {
                return todo.item.replace(/ /g, '-') !== req.params/item;
        });
        res.json(data)
    });
};