module.exports = function(app) {

    //Get data from mongodb and pass to view
    app.get('/todo', function(req, res){
            res.render('todo');
    });

    app.post('/todo', function(req, res){
        //handle request
        
    });

    app.delete('/todo/:item', function(req, res){
        //delete todo list item
        
    });
};