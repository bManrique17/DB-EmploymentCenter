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

app.get('/', function(req, res){
    res.render('index',{
    });
});

var query = 'MATCH (n:Empresa) RETURN n;';

app.post('/adminEmpresa', function(req, res){
    session
    .run(query)
    .then(function(result){
        var array = [];
        var cont = 0;
        result.records.forEach(function(record){
            array.push({
                rtn: record._fields[0].properties.rtn,
                nombre: record._fields[0].properties.nombre,
                director: record._fields[0].properties.director,
                direccion: record._fields[0].properties.direccion,
                indice: cont
            });
            cont++;
        });
        res.render('adminEmpresa',{
            empresas: array
        });
    })
    .catch(function(err){
        console.log(err);
    });
});

app.post('/crud', function(req, res){
    var query = "";
    var rtn = req.body.a;
    var nombre = req.body.b;
    var director = req.body.c;
    var direccion = req.body.d;
    var opcion = req.body.opcion;
    switch (opcion) {
        case "1":
            query = "CREATE(n:Empresa {direccion:{a},nombre:{b},rtn:{c},director:{d}}) RETURN n.nombre;"
            session
                .run(query,{a:direccion, b:nombre, c:rtn, d:director})
                .then(function(result){
                    query = 'MATCH (n:Empresa) RETURN n;';

                        session
                        .run(query)
                        .then(function(result){
                            var array = [];
                            var cont = 0;
                            result.records.forEach(function(record){
                                array.push({
                                    rtn: record._fields[0].properties.rtn,
                                    nombre: record._fields[0].properties.nombre,
                                    director: record._fields[0].properties.director,
                                    direccion: record._fields[0].properties.direccion,
                                    indice: cont
                                });
                                cont++;
                            });
                            res.render('adminEmpresa',{
                                empresas: array
                            });
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                    session.close();
                })
                .catch(function(err){
                    console.log(err);
                });
            break;
        case "2":
            query = "MERGE (n:Empresa {rtn:{a}}) SET n.nombre = {b}, n.director = {c}, n.direccion = {d} RETURN n;"            
            session
                .run(query,{a:rtn, b:nombre, c:director, d:direccion})
                .then(function(result){
                    query = 'MATCH (n:Empresa) RETURN n;';

                        session
                        .run(query)
                        .then(function(result){
                            var array = [];
                            var cont = 0;
                            result.records.forEach(function(record){
                                array.push({
                                    rtn: record._fields[0].properties.rtn,
                                    nombre: record._fields[0].properties.nombre,
                                    director: record._fields[0].properties.director,
                                    direccion: record._fields[0].properties.direccion,
                                    indice: cont
                                });
                                cont++;
                            });
                            res.render('adminEmpresa',{
                                empresas: array
                            });
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                    session.close();
                })
                .catch(function(err){
                    console.log(err);
                });
            break;
        case "3":
            query = "MATCH (n:Empresa {rtn: {a}}) DELETE n;"
            session
                .run(query,{a:rtn})
                .then(function(result){
                    query = 'MATCH (n:Empresa) RETURN n;';
                        session
                        .run(query)
                        .then(function(result){
                            var array = [];
                            var cont = 0;
                            result.records.forEach(function(record){
                                array.push({
                                    rtn: record._fields[0].properties.rtn,
                                    nombre: record._fields[0].properties.nombre,
                                    director: record._fields[0].properties.director,
                                    direccion: record._fields[0].properties.direccion,
                                    indice: cont
                                });
                                cont++;
                            });
                            res.render('adminEmpresa',{
                                empresas: array
                            });
                        })
                        .catch(function(err){
                            console.log(err);
                        });
                    session.close();
                })
                .catch(function(err){
                    console.log(err);
                });
            break;
    }
});

app.listen(3000);
console.log('Employment Center Server running at port 3000');

module.exports = app;
