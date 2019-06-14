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

app.post('/inicio', function(req, res){
    res.render('index',{
    });
});

var query = 'MATCH (n:Empresa) RETURN n;';

app.post('/adminEmpresa', function(req, res){
    query = 'MATCH (n:Empresa) RETURN n;';
    session
    .run(query)
    .then(function(result){
        var arrayEmp = [];
        var cont = 0;
        result.records.forEach(function(record){
            arrayEmp.push({
                rtn: record._fields[0].properties.rtn,
                nombre: record._fields[0].properties.nombre,
                director: record._fields[0].properties.director,
                direccion: record._fields[0].properties.direccion,
                indice: cont
            });
            cont++;
        });
        res.render('adminEmpresa',{
            empresas: arrayEmp
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
});

app.post('/adminEmpleo', function(req, res){
    query = 'MATCH (n:Empleo) RETURN n;';
    session
    .run(query)
    .then(function(result){
        var arrayEmpl = [];
        var cont = 0;
        result.records.forEach(function(record){
            arrayEmpl.push({
                idEmpleo: record._fields[0].properties.idEmpleo,
                idEmpresa: record._fields[0].properties.idEmpresa,
                nombreEmpresa: record._fields[0].properties.nombreEmpresa,
                puesto: record._fields[0].properties.puesto,
                numPlazas: record._fields[0].properties.numPlazas,
                salario: record._fields[0].properties.salario,
                numHijos: record._fields[0].properties.numHijos,
                consMed: record._fields[0].properties.consMed,
                hospital: record._fields[0].properties.hospital,
                militar: record._fields[0].properties.militar,
                carcel: record._fields[0].properties.carcel,
                aniosExp: record._fields[0].properties.aniosExp,
                profesion: record._fields[0].properties.profesion,
                contrato: record._fields[0].properties.contrato,
                indice: cont
            });
            cont++;
        });
        res.render('adminEmpleo',{
            empleos: arrayEmpl
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
});

app.post('/adminPersona', function(req, res){
    var array = [];
    var arrayFamiliares = [];
    var arraySanitarios = [];
    var arrayLegales = [];
    var arrayAcademicos = [];
    var arrayLabPro = [];
    var arrayCondiciones = [];
    var cont = 0;
    query = 'MATCH (n:Persona) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            array.push({
                id: record._fields[0].properties.id,
                nombre: record._fields[0].properties.nombre,
                celular: record._fields[0].properties.celular,
                correo: record._fields[0].properties.correo,
                edad: record._fields[0].properties.edad,
                estadoCivil: record._fields[0].properties.estadoCivil,
                indice: cont
            });
            cont++;
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dFamiliar
    query = 'MATCH (n:dFamiliar) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayFamiliares.push({
                idPadre: record._fields[0].properties.idPadre,
                padre: record._fields[0].properties.padre,
                idMadre: record._fields[0].properties.idMadre,
                madre: record._fields[0].properties.madre,
                ccPadre: record._fields[0].properties.ccPadre,
                ccMadre: record._fields[0].properties.ccMadre,
                numHijos: record._fields[0].properties.numHijos,
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dSanitario
    query = 'MATCH (n:dSanitario) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arraySanitarios.push({
                enfermedades: record._fields[0].properties.enfermedades,
                medicamentos: record._fields[0].properties.medicamentos,
                hospital: record._fields[0].properties.hospital
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dLegal
    query = 'MATCH (n:dLegal) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayLegales.push({
                militar: record._fields[0].properties.militar,
                carcel: record._fields[0].properties.carcel
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dAcademico
    query = 'MATCH (n:dAcademico) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayAcademicos.push({
                escuela: record._fields[0].properties.escuela,
                colegio: record._fields[0].properties.colegio,
                upreg: record._fields[0].properties.upreg,
                upost: record._fields[0].properties.upost
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dLabPro
    query = 'MATCH (n:dLabPro) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayLabPro.push({
                nombreEmpresa: record._fields[0].properties.nombreEmpresa,
                ulSalario: record._fields[0].properties.ulSalario,
                profesion: record._fields[0].properties.profesion,
                aniosExp: record._fields[0].properties.aniosExp,
                puestos: record._fields[0].properties.puestos
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dCondiciones
    query = 'MATCH (n:dCondicion) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayCondiciones.push({
                posPuestos: record._fields[0].properties.posPuestos,
                contrato: record._fields[0].properties.contrato,
                salario: record._fields[0].properties.salario
            });
        });
        res.render('adminPersona',{
            personas: array,
            familiares :arrayFamiliares,
            sanitarios:arraySanitarios,
            legales:arrayLegales,
            academicos:arrayAcademicos,
            LabPros:arrayLabPro,
            condiciones:arrayCondiciones
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });

});

app.post('/crudEmpresa', function(req, res){
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
                    session.close();
                })
                .catch(function(err){
                    console.log(err);
                });
            break;
    }
    query = 'MATCH (n:Empresa) RETURN n;';
    session
    .run(query)
    .then(function(result){
        var arrayEmp = [];
        var cont = 0;
        result.records.forEach(function(record){
            arrayEmp.push({
                rtn: record._fields[0].properties.rtn,
                nombre: record._fields[0].properties.nombre,
                director: record._fields[0].properties.director,
                direccion: record._fields[0].properties.direccion,
                indice: cont
            });
            cont++;
        });
        res.render('adminEmpresa',{
            empresas: arrayEmp
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });

});

app.post('/crudEmpleo', function(req, res){
    var query = "";
    var opcion = req.body.opcion;
    var idEmpleo = req.body.a;
    var idEmpresa = req.body.idEmp;
    var nombreEmpresa = req.body.nomEmp;
    var puesto= req.body.b;
    var numPlazas = req.body.c;
    var salario = req.body.d;
    var numHijos = req.body.e;
    var consMed = req.body.f;
    var hospital = req.body.g;
    var militar = req.body.h;
    var carcel = req.body.i;
    var aniosExp = req.body.j;
    var profesion = req.body.k;
    var contrato = req.body.l;
    switch (opcion) {
        case "1":
            query = "CREATE(n:Empleo {idEmpleo:{a},idEmpresa:{idEmp},nombreEmpresa:{nomEmp},puesto:{b},numPlazas:{c},salario:{d},numHijos:{e},consMed:{f},hospital:{g},militar:{h},carcel:{i},aniosExp:{j},profesion:{k},contrato:{l}});";
            session
                .run(query,{a:idEmpleo, idEmp:idEmpresa, nomEmp:nombreEmpresa, b:puesto,c:numPlazas, d:salario, e:numHijos, f:consMed,g:hospital, h:militar, i:carcel, j:aniosExp,k:profesion, l:contrato})
                .then(function(result){
                    session.close();
                })
                .catch(function(err){
                    console.log(err);
                });
            break;
        case "2":
            query = "MERGE (n:Empleo {idEmpleo:{a}}) SET n.idEmpresa={idEmp},n.nombreEmpresa={nomEmp},n.puesto={b},n.numPlazas={c},n.salario={d},n.numHijos={e},n.consMed={f},n.hospital={g},n.militar={h},n.carcel={i},n.aniosExp={j},n.profesion={k},n.contrato={l};";
            session
                .run(query,{a:idEmpleo, idEmp:idEmpresa, nomEmp:nombreEmpresa, b:puesto,c:numPlazas, d:salario, e:numHijos, f:consMed,g:hospital, h:militar, i:carcel, j:aniosExp,k:profesion, l:contrato})
                .then(function(result){
                    session.close();
                })
                .catch(function(err){
                    console.log(err);
                });
            break;
        case "3":
            query = "MATCH (n:Empleo {idEmpleo:{a}}) DELETE n;"
            session
                .run(query,{a:idEmpleo})
                .then(function(result){
                    session.close();
                })
                .catch(function(err){
                    console.log(err);
                });
            break;
    }

    query = 'MATCH (n:Empleo) RETURN n;';
    session
    .run(query)
    .then(function(result){
        var arrayEmpl = [];
        var cont = 0;
        result.records.forEach(function(record){
            arrayEmpl.push({
                idEmpleo: record._fields[0].properties.idEmpleo,
                idEmpresa: record._fields[0].properties.idEmpresa,
                nombreEmpresa: record._fields[0].properties.nombreEmpresa,
                puesto: record._fields[0].properties.puesto,
                numPlazas: record._fields[0].properties.numPlazas,
                salario: record._fields[0].properties.salario,
                numHijos: record._fields[0].properties.numHijos,
                consMed: record._fields[0].properties.consMed,
                hospital: record._fields[0].properties.hospital,
                militar: record._fields[0].properties.militar,
                carcel: record._fields[0].properties.carcel,
                aniosExp: record._fields[0].properties.aniosExp,
                profesion: record._fields[0].properties.profesion,
                contrato: record._fields[0].properties.contrato,
                indice: cont
            });
            cont++;
        });
        res.render('adminEmpleo',{
            empleos: arrayEmpl
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
});


app.post('/crudPersona', function(req, res){
    var query = "";
    var opcion = req.body.opcion;
    //personales
    var id = req.body.a;
    var nombre = req.body.b;
    var celular = req.body.c;
    var correo = req.body.d;
    var edad = req.body.e;
    var estadoCivil = req.body.f;
    //familiares
    var idPadre = req.body.g;
    var padre = req.body.h;
    var idMadre = req.body.i;
    var madre = req.body.j;
    var ccPadre = req.body.k;
    var ccMadre = req.body.l;
    var numHijos = req.body.m;
    //sanitarios
    var enfermedades = req.body.n;
    var medicamentos = req.body.o;
    var hospital = req.body.p;
    //legales
    var militar = req.body.q;
    var carcel = req.body.r;
    //acedemicos
    var escuela = req.body.s;
    var colegio = req.body.t;
    var upreg = req.body.u;
    var upost = req.body.v;
    //labpro
    var nombreEmpresa = req.body.w;
    var ulSalario = req.body.x;
    var profesion = req.body.y;
    var aniosExp = req.body.z;
    var puestos = req.body.aa;
    //condiciones
    var posPuestos = req.body.ab;
    var contrato = req.body.ac;
    var salario = req.body.ad;
    switch (opcion) {
        case "1":
            //personales
            query = "CREATE(n:Persona {id:{a},nombre:{b},celular:{c},correo:{d},edad:{e},estadoCivil:{f}}) RETURN n.nombre;"
            session
                .run(query,{a:id, b:nombre, c:celular, d:correo, e:edad, f:estadoCivil})
                .then(function(result){
                    session.close();
                });
            //familiares
            query = "CREATE(n:dFamiliar {id:{z},idPadre:{a},padre:{b},idMadre:{c},madre:{d},ccPadre:{e},ccMadre:{f},numHijos:{g}}) RETURN n.nombre;"
            session
                .run(query,{z:id,a:idPadre, b:padre, c:idMadre, d:madre, e:ccPadre, f:ccMadre, g:numHijos})
                .then(function(result){
                    session.close();
                });
            //sanitarios
            query = "CREATE(n:dSanitario {id:{a},enfermedades:{a},medicamentos:{b},hospital:{c}}) RETURN n.nombre;"
            session
                .run(query,{z:id, a:enfermedades, b:medicamentos, c:hospital})
                .then(function(result){
                    session.close();
                });
            //legales
            query = "CREATE(n:dLegal {id:{z},militar:{a},carcel:{b}}) RETURN n.nombre;"
            session
                .run(query,{z:id,a:militar, b:carcel})
                .then(function(result){
                    session.close();
                });
            //academicos
            query = "CREATE(n:dAcademico {id:{z},escuela:{a},colegio:{b},upreg:{c},upost:{d}}) RETURN n.nombre;"
            session
                .run(query,{z:id, a:escuela, b:colegio, c:upreg, d:upost})
                .then(function(result){
                    session.close();
                });
            //labpro
            query = "CREATE(n:dLabPro {id:{z},nombreEmpresa:{a},ulSalario:{b},profesion:{c},aniosExp:{d},puestos:{e}}) RETURN n.nombre;"
            session
                .run(query,{z:id, a:nombreEmpresa, b:ulSalario, c:profesion, d:aniosExp, e:puestos})
                .then(function(result){
                    session.close();
                });
            //condiciones
            query = "CREATE(n:dCondicion {id:{z}, posPuestos:{a},contrato:{b},salario:{c}}) RETURN n.nombre;"
            session
                .run(query,{z:id, a:posPuestos, b:contrato, c:salario})
                .then(function(result){
                    session.close();
                });
            break;
        case "2":
            //query = "MERGE (n:Persona {id:{a}}) SET n.nombre = {b}, n.celular = {c}, n.correo = {d}, n.edad = {e}, n.estadoCivil = {f} RETURN n;"
            //personales
            query = "MERGE (n:Persona {id:{a}}) SET n.nombre = {b}, n.celular = {c}, n.correo = {d}, n.edad = {e}, n.estadoCivil = {f};"
            session
                .run(query,{a:id, b:nombre, c:celular, d:correo, e:edad, f:estadoCivil})
                .then(function(result){
                    session.close();
                });
            //familiares
            query = "MERGE (n:dFamiliar {id:{z}}) SET n.idPadre={a},n.padre={b},n.idMadre={c},n.madre={d},n.ccPadre={e},n.ccMadre={f},n.numHijos={g};"
            session
                .run(query,{z:id,a:idPadre, b:padre, c:idMadre, d:madre, e:ccPadre, f:ccMadre, g:numHijos})
                .then(function(result){
                    session.close();
                });
            //sanitarios
            query = "MERGE (n:dSanitario {id:{z}}) SET n.enfermedades={a},n.medicamentos={b},n.hospital={c};"
            session
                .run(query,{z:id, a:enfermedades, b:medicamentos, c:hospital})
                .then(function(result){
                    session.close();
                });
            //legales
            query = "MERGE (n:dLegal {id:{z}}) SET n.militar={a},n.carcel={b};"
            session
                .run(query,{z:id,a:militar, b:carcel})
                .then(function(result){
                    session.close();
                });
            //academicos
            query = "MERGE (n:dAcademico {id:{z}}) SET n.escuela={a},n.colegio={b},n.upreg={c},n.upost={d};"
            session
                .run(query,{z:id, a:escuela, b:colegio, c:upreg, d:upost})
                .then(function(result){
                    session.close();
                });
            //labpro
            query = "MERGE (n:dLabPro {id:{z}}) SET n.nombreEmpresa={a},n.ulSalario={b},n.profesion={c},n.aniosExp={d},n.puestos={e};"
            session
                .run(query,{z:id, a:nombreEmpresa, b:ulSalario, c:profesion, d:aniosExp, e:puestos})
                .then(function(result){
                    session.close();
                });
            //condiciones
            query = "MERGE (n:dCondicion {id:{z}}) SET n.posPuestos={a},n.contrato={b},n.salario={c};"
            session
                .run(query,{z:id, a:posPuestos, b:contrato, c:salario})
                .then(function(result){
                    session.close();
                });
            break;
        case "3":
        //query = "MERGE (n:Persona {id:{a}}) SET n.nombre = {b}, n.celular = {c}, n.correo = {d}, n.edad = {e}, n.estadoCivil = {f} RETURN n;"
        //personales
        query = "MERGE (n:Persona {id:{a}}) DELETE (n);"
        session
            .run(query,{a:id})
            .then(function(result){
                session.close();
            });
        //familiares
        query = "MERGE (n:dFamiliar {id:{a}}) DELETE (n);"
        session
            .run(query,{a:id})
            .then(function(result){
                session.close();
            });
        //sanitarios
        query = "MERGE (n:dSanitario {id:{a}}) DELETE (n);"
        session
            .run(query,{a:id})
            .then(function(result){
                session.close();
            });
        //legales
        query = "MERGE (n:dLegal {id:{a}}) DELETE (n);"
        session
            .run(query,{a:id})
            .then(function(result){
                session.close();
            });
        //academicos
        query = "MERGE (n:dAcademico {id:{a}}) DELETE (n);"
        session
            .run(query,{a:id})
            .then(function(result){
                session.close();
            });
        //labpro
        query = "MERGE (n:dLabPro {id:{a}}) DELETE (n);"
        session
            .run(query,{a:id})
            .then(function(result){
                session.close();
            });
        //condiciones
        query = "MERGE (n:dCondicion {id:{a}}) DELETE (n);"
        session
            .run(query,{a:id})
            .then(function(result){
                session.close();
            });
        break;
    }
    var array = [];
    var arrayFamiliares = [];
    var arraySanitarios = [];
    var arrayLegales = [];
    var arrayAcademicos = [];
    var arrayLabPro = [];
    var arrayCondiciones = [];
    var cont = 0;
    query = 'MATCH (n:Persona) RETURN n;';
    session
    .run(query)
    .then(function(result){

        result.records.forEach(function(record){
            array.push({
                id: record._fields[0].properties.id,
                nombre: record._fields[0].properties.nombre,
                celular: record._fields[0].properties.celular,
                correo: record._fields[0].properties.correo,
                edad: record._fields[0].properties.edad,
                estadoCivil: record._fields[0].properties.estadoCivil,
                indice: cont
            });
            cont++;
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dFamiliar
    query = 'MATCH (n:dFamiliar) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayFamiliares.push({
                idPadre: record._fields[0].properties.idPadre,
                padre: record._fields[0].properties.padre,
                idMadre: record._fields[0].properties.idMadre,
                madre: record._fields[0].properties.madre,
                ccPadre: record._fields[0].properties.ccPadre,
                ccMadre: record._fields[0].properties.ccMadre,
                numHijos: record._fields[0].properties.numHijos,
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dSanitario
    query = 'MATCH (n:dSanitario) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arraySanitarios.push({
                enfermedades: record._fields[0].properties.enfermedades,
                medicamentos: record._fields[0].properties.medicamentos,
                hospital: record._fields[0].properties.hospital
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dLegal
    query = 'MATCH (n:dLegal) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayLegales.push({
                militar: record._fields[0].properties.militar,
                carcel: record._fields[0].properties.carcel
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dAcademico
    query = 'MATCH (n:dAcademico) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayAcademicos.push({
                escuela: record._fields[0].properties.escuela,
                colegio: record._fields[0].properties.colegio,
                upreg: record._fields[0].properties.upreg,
                upost: record._fields[0].properties.upost
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dLabPro
    query = 'MATCH (n:dLabPro) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayLabPro.push({
                nombreEmpresa: record._fields[0].properties.nombreEmpresa,
                ulSalario: record._fields[0].properties.ulSalario,
                profesion: record._fields[0].properties.profesion,
                aniosExp: record._fields[0].properties.aniosExp,
                puestos: record._fields[0].properties.puestos
            });
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });
    //dCondiciones
    query = 'MATCH (n:dCondicion) RETURN n;';
    session
    .run(query)
    .then(function(result){
        result.records.forEach(function(record){
            arrayCondiciones.push({
                posPuestos: record._fields[0].properties.posPuestos,
                contrato: record._fields[0].properties.contrato,
                salario: record._fields[0].properties.salario
            });
        });
        res.render('adminPersona',{
            personas: array,
            familiares :arrayFamiliares,
            sanitarios:arraySanitarios,
            legales:arrayLegales,
            academicos:arrayAcademicos,
            LabPros:arrayLabPro,
            condiciones:arrayCondiciones
        });
        session.close();
    })
    .catch(function(err){
        console.log(err);
    });

});

app.listen(3000);
console.log('Employment Center Server running at port 3000');

module.exports = app;
