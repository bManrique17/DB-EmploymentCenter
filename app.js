var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var neo4j = require('neo4j-driver').v1;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

var driver = neo4j.driver('bolt://localhost',neo4j.auth.basic('neo4j','1'));
var session = driver.session();

var query = 'MATCH (n) RETURN n;';

app.get('/', function(req, res){
    session
        .run(query)
        .then(function(result){
            var array = [];
            result.records.forEach(function(record){
                array.push({
                    name: record._fields[0].properties.name,
                    born: record._fields[0].properties.born
                });
            });
            res.render('index',{
                people: array
            });
        })
        .catch(function(err){
            console.log(err);
        });
});

app.post('/person/add',function(req, res){
    var name = req.body.name;
    var born = req.body.born;
    console.log(name);

    var query = "CREATE(n:Person {name:{a},born:{b}}) RETURN n.name;"
    session
        .run(query,{a:name, b:born})
        .then(function(result){
            res.redirect('/');
            session.close();
        })
        .catch(function(err){
            console.log(err);
        });

    res.redirect('/');
});

app.listen(3000);
console.log('Server recio')

module.exports = app;
